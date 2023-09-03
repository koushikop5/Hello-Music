const { MessageEmbed } = require("discord.js");
// const { createBar, format} = require(`../../paras/functions`);

function format(millis) {
  try {
    var h = Math.floor(millis / 3600000),
      m = Math.floor(millis / 60000),
      s = ((millis % 60000) / 1000).toFixed(0);
    if (h < 1) return (m < 10 ? "0" : "") + m + ":" + (s < 10 ? "0" : "") + s + " | " + Math.floor(millis / 1000) + " Seconds";
    else return (h < 10 ? "0" : "") + h + ":" + (m < 10 ? "0" : "") + m + ":" + (s < 10 ? "0" : "") + s + " | " + Math.floor(millis / 1000) + " Seconds";
  } catch (e) {
    console.log(e);
  }
}

module.exports = {
  name: "seek",
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
      let embed = new MessageEmbed().setColor(client.colors.error).setDescription(`<a:error:885663139285327913> | Must Join The Same Voice Channel `);
      return message.channel.send(embed);
    }
    try {
      if (Number(args[0]) < 0 || Number(args[0]) >= player.queue.current.duration / 1000) return message.channel.send(new MessageEmbed().setColor(client.colors.error).setDescription(`You can seek the song from **\`0\`** - **\`${format(player.queue.current.duration)}\`**`));

      player.seek(Number(args[0]) * 1000);

      return message.channel.send({ embed: { color: client.colors.successm, description: `<a:dis_t:885665406143066133> | Seeked the current song \`${format(Number(args[0]) * 1000)}\`` } });
    } catch (e) {
      return message.channel.send(e);
    }
  },
};
