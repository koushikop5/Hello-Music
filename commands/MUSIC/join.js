const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "join",
  aliases: ["j"],
  vcOnly: true,
  run: async (client, message, args) => {
    let player = client.manager.players.get(message.guild.id);

    const embed = new MessageEmbed().setColor("client.colors.success");

    // Check if bot has permission to connect to voice channel
    if (!message.member.voice.channel.permissionsFor(message.guild.me).has("CONNECT")) {
      return message.channel.send(embed.setColor(client.colors.error).setDescription("<a:error:885663139285327913> | I Need \`CONNECT\` Permission In Your Voice Channel"))//.then((m) => m.delete({ timeout: 10000 }));
    }

    // Check if bot has permission to speak in the voice channel
    if (!message.member.voice.channel.permissionsFor(message.guild.me).has("SPEAK")) {
      return message.channel.send(embed.setColor(client.colors.error).setDescription("<a:error:885663139285327913> | I Need \`SPEAK\` Permission In Your Voice Channel"))//.then((m) => m.delete({ timeout: 10000 }));
    }

    // If no player create one and join channel
    if (!player) {
      try {
        player = client.manager.create({
          guild: message.guild.id,
          voiceChannel: message.member.voice.channel.id,
          textChannel: message.channel.id,
          selfDeafen: true,
        });
        await player.connect();
        message.channel.send(embed.setDescription(`<a:dis_t:885665406143066133> | Successfully connected`).setColor(client.colors.main));
      } catch (err) {
        console.log(err)
      }
    } else {
      // Move the bot to the new voice channel / update text channel
      try {
        //await player.setVoiceChannel(message.member.voice.channel.id);
        //await player.setTextChannel(message.channel.id);
        const embed = new MessageEmbed().setColor(client.colors.main).setDescription(`<a:error:885663139285327913> | I am already joined.`);
        message.channel.send(embed);
      } catch (err) {
        embed(`${client.emoji.error} | error: ${err.message}`, message.channel)//.then((m) => m.delete({ timeout: 5000 }));
      }
    }
  },
};


