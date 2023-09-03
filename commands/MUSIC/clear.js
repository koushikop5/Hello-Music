const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "clear",
  vcOnly: true,
  aliases: ["c"],
  run: async (client, message, args) => {
    const player = message.client.manager.players.get(message.guild.id);
    const { channel } = message.member.voice;

    const checkPrefix = await client.db.get(`prefix_${message.guild.id}`);
    const prefix = (await checkPrefix) ? checkPrefix : client.config.default_prefix;


    // If the client isn't in a voiceChannel, don't execute any other code
    if (!message.guild.voiceConnection && !player) {
      return message.channel.send(new MessageEmbed().setColor(client.colors.error).setDescription(`<a:error:885663139285327913> | Join a Voice Channel`));
    }

    if (channel.id !== player.voiceChannel) {
      let embed = new MessageEmbed().setColor(client.colors.error).setDescription("<a:error:885663139285327913> | Must Be In Same Voice Channel");
      return message.channel.send(embed);
    }

    player.queue.length = [];
    return message.channel.send(new MessageEmbed().setColor(client.colors.success).setDescription(`<a:dis_t:885665406143066133> | Successfully Cleared Current Queue`));
  },
};
