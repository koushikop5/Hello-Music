/*const config = require("../../botconfig/config.json"); //loading config file with token and prefix, and settings
const ee = require("../../botconfig/embed.json"); //Loading all embed settings like color footertext and icon ...
const emoji = require("../../botconfig/emojis.json");*/

let cooldown = {};
const { MessageButton } = require("discord-buttons");
const { MessageEmbed } = require("discord.js");
const discord = require("discord.js");
const { default_prefix } = require("../config.json");

const premiumSchema = require("../models/premiumGuild");

module.exports = {
  name: "message",
  async execute(client, message) {
    try {
      if (!message.guild) return;

      let prefix = await client.db.get(`prefix_${message.guild.id}`);
      if (prefix === null) prefix = client.prefix;

      const mention = new RegExp(`^<@!?${client.user.id}>( |)$`);

      if (message.content.match(mention)) {
        
        

        const embed = new MessageEmbed()
          .setAuthor(`${client.user.username}`, client.user.displayAvatarURL())
          .setColor(client.colors.main)
          //.setTitle(`${client.user.username}`)
          .setDescription(`My prefix for this server is \`\`\`${prefix}\`\`\`
Want to see all the commands available? Use \`\`\`${prefix}help\`\`\``);

        message.channel.send({ embed});
      }

      const prefixMention = new RegExp(`^<@!?${client.user.id}> `);
      const paras = message.content.match(prefixMention) ? message.content.match(prefixMention)[0] : prefix;

      if (message.author.bot) return;
      if (!message.guild) return;

      if (!message.content.startsWith(paras)) return;

      // If message.member is uncached, cache it.
      if (!message.member) message.member = await message.guild.fetchMember(message);

      const args = message.content.slice(paras.length).trim().split(/ +/g);
      const cmd = args.shift().toLowerCase();

      if (cmd.length === 0) return;

      //Get the command
      let command = client.commands.get(cmd);
      // If none is found, try to find it by alias
      if (!command) command = client.commands.get(client.aliases.get(cmd));

      // If a command is finally found, run the command
      //if (command) command.run(client, message, args);

      if (!command) return;

     

      //-------------------------------------------- P E R M I S S I O N -------------------------------------------

      if (command.botPermission) {
        let neededPerms = [];

        command.botPermission.forEach((p) => {
          if (!message.channel.permissionsFor(message.guild.me).toArray().includes(p)) neededPerms.push("`" + p + "`");
        });

        if (neededPerms.length) return message.author.send(new MessageEmbed().setColor(client.colors.error).setDescription(`<a:error:885663139285327913> | I need ${neededPerms.join(", ")} permission(s) to execute the command!`));
      }
      if (command.userPermission) {
        let neededPerms = [];

        command.userPermission.forEach((p) => {
          if (!message.member.hasPermission(p)) neededPerms.push("`" + p + "`");
        });

        if (neededPerms.length) return message.author.send(`<a:error:885663139285327913> | You need ${neededPerms.join(", ")} permission(s) to run the command!`);
      }

      // ---------------------------------------------O W N E R ----------------------------------------------------------
      if (command.vcOnly) {
        const { channel } = message.member.voice;

        if (!channel) {
          let embed = new MessageEmbed().setColor(client.colors.error).setDescription(`<a:error:885663139285327913> | You have to be connected to a voice channel before you can use this command!`);
          return message.channel.send(embed);
        }
      }

      if (command.ownerOnly) {
        if (!owner.includes(message.author.id)) return;
        message.channel.send({
          embed: {
            color: client.colors.error,
            description: `<a:error:885663139285327913> | Sorry it's owner only command`,
          },
        });
      }

      // check if premium
      const isPremiumGuild = await premiumSchema.findOne({
        GuildID: message.guild.id,
      });
      // if (!owner.includes(message.author.id)) return;



      if (isPremiumGuild) {
        if (isPremiumGuild.Expire < Date.now() && !isPremiumGuild.Permanent) {
          isPremiumGuild.delete();
          return message.channel.send({
            embed: {
              color: client.colors.error,
              description: "<a:error:885663139285327913> | Your Premium Subscription Expired",
            },
          });
        }
      }
      if (command.premium && !isPremiumGuild) {
        return message.channel.send({
          embed: {
            color: client.colors.error,
            description: "<a:error:885663139285327913> | This is Premium Only Command",
          },
        });
      }

              





      
      let uCooldown = cooldown[message.author.id];

      if (!uCooldown) {
        cooldown[message.author.id] = {};
        uCooldown = cooldown[message.author.id];
      }

      let time = uCooldown[command.name] || 0;

      if (time && time > Date.now()) return message.channel.send(`You can again use this command in ${Math.ceil((time - Date.now()) / 1000)} second(s)`);

      cooldown[message.author.id][command.name] = Date.now() + command.cooldown;

      if (!message.channel.permissionsFor(client.user).has("SEND_MESSAGES")) return;

      if (!message.channel.permissionsFor(client.user).has("EMBED_LINKS")) return;

              

      if (command) await command.run(client, message, args);
    } catch (err) {
      // const error = new MessageEmbed().setColor(client.colors.error).setDescription(`An **ERROR** Occurred \`\`\`${err}\`\`\``);

      console.log(err)
      return;
    }
              }
};
