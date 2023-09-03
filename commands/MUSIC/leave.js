const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "disconnect",
  aliases: ["dc", "leave"],
  vcOnly: true,
  
  run: async (client, message, args) => {
    const embed = new MessageEmbed();

    let player = client.manager.players.get(message.guild.id);
    if (!player) return;
    const { channel } = message.member.voice;

    if (channel.id !== player.voiceChannel) {
      let embed = new MessageEmbed().setColor(client.colors.error).setDescription("<a:error:885663139285327913> | Must Be In Same Voice Channel");
      return message.channel.send(embed);
    }

    if (player) {
      player.disconnect();
    } else {
      message.member.voice.channel.leave();
    }

    return message.channel.send(embed.setColor(client.colors.success).setDescription(`<a:dis_t:885665406143066133> | Successfully disconnected`));
  },
};
