const { MessageEmbed } = require("discord.js");

module.exports = async (client, text, channel) => {
  let embed = new MessageEmbed().setColor("FF9E9E").setDescription("<:Flute_success:871587799873257472>" + "" + text);
  await channel.send(embed);
};
