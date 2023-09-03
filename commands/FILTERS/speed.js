const discord = require("discord.js");
const delay = require("delay");
const { MessageEmbed } = require("discord.js");
module.exports = {
  name: "speed",
	premium: true,
  run: async (client, message, args) => {
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

    // Change bassboost value
    if (!player.queue.current.isSeekable) {
      return message.channel.send(new MessageEmbed().setColor(client.colors.main).setDescription("<a:error:885663139285327913> | You can't use speed in live song"));
    }

    // Make sure Number is a number
    if (isNaN(args[0])) {
      return message.channel.send(new MessageEmbed().setColor(client.colors.main).setDescription("<a:error:885663139285327913> | speed must be a number \`[ speed 1 ]\`"));
    }

    // Make sure number is between 1 and 10
    if (args[0] < 0 || args[0] > 10) {
      return message.channel.send(new MessageEmbed().setColor(client.colors.main).setDescription("<a:error:885663139285327913> | Number Must Be Between 1 To 10"));
    }

    // Change speed value
    try {
      player.setSpeed(args[0]);
      message.channel.send({
        embed: {
          color: client.colors.main,
          description: `<a:dis_t:885665406143066133> | Speed set to \`${player.speed}\``,
        },
      });
    } catch (err) {
      if (message.deletable) message.delete();
      console.log(`Command: '${this.help.name}' has error: ${err.message}.`);
    }

    if (args[0].toLowerCase() == "reset" || args[0].toLowerCase() == "off") {
      player.clearEffects();
      //const msg = await message.channel.send(`<a:Flute_Search:871431395707355206> | Turning off **speed**.`);
      const embed = new MessageEmbed().setDescription("<a:dis_1:885665533415014430> | Speed \`Disabled\`").setColor(client.colors.main);
      //await delay();
      return message.channel.send(embed);
    }
  },
};
