const profileModel = require("../../models/profileSchema")
const { MessageEmbed } = require('discord.js')
const utilities = require('../../config.json');

module.exports = {
    name: "level",
    aliases: ['lv', 'lvl'],
    description: "Information about your level status",
    maxArgs: 0,
    category: 'Level System',
    callback: async ({message}) => {
        let embed = new MessageEmbed()
        .setTitle("Level info")
        .setTimestamp()
        .setColor(utilities.colors.default)
        .setFooter('🍆 Girth Gang 🍆');

        const result = await profileModel.findOne({
            userID: message.author.id
        })

        const {xp, level} = result
        const percentage = xp*100/(level*100)
        const percentageN = percentage.toFixed(2)
        

        embed.setDescription(`Level information for ${message.author.toString()}`)
            .addFields(
                { name: 'Level', value: `${level}`, inline: true},
                { name: 'EXP', value: `${xp}`, inline: true},
                { name: 'Progress', value: `${percentageN}%`, inline: true}
            )
        return message.channel.send(embed)
    },
    error: ({ error, message }) => {
        let embed = new MessageEmbed()
            .setTimestamp()
            .setColor(utilities.colors.default)
            .setFooter('🍆 Girth Gang 🍆');
            
        if (error === 'INVALID ARGUMENTS') {
        embed.setTitle('Invalid Arguments')
            .setDescription(`${message.author}, try **!level**`)
            .setColor(utilities.colors.red)

        message.reply(embed)
        }
    }
}