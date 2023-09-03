const { MessageEmbed } = require("discord.js");
const premSchema = require("../../models/premiumGuild");

const day = require("dayjs");

module.exports = {
  name: "removepremium",
  aliases: ["rpg", "delete"],
  description: "owner only",
  run: async (client, message, args) => {
    try {
      if (!client.config.owner.includes(message.author.id)) return;

      if (!args[0]) {
        return message.channel.send({
          embed: {
            color: client.colors.error,
            description: `<a:error:885663139285327913> | Not a valid guild`,
          },
        });
      }

      const guildId = args[0];
      if (!client.guilds.cache.has(guildId)) {
        return message.channel.send({
          embed: {
            color: client.colors.error,
            description: `<a:error:885663139285327913> | Invalid Guild Id`,
          },
        });
      }

      const isAlreadyPrem = await premSchema.findOne({
        GuildID: guildId,
      });

      if (isAlreadyPrem) {
        await isAlreadyPrem.delete();
        return message.channel.send({
          embed: {
            color: client.colors.success,
            description: `<a:mark:914596099069726730> | Successfully removed premium subscription`,
          },
        });
      }
      else {
        return message.channel.send({
          embed: {
            color: client.colors.error,
            description: `This Guild Isn't Premium`,
          },
        });
      }


    } catch (err) {
      const error = new MessageEmbed().setColor(client.colors.error).setDescription(`An **Error** Occurred \`\`\`${err}\`\`\``);

      return await message.channel.send(error);
    }
  },
};
