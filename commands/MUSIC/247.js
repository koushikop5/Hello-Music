const { MessageEmbed } = require("discord.js");
const config = require("../../config");
const Topgg = require("@top-gg/sdk");
const topgg = new Topgg.Api(config.topgg);
const db = require("quick.db");
const isPermGuild = require("../../models/premiumGuild");
const autoReconnect = require("../../models/autoReconnect");

module.exports = {
  name: "24/7",
  aliases: ["247", "24h", "24*7"],
  run: async (client, message, args) => {

const checkPrefix = await client.db.get(`prefix_${message.guild.id}`)
    const prefix = await checkPrefix ? checkPrefix : client.config.default_prefix

    
    try {
      let player = message.client.manager.players.get(message.guild.id);

      if (!args[0]) {
        const errEmbed = new MessageEmbed().setColor(client.colors.error).setTitle(`${client.user.username}`)
        .addField(`**Commands**`, `\`\`\`${prefix}24/7, 247, 24h\`\`\``)
        .addField(`**Description**`, `Bot's 24/7 Commands`)
        .addField("**How To Set 247 ?**", `\`\`\`${prefix}247 <enable/disable>\`\`\``)
        .addField("**Example**", `\`\`\`${prefix}247 enable\`\`\``)
        return message.channel.send(errEmbed);
      }

      //let voted = await topgg.hasVoted(message.author.id);

      const isPermium = await isPermGuild.findOne({
        GuildID: message.guild.id,
      });

      if (!isPermium) {
        return await message.channel.send(new MessageEmbed().setColor(client.colors.error).setDescription(`You Need To Vote For Use This Command! [Vote Here](https://top.gg/bot/911504454795268096/vote) Or Buy [Premium](https://discord.gg/USCCng5trg)`));
      }

      if (!message.member.hasPermission("MANAGE_GUILD")) {
        message.channel.send(new MessageEmbed().setColor(client.colors.error).setDescription("<a:error:885663139285327913> | You don't have ```MANAGE_GUILD``` permission to use this command"));
        return message.channel.send(embed);
      }

      if (!player) {
        player = client.manager.create({
          guild: message.guild.id,
          voiceChannel: message.member.voice.channel.id,
          textChannel: message.channel.id,
          selfDeafen: true,
        });
        await player.connect();
      }

      const isAutoReconnect = await autoReconnect.findOne({
        GuildID: message.guild.id,
      });

      if (isAutoReconnect) {
        const chnl = isAutoReconnect.ChannelID;
        const VC = message.guild.channels.cache.get(chnl);
        if (!VC) {
          await isAutoReconnect.delete();
          //const errEmbed = client.embeds.error(`Looks Like 24/7 Voice Channel Deleted`).addField(`${client.emos.error} | 24/7 Disabled Now, To Enable`, `\`\`\`24/7 ${this.usage}\`\`\``);
          //return message.channel.send(errEmbed);
        }
        player.twentyFourSeven = true;
      }

      const argu = args[0].toLowerCase();

      if (argu === "enable") {
        if (player.twentyFourSeven) {
          //const errEmbed = client.embeds.error("24/7 Already Enabled");
          //return message.channel.send(errEmbed);
        }

        // saving channel id to DB
        const newAutoReconnect = new autoReconnect({
          ChannelID: player.voiceChannel,
          TextChannelID: message.channel.id,
          GuildID: message.guild.id,
        });
        await newAutoReconnect.save();

        player.twentyFourSeven = true;
        const embed = client.embeds.enabled("  24/7 mode is now ```enabled``` in this server.");
        return message.channel.send(embed);
  } else if (argu === "disable")   {
        if (!player.twentyFourSeven) {
          //const errEmbed = client.embeds.error("24/7 is Not Enabled");
          //return message.channel.send(errEmbed);
          }

        player.twentyFourSeven = false;

        await autoReconnect.findOneAndDelete({
          GuildID: message.guild.id,
        });

        const embed = client.embeds.disabled("  24/7 mode is now ```disabled``` in this server.");
        return message.channel.send(embed);
      } else {
        //const errEmbed = client.embeds.error("Arguments Must Be `ON` or `OFF`");
        //return message.channel.send(errEmbed);
      }
    } catch (err) {
      console.log(err);
    }
  },
};
