const { MessageEmbed } = require("discord.js")
 
const { default_prefix } = require("../config.json");
module.exports = {
  name: "guildCreate",
   async execute(client, guild, message, args) {
    const checkPrefix = await client.db.get(`prefix_${guild.id}`)
    const prefix = await checkPrefix ? checkPrefix : client.config.default_prefix

    let embed = new MessageEmbed()
      .setAuthor(`${client.user.username} `, client.user.displayAvatarURL())
        .setThumbnail(client.user.displayAvatarURL({ dynamic: true, size: 2048 }))

      .setDescription(`My prefix in this server is \`${prefix}\`\n You want to see my all commands type \`${prefix}help\`\nIf you found a bugs feel free to join [Support Server](https://discord.gg/Q2vgwXMjHF)\n Goofy is a 24/7  high quality music bot, made by Team Disney this is javascript based bot where we are trying to include everything possible join voice channel type  \`${prefix}play\` and enjoy your songs.\nChek out premium [click here](https://patreon.com/disneypro)`)
      .setColor(client.colors.success)
      .setFooter(`POWERED BY TEAM ${client.user.username} ❤️`)
      //return message.channels.send(`https://discord.gg/G3Rc6mSzmW`, embed)

    const channel = guild.channels.cache.find(channel => channel.type === 'text' && channel.permissionsFor(guild.me).has('SEND_MESSAGES', 'ADMINISTRATOR'));
    channel.send(embed)
    channel.send('https://discord.gg/Q2vgwXMjHF').catch(err => { })


    /*const ID = "913008335920459781";
     //const channel = client.channels.cache.get(client.config.log);
    //const sowner = `${guild.owner.user}`;
    const embed1 = new MessageEmbed()
      .setTitle("New Server Joined!")
      .setThumbnail(`${guild.iconURL({ dynamic: true, size: 2048 })}`)
      .addField(`Server Name:`, `${guild.name}`)
      .addField(`Server ID:`, `${guild.id}`)
      .addField(`Members:`, `${guild.memberCount}`)
      .setTimestamp()
      .setColor(client.colors.success)
      .setFooter(`My new Server Count - ${client.guilds.cache.size}`);

    client.channels.cache.get(client.config.log).send(embed1)*/
  }
}