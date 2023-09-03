const { MessageEmbed } = require('discord.js')

module.exports = {
  name: "move",
  vcOnly: true,
  run: async (client, message, args) => {
    if (isNaN(args[0])) return message.channel.send('Invalid number.');
    if (args[0] === 0) return embed(`<a:error:885663139285327913> | You can't move a song that is already playing. To skip the current playing song type: \`${client.config.prefix}skip\``, message.channel)

    let player = client.manager.players.get(message.guild.id);


    if ((args[0] > player.queue.length) || (args[0] && !player.queue[args[0]])) return embed('<a:error:885663139285327913> | Song not found.', message.channel);

    if (!args[1]) {
      const song = player.queue[args[0] - 1];
      player.queue.splice(args[0] - 1, 1);
      player.queue.splice(0, 0, song);
      return embed(`Moved **${song.title}** to the beginning of the queue.`, message.channel);
    }
    else if (args[1]) {
      if (args[1] == 0) return message.channel.send(`<a:error:885663139285327913> | You can't move a song that is already playing`);

      if ((args[1] > player.queue.length) || !player.queue[args[1]]) return embed('<a:error:885663139285327913> | Song not found.', message.channel)


      const song = player.queue[args[0] - 1];
      player.queue.splice(args[0] - 1, 1);
      player.queue.splice(args[1] - 1, 0, song);
      return embed(`<a:dis_t:885665406143066133> | Moved the song ${args[1]}.`, message.channel);
    }

  }
}