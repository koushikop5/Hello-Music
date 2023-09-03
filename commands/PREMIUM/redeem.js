const { MessageEmbed } = require("discord.js");
//const { default_prefix } = require(" ../config.json");
const redeemCode = require("../../models/redeemCode");
const premiumGuild = require("../../models/premiumGuild");

const prettyMiliSeconds = require("pretty-ms");

module.exports = {
  name: "redeem",
  aliases: ["redeemcode"],
  description: "owner only",
  run: async (client, message, args) => {
    try {
      //if (!client.config.owner.includes(message.author.id)) return;
      let prefix = await client.db.get(`prefix_${message.guild.id}`);
      if (prefix === null) prefix = client.prefix;

      const isPremiumGuild = await premiumGuild.findOne({
        GuildID: message.guild.id
      })

      if (isPremiumGuild) {
        return message.channel.send({
          embed: {
            color: client.colors.success,
            description: `Guild already premium activated `,
          },
        });
      }

      if (!args[0]) {
        return message.channel.send({
          embed: {
            color: client.colors.error,
            description: `<a:error:885663139285327913> | You to specify a valid query. Example: \`\`\`=redeem <code>.\`\`\``,
          },
        });
      }

      const CodeOk = await redeemCode.findOne({ Code: args[0] });

      if (!CodeOk) {
        return message.channel.send({
          embed: {
            color: client.colors.error,
            description: `<a:error:885663139285327913> | The code you provided is invalid. `,
          },
        });
      }

      const newPrem = new premiumGuild({
        GuildID: message.guild.id,
        Expire: CodeOk.Expiry,
        Permanent: false,
      });

      await newPrem.save();

      if (CodeOk.Usage <= 1) {
        await CodeOk.delete();
      } else {
        await redeemCode.findOneAndUpdate({ Code: args[0] }, { Usage: CodeOk.Usage - 1 });
      }

      return message.channel.send({
        embed: {
          color: client.colors.success,
          description: `<a:cd_moneybag:914599670330847283> | **You have successfuly redeemed ${client.user.username} premium Type:** \`\`\`${prefix}validity\`\`\``,
          /*fields: [
            {
              name: "Server Name",
              value: message.guild.name,
            },
            {
              name: "Server Id",
              value: message.guild.id,
            },
            {
              name: "Premium Type",
              value: CodeOk.Expiry < Date.now() ? "Expired" : "Temporary",
            },
            {
              name: "Premium Expiry",
              value: `${prettyMiliSeconds(CodeOk.Expiry - Date.now())}`,
            },
          ],*/
        },
      });
    } catch (err) {
      const error = new MessageEmbed().setColor(client.colors.error).setDescription(`An **Error** Occurred \`\`\`${err}\`\`\``);

      return await message.channel.send(error);
    }
  },
};
