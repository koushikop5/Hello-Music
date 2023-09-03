const { MessageEmbed } = require('discord.js');












const discord = require('discord.js');
module.exports = {
  name: "remove",
  aliases: ["rm", "r"],
  discription: "remove the queue song by number",
  usage: "rm song number",
  vcOnly: true,

run:(client, message, args) => {
  const player = message.client.manager.players.get(message.guild.id)
  //const color = message.guild.me.roles.highest.color

   if (!player) {
    let embed = new MessageEmbed()
      .setColor(client.colors.error)
      .setDescription("<a:error:885663139285327913> | There is nothing playing")
    return message.channel.send(embed)
  }

  const { channel } = message.member.voice

 
  if (channel.id !== player.voiceChannel) {
    let embed = new MessageEmbed()
      .setColor(client.colors.error)
      .setDescription(`<a:error:885663139285327913> | join same voice  channel`)
    return message.channel.send(embed)
  }

  if (!args.length) {
    let embed = new MessageEmbed()
      .setColor(client.colors.error)
      
      .setDescription(`<a:error:885663139285327913> | Provide me number from queue`)
    return message.channel.send(embed)
  }

  if (isNaN(args[0])) {
    let embed = new MessageEmbed()
      .setColor(client.colors.error)
      .setDescription("<a:error:885663139285327913> | Remove must be number")
    return message.channel.send(embed)
  }

  if (args[0] > player.queue.length || args[0] <= 0) {
    let embed = new MessageEmbed()
      .setColor(client.colors.error)
      .setDescription(`<a:error:885663139285327913> | Last song number  is ${player.queue.length}`)
    return message.channel.send(embed)
  }

  player.queue.splice(args[0] - 1, 1) ;
  return message.channel.send(new MessageEmbed().setColor(client.colors.main).setDescription("<a:error:885663139285327913> | Successfully  removed the song"));
}
};