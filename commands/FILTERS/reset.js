const delay = require("delay");
const { MessageEmbed } = require("discord.js");
//const { nightcore } = require('../../utils/filter.js')

module.exports = {
  name: "reset",
  premium: true,
  description: "Turning on nightcore filter",
  category: "filters",
  accessableby: "Member",
  aliases: [],

  run: async (client, message) => {
    //const msg = await message.channel.send("<a:Flute_Search:871431395707355206> | Reseting all filters.");

    const player = message.client.manager.players.get(message.guild.id);

    if (!player) {
      let embed = new MessageEmbed().setColor(client.colors.error).setDescription("<a:error:885663139285327913> | There is nothing playing");
      return message.channel.send(embed);
    }

    const { channel } = message.member.voice;

    if (!channel) {
      let embed = new MessageEmbed().setColor(client.colors.error).setDescription("<a:error:885663139285327913> | Please connect to a voice channel");
      return message.channel.send(embed);
    }

    if (channel.id !== player.voiceChannel) {
      let embed = new MessageEmbed().setColor(client.colors.error).setDescription(`<a:error:885663139285327913> | Must Be In Same Voice Channel`);
      return message.channel.send(embed);
    }
    player.clearEffects();
    player.setEQ(
      Array(13)
        .fill(0)
        .map((n, i) => ({
          band: i,
          gain: 0,
        }))
    );
    const nightcored = new MessageEmbed().setDescription("<a:dis_t:885665406143066133> | Successfully cleared all filters ").setColor(client.colors.success);

    //await delay(5000);
    message.channel.send(nightcored );
  },
};
