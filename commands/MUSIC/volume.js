const { MessageEmbed } = require("discord.js");
/*module.exports = {
  name: "volume",
  aliases: ["vol"],
  vcOnly: true,
  premium: true,
  run: (client, message, args) => {
      
    
    
    
    const player = message.client.manager.players.get(message.guild.id);
    const color = message.guild.me.roles.highest.color;

    if (!player) {
      let embed = new MessageEmbed().setColor(client.colors.error).setDescription("<a:error:885663139285327913> | There is nothing playing");
      return message.channel.send(embed);
    }

    const { channel } = message.member.voice;

    if (channel.id !== player.voiceChannel) {
      let embed = new MessageEmbed().setColor(client.colors.error).setDescription("<a:error:885663139285327913> | Must Join The Same Voice Channel");
      return message.channel.send(embed);
    }
    if (!args.length) {
      let embed = new MessageEmbed()
        .setColor(client.colors.error)

        .setDescription(`<a:error:885663139285327913> | You can set volume 1 to 150`);

      return message.channel.send(embed);
    }

    if (isNaN(args[0])) {
      let embed = new MessageEmbed().setColo(client.colors.error).setDescription("<a:error:885663139285327913> | That is not a vaild number");
      return message.channel.send(embed);
    }

    if (args[0] < 1 || args[0] > 150) {
      let embed = new MessageEmbed().setColor(client.colors.error).setDescription("<a:error:885663139285327913> | Volume should be 1 to 150");
      return message.channel.send(embed);
    }

    const volume = Number(args[0]);

    player.setVolume(volume);
    return message.channel.send({
      embed: {
        color: client.colors.success,
        description: `<a:dis_t:885665406143066133> | Volume set to \`${args[0]}%.\``,
      },
    });
  },
};*/


//const handler = require('../../handlers/message');
   
//const isPermGuild = require("../../models/premiumGuild");

module.exports = {
    name: 'volume',
    description: 'Set volume of the player',
    usage: 'volume [ value ]',
    aliases: ['vol'],
    vcOnly: true,
    premium: true,
  run:  async (client, message, args) => {
        try {
            //const player = client.player.players.get(message.guild.id);
            const player = message.client.manager.players.get(message.guild.id);
            if (!player) return message.channel.send(new MessageEmbed().setColor(client.colors.error).setDescription('<a:error:885663139285327913> | Currently not playing anything.'))
            if (!args[0]) return message.channel.send(new MessageEmbed().setColor(client.colors.error).setDescription(`<:volume_rubby:885982385370431512> | Volume is at \`${player.volume}%.\``))
            if (isNaN(args[0])) return message.channel.send(new MessageEmbed().setColor(client.colors.error).setDescription(`<a:error:885663139285327913> | You can set volume 0 to 150`));
            if (args[0] < 0 || args[0] > 150) return message.channel.send(new MessageEmbed().setColor(client.colors.error).setDescription(`<a:error:885663139285327913> | You can set volume 0 to 150`));
            /*const isPermium = await isPermGuild.findOne({
      GuildID: message.guild.id,
    })

    if (!isPermium) {
      await message.channel.send(new MessageEmbed().setColor(client.colors.main).setDescription("This is a premium based command. Buy premium subscription to get access  the command. Join our **[Support Server](https://discord.gg/G3Rc6mSzmW)** for more info. **[Click here](https://www.disneybot.tk)** to get subscription of Disney Cute."));*/
    
    
              player.setVolume (parseInt(args[0]))
            return message.channel.send(new MessageEmbed().setColor(client.colors.main).setDescription('<:volume_rubby:885982385370431512> | Volume set to \`' + args[0] + '%.\`'));
            
   
    
        } catch (err) {
            message.channel.send(new MessageEmbed().setColor(client.colors.error).setDescription(`<a:error:885663139285327913> | Oops, there was an error! ` + err))
        
        }
            
  }
};