const { MessageEmbed } = require("discord.js");
const redeemCode = require("../../models/redeemCode");

const prettyMiliSeconds = require("pretty-ms");
const uniqid = require("uniqid");
const ms = require("ms");

module.exports = {
  name: "gencode",
  aliases: ["generatecode", "createcode", "gc"],
  description: "owner only",
  run: async (client, message, args) => {
    try {
      if (!client.config.owner.includes(message.author.id)) return;

      if (!args[0]) {
        return message.channel.send({
          embed: {
            color: client.colors.error,
            description: ` | No Expiry Specified!`,
          },
        });
      }

      const Expiry = ms(args[0]) + Date.now();
      let Usage = 1;
      if (args[1] && !isNaN(args[1])) {
        Usage = args[1];
      }

      const Code = uniqid();

      message.channel.send({
        embed: {
          color: client.colors.main,
          description: ` Premium Redeem Code\`\`\`${Code}\`\`\``,
          fields: [
            {
              name: "Premium Time",
              value: prettyMiliSeconds(Expiry-Date.now()),
            },
            {
              name: "Usage Allowed",
              value: `${Usage}`,
            },
          ],
        },
      });

      const premObj = {
        Usage: Usage,
        Code: Code,
        Expiry: Expiry,
      };

      const saveCode = new redeemCode(premObj);
      await saveCode.save();

    } catch (err) {
      const error = new MessageEmbed().setColor(client.colors.error).setDescription(`An **Error** Occurred \`\`\`${err}\`\`\``);

      return await message.channel.send(error);
    }
  },
};