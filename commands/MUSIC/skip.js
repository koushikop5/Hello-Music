/*const { MessageEmbed } = require("discord.js");
module.exports = {
  name: "skip",
  aliases: ["s"],
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

    /*player.destroy();
    return message.channel.send({
      embed: {
        color: client.colors.success,
        description: "<a:dis_t:885665406143066133> | Skipped the current song",
      },*/
    /*player.skip()
            .then(x => {
              message.channel.send(new MessageEmbed().setDescription(`${client.emoji.success} | Skipped the current song.`));
    });
  },
};*/

const handler = require('../../handlers/message');

module.exports = {
    name: 'skip',
    description: 'Skip current song',
    usage: 'skip',
    aliases: ['s'],
   run: async (client, message, args) => {
        //const player = client.player.players.get(message.guild.id);
      const player = message.client.manager.players.get(message.guild.id);
        if (!player) return message.channel.send(new handler().normalEmbed('<a:error:885663139285327913> | Currently not playing anything.'))
        if (!player.queue.current) return message.channel.send(new handler().normalEmbed('<a:error:885663139285327913> | Currently not playing anything.'))
        player.stop()
            .then(x => {
              message.channel.send(new handler().normalEmbed(`${client.emoji.success} | Skipped the current song.`));
                //message.react('⏭').catch((_) => { })
            })
            .catch(err => {
                message.channel.send(new handler().normalEmbed(err))
            })
    }
}
