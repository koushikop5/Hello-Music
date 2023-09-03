const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "stop",
  vcOnly: true,
  run: async (client, message, args) => {
   const player = message.client.manager.players.get(message.guild.id);
    const color = message.guild.me.roles.highest.color;

    if (!player) {
      let embed = new MessageEmbed().setColor(client.colors.error).setDescription("<a:error:885663139285327913> | There is nothing playing");
      return message.channel.send(embed);
    }

    const { channel } = message.member.voice;

    if (channel.id !== player.voiceChannel) {
      let embed = new MessageEmbed().setColor(client.colors.error).setDescription(`<a:error:885663139285327913> | Must Join The Same Voice Channel`);
      return message.channel.send(embed);
    }
    player.stop();
    player.queue.clear();
    return message.channel.send({
      embed: {
        color: client.colors.success,
        description: "<a:dis_t:885665406143066133> | Song Has Been Stopped",
      },
    });
  },
};



