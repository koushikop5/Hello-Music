const { MessageEmbed } = require("discord.js");
const arrayUtils = require("../../utility/ArrayUtil");
const { format, delay, swap_pages, swap_pages2 } = require(`../../utility/functions`);
module.exports = {
  name: "queue",
  aliases: ["q"],
  run: async (client, message) => {
    try {
      const checkPrefix = await client.db.get(`prefix_${message.guild.id}`);
      const prefix = (await checkPrefix) ? checkPrefix : client.config.default_prefix;

      const player = client.manager.players.get(message.guild.id);

       // If the client isn't in a voiceChannel, don't execute any other code
      if (!message.guild.voiceConnection && !player) {
        return message.channel.send(
          new MessageEmbed()
          .setColor(client.colors.error)
          .setTitle("Player is Not in voice channel")
          .setDescription(`To Join a Voice Channel Use \`\`\`${prefix}join\`\`\``)
        );
      }

      const tracks = player.queue;
      //if there are no other tracks, information

      if (!player.queue.current) {
        return message.channel.send(
          new MessageEmbed()
          .setColor(client.colors.error)
          
          .setDescription(`<a:error:885663139285327913> | Currently not playing anything.`)
        );
      }

      if (!tracks.length)
        return message.channel.send(
          new MessageEmbed()
            .setAuthor(`Current queue: [ ${player.queue.length} Tracks ]`)
            .setColor(client.colors.main)
            .setDescription(`__**Now Playing**__\n**[${player.queue.current.title.substr(0, 60)}](${player.queue.current.uri})** - \`${player.queue.current.isStream ? "LIVE STREAM" : format(player.queue.current.duration).split(` | `)[0]}\``)
            //.setDescription(`No tracks in the queue`)
        );
      //if not too big send queue in channel
      if (tracks.length < 50)
        return message.channel.send(
          new MessageEmbed()
            .setColor(client.colors.main)
            .setAuthor(`Current queue: [ ${player.queue.length} Tracks ]`)
            .addField(`__Now Playing__`, `\n**[${player.queue.current.title.substr(0, 60)}](${player.queue.current.uri})** - \`${player.queue.current.isStream ? "LIVE STREAM" : format(player.queue.current.duration).split(` | `)[0]}\``)
             .setDescription(tracks.map((track, i) => `\`${++i}.\`\n [${track.title.substr(0, 60)}](${track.uri}) - \`${track.isStream ? "LIVE STREAM" : format(track.duration).split(` | `)[0]}\``).join(`\n`))
);
         
      //get an array of quelist where 15 tracks is one index in the array
      let quelist = [];
      for (let i = 0; i < tracks.length; i += 55) {
        let songs = tracks.slice(i, i + 15);
         quelist.push(songs.map((track, index) => `\`${i + ++index}.\`\n[${track.title.substr(0, 60)}](${track.uri}) - \`${track.isStream ? "LIVE STREAM" : format(track.duration).split(` | `)[0]}\``).join(`\n`));
      }
      let limit = quelist.length <= 5 ? quelist.length : 5;
      let embeds = [];
      for (let i = 0; i < limit; i++) {
        let desc = String(quelist[i]).substr(0, 2048);
        await embeds.push(
          new MessageEmbed()
            .setColor(client.colors.main)
            .setAuthor(
              `Current queue: [ ${player.queue.length} Tracks ]`
            )
            .addField(`__Now Playing__`, `\n**[${player.queue.current.title.substr(0, 60)}](${player.queue.current.uri})** - \`${player.queue.current.isStream ? "LIVE STREAM" : format(player.queue.current.duration).split(` | `)[0]}\``)
            .setDescription(desc)
        );
      }
      //return susccess message
      return swap_pages2(client, message, embeds);
    } catch (e) {
      console.log(String(e.stack).bgRed);
      return message.channel.send(new MessageEmbed().setTitle(`ERROR | An error occurred`).setDescription(`\`\`\`${e.message}\`\`\``));
    }
  },
};
