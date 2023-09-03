const { MessageEmbed } = require('discord.js');
const moment = require('moment');
const { mem, cpu, os } = require('node-os-utils');
const { stripIndent } = require('common-tags');
const bytes = require('bytes');
const prettyMilliseconds = require("pretty-ms")

module.exports = {
  name: 'stats',
  description: 'The ping Command',
  category: 'Info',
  aliases: ['botinfo'],
  run: async (client, message, args) => {

    let users = 0;
    client.guilds.cache.forEach(guild => {
      users += guild.memberCount;
    })

    const clientStats = stripIndent`
      Servers   :: ${message.client.guilds.cache.size}
      Users     :: ${users}
      Channels  :: ${message.client.channels.cache.size}
      WS Ping   :: ${Math.round(message.client.ws.ping)}ms
      Uptime    :: ${prettyMilliseconds(client.uptime)}
    `;
    const { totalMemMb, usedMemMb } = await mem.info();
    const serverStats = stripIndent`
      OS        :: ${await os.oos()}
      CPU       :: ${cpu.model()}
      Cores     :: ${cpu.count()}
      CPU Usage :: ${await cpu.usage()} %
      RAM       :: ${bytes(bytes(`${totalMemMb}MB`))}
      RAM Usage :: ${bytes(bytes(`${usedMemMb}MB`))} 
    `;
    const embed = new MessageEmbed()
      .setTitle(`${client.user.username}\'s Statistics`)
      .addField('Commands', `\`${message.client.commands.size}\` commands`, true)
      .addField('Aliases', `\`${message.client.aliases.size}\` aliases`, true)
      .addField('Client', `\`\`\`asciidoc\n${clientStats}\`\`\``)
      .addField('Server', `\`\`\`asciidoc\n${serverStats}\`\`\``)
      .setThumbnail(client.user.displayAvatarURL())
      .setFooter("Developed By KOUSHIK#7001 & VISHU#4952")
      .setTimestamp()
      .setColor(client.colors.main);
    message.channel.send(embed);
  }
};
