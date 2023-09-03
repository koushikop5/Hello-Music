  


const { MessageEmbed } = require("discord.js");
//const autoJoin = require('../../schemas/autoJoin');
//const handler = require('../../handlers/message');

module.exports = {
    name: "autoplay",
    aliases: ["ap"],
	category: "MUSIC",
    description: "Toggle music autoplay",
   
    usage: "ap",
   premium: true,
    vcOnly: true,
    sameVc: true,
   run: async (client, message, args) => {

        const player = message.client.manager.get(message.guild.id);
        //const player = client.player.players.get(message.guild.id);

        if (!player.queue.current) {
            let thing = new MessageEmbed()
                .setColor(client.colors.error)
                .setDescription(`<a:error:885663139285327913> | Currently not playing anything.`);
            return message.channel.send(thing);
        }

        const autoplay = player.get("autoplay");

        //const emojireplay = message.client.emoji.autoplay;

        if (autoplay === false) {
            const identifier = player.queue.current.identifier;
            player.set("autoplay", true);
            player.set("requester", message.author);
            player.set("identifier", identifier);
            const search = `https://www.youtube.com/watch?v=${identifier}&list=RD${identifier}`;
            res = await player.search(search, message.author);
            player.queue.add(res.tracks[1]);
            let thing = new MessageEmbed()
                .setColor(client.colors.main)
                
                .setDescription(`<a:dis_t:885665406143066133> | Autoplay is now \`enabled\` in this server.`)
           return message.channel.send(thing);
        } else {
            player.set("autoplay", false);
            player.queue.clear();
            let thing = new MessageEmbed()
                .setColor(client.colors.main)
                
                .setDescription(`<a:dis_t:885665406143066133> | Autoplay is now \`disabled\` in this server.`)
               
            return message.channel.send(thing);
        }

    }
};