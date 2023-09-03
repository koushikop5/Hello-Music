const { MessageButton } = require("discord-buttons");
const { MessageEmbed } = require("discord.js");
module.exports = {
  name: "invite",
  aliases: ["inv"],
  run: async (client, message, args) => {
   /* let invbutton = new MessageButton().setStyle("url").setLabel("Disney").setURL(`https://discord.com/api/oauth2/authorize?client_id=885950249473024000&permissions=36768832&scope=bot`);

    let invbutton2 = new MessageButton().setStyle("url").setLabel("Disney 2").setURL("https://discord.com/api/oauth2/authorize?client_id=885951753315565648&permissions=36768832&scope=bot")

    let invbutton3 = new MessageButton().setStyle("url").setLabel("Disney 3").setURL("https://discord.com/api/oauth2/authorize?client_id=885952326559465472&permissions=36768832&scope=bot")
    
    let invbutton4 = new MessageButton().setStyle("url").setLabel("Disney Cute").setURL("https://discord.com/api/oauth2/authorize?client_id=886212016392536075&permissions=3459136&scope=bot")*/

    const invitemsg = new MessageEmbed().setColor(client.colors.main).setAuthor(`${client.user.tag}`, client.user.displayAvatarURL()) .setDescription("Went to invite the bot [Click here](https://dsc.gg/goofy-bot)\nIf you need any help join our server [Click here](https://discord.gg/USCCng5trg)");

    message.channel.send(invitemsg)//({ embed: invitemsg, button: [invbutton, invbutton2, invbutton3, invbutton4] });
  },
};
