const { MessageEmbed: mEmbed } = require('discord.js');

class message {
    noArgument(client, name, needed) {
        if (!needed || needed.length == 0) throw new RangeError('Needed arguments must be in an Array');

        const embed = new mEmbed()
            
            .setColor(client.colors.main)
            
            .setDescription('**Usage:**\n\`' + needed.join('\n') + '`')
        return embed;
    }

    normalEmbed(content) {
        if (!content) throw new RangeError('Content must be a valid string/number')
        const embed = new mEmbed()
            .setColor("#FFE800")
            .setDescription(content)
        return embed;
    }
}

module.exports = message;