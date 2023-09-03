const { MessageEmbed } = require("discord.js");
const discord = require("discord.js");
module.exports = {

    name: "ping",

    aliases: ["pi"],

    run:async (client, message, args) => {

        const latency = Date.now() - message.createdTimestamp;

        message.channel.send(new MessageEmbed().setColor(client.colors.main).setDescription(`Latency 1: ${client.ws.ping}ms/Latency 2: ${latency}ms`));                     

    }

};