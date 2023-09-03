const { MessageEmbed } = require("discord.js");
const delay = require("delay");
const autoReconnect = require("../../models/autoReconnect");

module.exports = {
  name: "play",
  aliases: ["p"],
  vcOnly: true,
  sameVc: true,

  run: async (client, message, args) => {
    let { channel } = message.member.voice;
    let play = message.client.manager.players.get(message.guild.id);

    const checkPrefix = await client.db.get(`prefix_${message.guild.id}`)
    const prefix = await checkPrefix ? checkPrefix : client.config.default_prefix

    if (!args.length) {
      let embed = new MessageEmbed().setColor(client.colors.error).setTitle("No Song Specified").setDescription(`To play a song Try \`\`\`${prefix}play [Your Song Name]\`\`\``);
      return await message.channel.send(embed);
    }

    const isAutoReconnect = await autoReconnect.findOne({
      GuildID: message.guild.id,
    });

    if (!play) {
      const player = message.client.manager.create({
        guild: message.guild.id,
        voiceChannel: channel.id,
        textChannel: message.channel.id,
        selfDeafen: true,
      });
      if (isAutoReconnect) {
        player.twentyFourSeven = true;
      }

      if (!channel.joinable) {
        let embed = new MessageEmbed()
          .setColor(client.colors.error)
          .setDescription(" | I can't able to join your voice channel");
        return message.channel.send(embed);
      }

      player.connect();
    } else {
      if (isAutoReconnect) {
        play.twentyFourSeven = true;
      }
    }

    const player = message.client.manager.players.get(message.guild.id);
    if (channel.id !== player.voiceChannel) {
      let embed = new MessageEmbed().setColor(client.colors.error).setDescription(" | Must Join The Same Voice Channel");
      return message.channel.send(embed);
    }

    const search = args.join(" ");
    let res;

    let msg = message.channel.send(new MessageEmbed().setColor(client.colors.main).setDescription(` | Searching...`)).then((m) => m.delete({ timeout: 5000 }));

    try {
      res = await player.search(search, message.author);
      if (res.loadType === "LOAD_FAILED") {
        if (!player.queue.current) player.destroy();
        throw new Error(res.exception.message);
      }
    } catch (err) {
      let embed = new MessageEmbed()
        .setColor(client.colors.error)
        .setDescription(` | Can't Find Music About \`${search}\``);
      return message.channel.send(embed);
    }

    switch (res.loadType) {
      case "NO_MATCHES":
        if (!player.queue.current) player.destroy();
        let embed = new MessageEmbed()
          .setColor(client.colors.error)
          .setDescription(` | i can't find music about \`${search}\``);
        return message.channel.send(embed);

      case "TRACK_LOADED":
        await player.queue.add(res.tracks[0]);
        if (!player.playing && !player.paused && !player.queue.length) player.play();
        let embed2 = new MessageEmbed().setColor(client.colors.success).setTitle(`Queued`).setDescription(`[${res.tracks[0].title}](${res.tracks[0].uri})`);
        if (player.queue.length >= 1)
          //await delay(4900)
          message.channel.send(embed2);
        return;

      case "PLAYLIST_LOADED":
        await player.queue.add(res.tracks);
        if (!player.playing && !player.paused && player.queue.size + 1 === res.tracks.length) player.play();
        let embed3 = new MessageEmbed().setColor(client.colors.success).setTitle(`Queued`).setDescription(`**${res.playlist.name}** \`[${res.tracks.length} songs]\``);
        if (player.queue.length >= res.tracks.length)
          //  await delay(4900)
          message.channel.send(embed3);
        return;

      case "SEARCH_RESULT":
        await player.queue.add(res.tracks[0]);
        if (!player.playing && !player.paused && !player.queue.length) player.play();
        let embed4 = new MessageEmbed().setColor(client.colors.success).setTitle(`Queued`).setDescription(`[${res.tracks[0].title}](${res.tracks[0].uri})`);
        if (player.queue.length >= 1)
          //await delay(4900)
          message.channel.send(embed4);
        return;
    }
  },
};
  