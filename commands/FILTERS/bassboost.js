const { MessageEmbed } = require("discord.js");
const delay = require("delay");

module.exports = {
  name: "bassboost",
  aliases: ["bb"],
  premium: true,
  run: async (client, message, args) => {
    const player = message.client.manager.players.get(message.guild.id);

    if (!player) {
      let embed = new MessageEmbed().setColor(client.colors.error).setDescription("<a:error:885663139285327913> | There is nothing playing");
      return message.channel.send(embed);
    }

    const { channel } = message.member.voice;

    if (!channel) {
      let embed = new MessageEmbed().setColor(client.colors.error).setDescription("<a:error:885663139285327913> | Connect to a voice channel");
      return message.channel.send(embed);
    }

    if (channel.id !== player.voiceChannel) {
      let embed = new MessageEmbed().setColor(client.colors.error).setDescription(`<a:error:885663139285327913> | Join Same Voice Channel`);
      return message.channel.send(embed);
    }

    if (!args[0]) {
      player.setEQ([
        {
          band: 0,
          gain: 0,
        },
        {
          band: 1,
          gain: 0,
        },
        {
          band: 2,
          gain: 0,
        },
        {
          band: 3,
          gain: 0,
        },
        {
          band: 4,
          gain: 0,
        },
        {
          band: 5,
          gain: 0,
        },
        {
          band: 6,
          gain: 0,
        },
        {
          band: 7,
          gain: 0,
        },
        {
          band: 8,
          gain: -0.25,
        },
        {
          band: 9,
          gain: -0.25,
        },
        {
          band: 10,
          gain: -0.25,
        },
        {
          band: 11,
          gain: -0.25,
        },
        {
          band: 12,
          gain: -0.25,
        },
        {
          band: 13,
          gain: -0.25,
        },
      ]);
      //const msg = await message.channel.send(`<a:Spinner:885664633673896007> | Turning on **bassboost**.`);
      const embed = new MessageEmbed().setDescription("<a:dis_t:885665406143066133> | Activated \`Bassboost\`").setColor(client.colors.success);
      await delay(0);
      return message.channel.send(embed)//msg.edit("", embed);
    }

    if (args[0].toLowerCase() == "reset" || args[0].toLowerCase() == "off") {
      player.clearEffects();
      player.setEQ(
        Array(10)
          .fill(0)
          .map((n, i) => ({
            band: i,
            gain: 0,
          }))
      );
      //const msg = await message.channel.send(`<a:Spinner:885664633673896007> | Turning off **bassboost**.`);
      const embed = new MessageEmbed().setDescription("<a:dis_1:885665533415014430> | Deactivated  \`Bassboost\`").setColor(client.colors.success);
      await delay(0);
      return message.channel.send(embed)//msg.edit("", embed);
    }

    if (isNaN(args[0])) return message.channel.send(new MessageEmbed().setColor(client.colors.main).setDescription("<a:error:885663139285327913> | Amount must be a number, \`[ bassboost 1 ]\`"));

    if (args[0] > 10 || args[0] < -10) {
      player.setEQ(
        ...Array(6)
          .fill(0)
          .map((n, i) => ({ band: i, gain: args[0] / 10 }))
      );
    } else
      player.setEQ(
        ...Array(6)
          .fill(0)
          .map((n, i) => ({ band: i, gain: args[0] / 10 }))
      );

    //const msg = await message.channel.send(`Setting bassboost to **${args[0]}**. This may take a few seconds...`);
    const embed = new MessageEmbed().setDescription(`<a:dis_t:885665406143066133> | Bassboost set to: \`${args[0]}\``).setColor(client.colors.success);
    await delay(0);
    return message.channel.send(embed)//msg.edit("", embed);
  },
};
