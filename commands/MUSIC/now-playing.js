const { MessageEmbed } = require('discord.js')
const {
  createBar,
  format
} = require(`../../handlers/functions`);
module.exports = {
  name: "nowplaying",
  aliases: ["np"],
  run: (client, message) => {

      



    const { channel } = message.member.voice;
    
    
    
    //if he is not connected to a vc return error
    if (!channel) return message.channel.send(new MessageEmbed().setColor(client.colors.error).setDescription(`<a:error:885663139285327913> | You have to be in a voice channel to use this command.`));
    //send error if member is Deafed
    if (message.member.voice.selfDeaf) return message.channel.send(new MessageEmbed().setColor(client.colors.error).setDescription(`<a:error:885663139285327913> | You can't run this command while deafened`));
    //get voice channel of the bot
    const botchannel = message.guild.me.voice.channel;
    //get the music player
    const player = client.manager.players.get(message.guild.id);
    //if no player or no botchannel return error
    if (!player || !botchannel) return message.channel.send(new MessageEmbed().setColor(client.colors.error).setDescription(`<a:error:885663139285327913> | Nothing playing in this server`));
    //if queue size too small return error
    if (!player.queue || !player.queue.current) return message.channel.send(new MessageEmbed().setColor(client.colors.error).setDescription(`<a:error:885663139285327913> | Nothing playing in this server`));
    //if user is not in the right channel as bot, then return error
    if (player && channel.id !== player.voiceChannel)
      return message.channel.send(new MessageEmbed().setColor(client.colors.error).setDescription(`<a:error:885663139285327913> | Join same voice channel to use this command`));
    //Send Information Message
    message.channel.send(new MessageEmbed()
      .setAuthor("🎵 | Now Playing")
        
      
      
      
      
      
      
      
      
      .setThumbnail(`https://img.youtube.com/vi/${player.queue.current.identifier}/mqdefault.jpg`)
      .setColor(client.colors.main)
      .setDescription(`[${player.queue.current.title.split("[").join("\[").split("]").join("\]")}](${player.queue.current.uri})\n\n\`${format(player.position).split(" | ")[0]}\`  \`▶ ${createBar(player)}\`  
\`${format(player.queue.current.duration).split(" | ")[0]}\``)
                         .setFooter(`Requested by ${player.queue.current.requester.tag}`)
    ).catch(e => {
      return message.channel.send("<a:error:885663139285327913> | Your Dm's are disabled")
    })

  }
};