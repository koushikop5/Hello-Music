const { MessageEmbed } = require("discord.js");
const redeemCode = require("../../models/redeemCode");

const day = require("dayjs");
const uniqid = require("uniqid");
const prettyMiliSeconds = require("pretty-ms");

module.exports = {
  name: "checkcode",
  description: "owner only",
  run: async (client, message, args) => {
    try {
      if (!client.config.owner.includes(message.author.id)) return;

      if (!args[0]) {
        return message.channel.send({
          embed: {
            color: client.colors.error,
            description: ` <a:error:885663139285327913> | No Code Specified!`,
          },
        });
      }

      const CodeOk = await redeemCode.findOne({
        Code: args[0],
      });

      if (!CodeOk) {
        return message.channel.send({
          embed: {
            color: client.colors.error,
            description: ` <a:error:885663139285327913> | Invalid Code or Code Expired!`,
          },
        });
      }

      message.channel.send({
        embed: {
          color: client.colors.main,
          description: `Premium Redeem Code\n\`\`\`${CodeOk.Code}\`\`\``,
          fields: [
            {
              name: "Premium Time",
              value: prettyMiliSeconds(CodeOk.Expiry-Date.now()),
            },
            {
              name: "Usage Left",
              value: `${CodeOk.Usage}`,
            },
          ],
        },
      });
    } catch (err) {
      const error = new MessageEmbed().setColor(client.colors.error).setDescription(`An **Error** Occurred \`\`\`${err}\`\`\``);

      return await message.channel.send(error);
    }
  },
};
