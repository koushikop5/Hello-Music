const { MessageEmbed } = require("discord.js");
module.exports = {
  name: "loop",
  aliases: [""],
  vcOnly: true,
  run: async (client, message, args) => {

    const checkPrefix = await client.db.get(`prefix_${message.guild.id}`);
    const prefix = (await checkPrefix) ? checkPrefix : client.config.default_prefix;

    const player = message.client.manager.players.get(message.guild.id);
    const { channel } = message.member.voice;

    // If the client isn't in a voiceChannel, don't execute any other code
    if (!message.guild.voiceConnection && !player) {
      return message.channel.send(
        new MessageEmbed()
          .setColor(client.colors.error)
          .setDescription(`<a:error:885663139285327913> | Join a Voice Channel`)
      );
    }

    if (channel.id !== player.voiceChannel) {
      let embed = new MessageEmbed().setColor(client.colors.error).setDescription("<a:error:885663139285327913> | Must Be In Same Voice Channel ");
      return message.channel.send(embed);
    }

    if (!args[0] || args[0].toLowerCase() == "song") {
      if (!player.trackRepeat) {
        player.setTrackRepeat(true);
        return message.channel.send({ embed: { color: client.colors.success, description: "<a:dis_t:885665406143066133> | Loop Is \`Enabled\`" } });
      } else {
        player.setTrackRepeat(false);
        return message.channel.send({ embed: { color: client.colors.success, description: "<a:dis_1:885665533415014430> | Loop Is \`Disabled\`" } });
      }
    } else if (args[0] == "queue") {
      if (player.queueRepeat) {
        player.setQueueRepeat(false);
        return message.channel.send({ embed: { color: client.colors.success, description: "<a:dis_1:885665533415014430> | Queue Loop Is \`Disabled\`" } });
      } else {
        player.setQueueRepeat(true);
        return message.channel.send({ embed: { color: client.colors.success, description: "<a:dis_t:885665406143066133> | Queue Loop Is \`Enabled\`" } });
      }
    }
  },
};
