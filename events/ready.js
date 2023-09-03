const { convertTime } = require(`../handlers/convert.js`)
const { Manager } = require("erela.js");
const Spotify = require("erela.js-spotify");
const { MessageEmbed } = require("discord.js");
const Deezer = require("erela.js-deezer");
const delay = require("delay");
const db = require("quick.db");
const autoReconnect = require("../models/autoReconnect");

module.exports = {
  name: "ready",
  async execute(client, message) {
    console.log(`[API] ${client.user.username} is ready with ${client.guilds.cache.size} server`);

    client.user.setActivity(`@${client.user.username}`, { type: "LISTENING" });

    let nodes = client.config.nodes;

    let clientID = client.config.spotifyID;
    let clientSecret = client.config.spotifySecret;

    client.manager = new Manager({
      nodes,
      plugins: [new Spotify({ clientID, clientSecret }), new Deezer()],
      autoPlay: true,
      secure: false,
      send: (id, payload) => {
        const guild = client.guilds.cache.get(id);
        if (guild) guild.shard.send(payload);
      },
    });

    //initialize the manager
    client.manager.init(client.user.id);


    client.on("raw", (d) => client.manager.updateVoiceState(d));

    client.manager.on("nodeConnect", async (node) => {
      console.log(`[NODE] "${node.options.identifier}" connected.`);

      const autoReconChnls = await autoReconnect.find();
      autoReconChnls.forEach(async (x) => {
        try {
          const guildID = x.GuildID;
          const channelID = x.ChannelID;

          const guild = client.guilds.cache.get(guildID);
          if (guild) {
            const chnlToJoin = guild.channels.cache.get(channelID);
            if (chnlToJoin) {
              if (client.manager.players.get(guildID)) {
                await client.manager.players.get(guildID).connect();
              } else {
                player = client.manager.create({
                  guild: guildID,
                  voiceChannel: channelID,
                  textChannel: x.TextChannelID,
                  selfDeafen: true,
                });
                await player.connect();
              }
            }
          }
        } catch (err) {
          console.log("failed to Create ->", err);
        }
      });
    });

    client.manager.on("nodeError", (node, error) => {
      console.log(`Node "${node.options.identifier}" encountered an error: ${error.message}.`);
    });

    //Track start
    client.manager.on("trackStart", (player, track) => {
      const channel = client.channels.cache.get(player.textChannel);
      let min = Math.floor((track.duration / 1000 / 60) << 0),
        sec = Math.floor((track.duration / 1000) % 60);
      let sec2;
      if (sec < 10) {
        sec2 = `0${sec}`;
      } else {
        sec2 = sec;
      }

      
        let np = new MessageEmbed()
         .setTitle("Now Playing") 
          .setColor(client.colors.main).setDescription(`${track.title}`);
      setTimeout(() => {
        channel.send(np).then((m) => m.delete({ timeout: track.duration }));
      }, );
    });

    client.manager.on("queueEnd", async (player) => {
      if (player.twentyFourSeven) return;
      const channel = client.channels.cache.get(player.textChannel);
      channel.send({
        embed: {
          color: client.colors.main,
          
          description: `<a:error:885663139285327913> | My Queue Is Empty`,
          
        }
      });
      player.stop();
    });

    client.manager.on("socketClosed", (player, payload) => {
      if (payload.byRemote === true) player.destroy();
    });

    client.manager.on(
      "playerMove",
      (player, currentChannel, newChannel) => {
        player.voiceChannel = client.channels.cache.get(newChannel);

        setTimeout(() => {
          player.pause(false);
        });
      },
      2000
    );
  },
};
