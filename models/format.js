const { MessageEmbed } = require("discord.js");
module.exports = {
getMember: function (message, toFind = "") {
    try {
      toFind = toFind.toLowerCase();
      let target = message.guild.members.get(toFind);
      if (!target && message.mentions.members) target = message.mentions.members.first();
      if (!target && toFind) {
        target = message.guild.members.find((member) => {
          return member.displayName.toLowerCase().includes(toFind) || member.user.tag.toLowerCase().includes(toFind);
        });
      }
      if (!target) target = message.member;
      return target;
    } catch (e) {
      console.log(String(e.stack).bgRed)
    }
  },
  shuffle: function (a) {
    try {
      var j, x, i;
      for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
      }
      return a;
    } catch (e) {
      console.log(String(e.stack).bgRed)
    }
  },
  formatDate: function (date) {
    try {
      return new Intl.DateTimeFormat("en-US").format(date);
    } catch (e) {
      console.log(String(e.stack).bgRed)
    }
  },
  duration: function (ms) {
    const sec = Math.floor((ms / 1000) % 60).toString();
    const min = Math.floor((ms / (60 * 1000)) % 60).toString();
    const hrs = Math.floor((ms / (60 * 60 * 1000)) % 60).toString();
    const days = Math.floor((ms / (24 * 60 * 60 * 1000)) % 60).toString();
    return `\`${days} Days\`, \`${hrs} Hours\`, \`${min} Minutes\`, \`${sec} Seconds\``;
  },
  

  promptMessage: async function (message, author, time, validReactions) {
    try {
      time *= 1000;
      for (const reaction of validReactions) await message.react(reaction);
      const filter = (reaction, user) => validReactions.includes(reaction.emoji.name) && user.id === author.id;
      return message.awaitReactions(filter, {
        max: 1,
        time: time
      }).then((collected) => collected.first() && collected.first().emoji.name);
    } catch (e) {
      console.log(String(e.stack).bgRed)
    }
  },
  delay: function (delayInms) {
    try {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(2);
        }, delayInms);
      });
    } catch (e) {
      console.log(String(e.stack).bgRed)
    }
  },
  //randomnumber between 0 and x
  getRandomInt: function (max) {
    try {
      return Math.floor(Math.random() * Math.floor(max));
    } catch (e) {
      console.log(String(e.stack).bgRed)
    }
  },
  //random number between y and x
  getRandomNum: function (min, max) {
    try {
      return Math.floor(Math.random() * Math.floor((max - min) + min));
    } catch (e) {
      console.log(String(e.stack).bgRed)
    }
  },
  createBar: function (player) {
    let size = 30;
    let line = "─";
    let slider = "🔵";
    
    if (!player.queue.current) return `${slider}${line.repeat(size - 1)}]`;
    let current = player.queue.current.duration !== 0 ? player.position : player.queue.current.duration;
    let total = player.queue.current.duration;
    let bar = current > total ? [line.repeat(size / 2 * 2), (current / total) * 100] : [line.repeat(Math.round(size / 2 * (current / total))).replace(/.$/, slider) + line.repeat(size - Math.round(size * (current / total)) + 1), current / total];
   
    if (!String(bar).includes(slider)) return `${slider}${line.repeat(size - 1)}`;
    return `${bar[0]}`;

  },
  format: function (millis) {
    try {
        // Pad to 2 or 3 digits, default is 2
  function pad(n, z) {
    z = z || 2;
    return ('00' + n).slice(-z);
  }
      var ms = millis% 1000;
      millis = (millis - ms) / 1000;
      var s = millis % 60;
      millis = (millis - s) / 60;
      var m = millis % 60;
      var h = (millis - m) / 60;
      if (h < 1) return pad(m) + ':' + pad(s);
      return pad(h) + ':' + pad(m) + ':' + pad(s);
    } catch (e) {
      console.log(String(e.stack).bgRed)
    }
  }
}