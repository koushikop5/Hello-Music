const delay = require("delay");
const { MessageEmbed } = require("discord.js");
//const { nightcore } = require('../../utils/filter.js')

module.exports = {
  name: "nightcore",
  aliases: ["nc"],
  description: "Turning on nightcore filter",
  category: "filters",
  accessableby: "Member",
  premium: true,
  run: async (client, message, args) => {
    if (!args[0]) {
      const errEmbed = new MessageEmbed().setColor(client.colors.error).setDescription("<a:error:885663139285327913> | You can set nightcore ```[ ON | OFF ]```");

      return message.channel.send(errEmbed);
    }

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

    if (args[0].toLowerCase() === "on") {
      if (player.nightcore) {
        return message.channel.send({
          embed: {
            color: client.colors.error,
            description: "Nightcore is at \`on\`",
          },
        });
      }
      //const msg = await message.channel.send({embed: {color: client.colors.success,description: `<a:Spinner:885664633673896007>`}});
      //await delay(0);
      player.setNightcore(true);
      player.nightcore = true;
      const nightcored = new MessageEmbed().setDescription("<a:dis_t:885665406143066133> | Nightcore \`Enabled\`").setColor(client.colors.success);
      //await msg.delete();
      //await message.channel.send(nightcored)
      return message.channel.send(nightcored)
    }

    console.log(player.nightcore);
    if (args[0].toLowerCase() == "reset" || args[0].toLowerCase() == "off") {
      if (!player.nightcore) {
        return message.channel.send({
          embed: {
            color: client.colors.error,
            description: "Nightcore is at \`off\`",
          },
        });
      }
      //const msg = await message.channel.send({embed: {color: client.colors.success , description: `<a:Spinner:885664633673896007>`}});
      //await delay();
      player.clearEffects();
      player.nightcore = false;
      const nightcored = new MessageEmbed().setDescription("<a:dis_1:885665533415014430> | Nightcore \`Disabled\`").setColor(client.colors.success);
      //await msg.delete();
      //await message.channel.send(nightcored)
      return message.channel.send(nightcored)
    }
  },
};