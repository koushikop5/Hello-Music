const { default_prefix } = require("../../config.json");
const { MessageEmbed } = require("discord.js");
module.exports = { 
  name: "prefix",
  category: "moderation",
  //userPermission: ["ADMINISTRATOR"],
  usage: "prefix <new-prefix>",
  description: "Change the guild prefix",
  run: async (client, message, args) => {
    if (!args[0]) {
      return message.channel.send({ embed: { color: client.colors.error, description: "<a:error:885663139285327913> | Provide new prefix you want to set" } });
    }
if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(new MessageEmbed()
    .setColor(client.colors.error)
    .setDescription(`<a:error:885663139285327913> | You don't have \`ADMINISTRATOR\` permission for this Command!`)
    );
    if (args[1]) {
      return message.channel.send({ embed: { color: client.colors.error, /*description: "<:Flute_Error:871310275926695997> | You can not set prefix a double argument"*/ } });
    }

    if (args[0].length > 5) {
      return message.channel.send({ embed: { color: client.colors.error, description: "<a:error:885663139285327913> | Prefix must not be longer than 5 characters" } });
    }

    if (args.join("reset") === default_prefix) {
      client.db.delete(`prefix_${message.guild.id}`);
      return await message.channel.send({ embed: { color: client.colors.error, description: "<a:dis_t:885665406143066133> | Successfully prefix reset" } });
    }

    client.db.set(`prefix_${message.guild.id}`, args[0]);
    await message.channel.send({ embed: { color: client.colors.error, description: `<a:dis_t:885665406143066133> | Successfully prefix set to **\`${args[0]}\`**` } });
  },
};
