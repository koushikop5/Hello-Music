const { MessageEmbed } = require("discord.js");
const colors = require("./colors");
const emojis = require("./emojis");

module.exports = {
  error: (msg) => {
    return new MessageEmbed().setColor(colors.error).setDescription(`${emojis.error} | ${msg}`);
  },
  success: (msg) => {
    return new MessageEmbed().setColor(colors.success).setDescription(`${emojis.success} | ${msg}`);
  },
  enabled: (msg) => {
    return new MessageEmbed().setColor(colors.success).setDescription(`${emojis.enabled} | ${msg}`);
  },
  disabled: (msg) => {
    return new MessageEmbed().setColor(colors.success).setDescription(`${emojis.disabled} | ${msg}`);
  },
};
