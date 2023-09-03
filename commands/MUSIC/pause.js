const { MessageEmbed } = require('discord.js')

module.exports = {
  name: "pause",
  aliases: [`pause`],
  vcOnly: true,
  run: (client, message) => {
    const player = message.client.manager.players.get(message.guild.id)
    const color = message.guild.me.roles.highest.color

    if (!player) {
      let embed = new MessageEmbed()
        .setColor(client.colors.error)
        .setDescription("<a:error:885663139285327913> | There Is Nothing To Playing")
      return message.channel.send(embed)
    }

    const { channel } = message.member.voice


    if (channel.id !== player.voiceChannel) {
      let embed = new MessageEmbed()
        .setColor(client.colors.error)
        .setDescription("<a:error:885663139285327913> | Must Join The Same Voice Channel")
      return message.channel.send(embed)
    }
    if (player.paused) {
      return message.channel.send({
        embed: {
          color: client.colors.main,
          description: "<a:error:885663139285327913> | Song already paused",
        },
      });
    } else if (!player.paused) {
      player.pause(true);
      return message.channel.send({
        embed: {
          color: client.colors.success,
          description: "<a:dis_t:885665406143066133> | Paused the current song.",
        },
      });
    }
  }

}
