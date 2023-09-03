const Discord = require("discord.js");
const premSchema = require("../../models/premiumGuild");

const day = require("dayjs");
const prettyMilliseconds = require('pretty-ms');


module.exports = {
  name: "validity",
  aliases: ["v"],
  description: "Check your premium Time",
  run: async (client, message, args) => {
    try {
      const isPremium = await premSchema.findOne({
        GuildID: message.guild.id,
      });

      if (!isPremium) {
        return message.channel.send({
          embed: {
            color: client.colors.error,
            description: ` | This Server is Not Premium`,
          },
        });
      } else {
        if (isPremium.Expire < Date.now() && !isPremium.Permanent) {
          await isPremium.delete();
          return message.channel.send({
            embed: {
              color: client.colors.error,
              description: ` | This Server's Premium Expired on ${day(isPremium.Expire)}`,
            },
          });
        }
        console.log(isPremium);
        if (!isPremium.Permanent) {
          return message.channel.send({
            embed: {
              color: client.colors.success,
              description: ` This Server is Premium`,
              fields: [
                {
                  name: "Premium Expiry",
                  value: prettyMiliSeconds(isPremium.Expire-Date.now()),
                },
              ],
            },
          });
        }
        return message.channel.send({
          embed: {
            color: client.colors.success,
            description: `This Server have Permanent Premium Membership`,
          },
        });
      }
    } catch (err) {
      const error = new MessageEmbed().setColor(client.colors.error).setDescription(`An **ERROR** Occurred \`\`\`${err}\`\`\``);

      return await message.channel.send(error);
    }
  },
};
