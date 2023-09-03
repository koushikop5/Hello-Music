const { MessageEmbed } = require("discord.js");
const premSchema = require("../../models/premiumGuild");

const day = require("dayjs");

module.exports = {
  name: "addpremium",
  aliases: ["apg", "add"],
  description: "owner only",
  run: async (client, message, args) => {
    try {
      if (!client.config.owner.includes(message.author.id)) return;

      
      if (!args[0]) {
        return message.channel.send({
          embed: {
            color: client.colors.error,
            description: `<a:error:885663139285327913> | Provide guild id`,
          },
        });
      }

      const guildId = args[0];
      if (!client.guilds.cache.has(guildId)) {
        return message.channel.send({
          embed: {
            color: client.colors.error,
            description: `<a:error:885663139285327913> | Invalid guild id provide valid guild id`,
          },
        });
      }

      const isAlreadyPrem = await premSchema.findOne({
        GuildID: guildId,
      });

      if (isAlreadyPrem) await isAlreadyPrem.delete();

      if (args[1]) {
        const Expire = day(args[1]).valueOf();

        const newPrem = new premSchema({
          GuildID: guildId,
          Expire,
          Permanent: false,
        });

        await newPrem.save();

        const guildName = client.guilds.cache.get(guildId).name;
        return message.channel.send({
          embed: {
            color: client.colors.success,
            description: `<a:dis_t:885665406143066133> | Successfully premium added`,
            fields: [
              {
                name: "Guild Id",
                value: guildId,
              },
              {
                name: "Guild Name",
                value: guildName,
              },
              {
                name: "Premium Type",
                value: Expire < Date.now() ? "Expired" : "Temporary",
              },
              {
                name: "Premium Expiry",
                value: `${new Date(Expire)}`,
              },
            ],
          },
        });
      } else {
        const permanentPrem = new premSchema({
          GuildID: guildId,
          Expire: 0,
          Permanent: true,
        });

        await permanentPrem.save();

        const guildName = client.guilds.cache.get(guildId).name;
        return message.channel.send({
          embed: {
            color: client.colors.error,
            description: `<a:dis_t:885665406143066133> | Permanent premium added in this server`,
            fields: [
              {
                name: "Guild Id",
                value: guildId,
              },
              {
                name: "Guild Name",
                value: guildName,
              },
              {
                name: "Premium Type",
                value: "Permanent",
              },
            ],
          },
        });
      }
    } catch (err) {
      const error = new MessageEmbed().setColor(client.colors.error).setDescription(`An **Error** Occurred \`\`\`${err}\`\`\``);

      return await message.channel.send(error);
    }
  },
};
;
