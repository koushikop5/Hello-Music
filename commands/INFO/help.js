const { MessageEmbed } = require("discord.js");
const { MessageButton } = require("discord-buttons");
module.exports = {
  name: "help",
  aliases: ["h"],
  run: async (client, message, args) => {
    const checkPrefix = await client.db.get(`prefix_${message.guild.id}`)
    const prefix = await checkPrefix ? checkPrefix : client.config.default_prefix

    let invbutton = new MessageButton().setStyle("url").setLabel("Invite Me").setURL(`https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=66452289&scope=bot`);

    let invbutton2 = new MessageButton().setStyle("url").setLabel("Support Server").setURL(`https://dsc.gg/Koushikgaming`);
    let invbutton3 = new MessageButton().setStyle("url").setLabel("Vote Me").setURL(`https://top.gg/bot/911504454795268096/vote`);
    let invbutton4 = new
      MessageButton().setStyle("url").setLabel("Premium").setURL("https://dsc.gg/koushikgaming")

    const embed = new MessageEmbed()
      .setColor(client.colors.main)
      .setThumbnail(client.user.displayAvatarURL())
      .setAuthor(`${client.user.username} Command's`)
      .setDescription(`You can play music by joining a voice channel and typing **${prefix}play**. The command accepts song names, video links, playlist links & Spotify links.\nIf You Feel Any bugs Than Join [Support Server](https://discord.gg/USCCng5trg) or [Invite Me](https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=66452289&scope=bot) `)
      .addField("Music[17] -", "`join`, `leave`, `clear`, `loop`, `move`, `nowplaying`, `pause`, `play`, `previous`, `queue`, `remove`, `resume`, `search`, `skip`, `seek`, `stop`, `volume`")
      .addField("Filters[13] -", "`bass`, `bassboost`, `deepbass`, `nightcore`, `pitch`, `pop`, `reset`, `soft`, `speed`, `vaporwave`")
      .addField("Config[3] -", "`prefix`, `24/7`")
      .addField("Premium[2] -", "`premium`, `validity`, `reedem`")
      .addField("Utility[5] -", "`help`, `ping`, `invite`, `uptime`, `stats`")
      .setTimestamp();

    message.channel.send({ embed: embed, button: [invbutton, invbutton2, invbutton3, invbutton4] });
  },
};
