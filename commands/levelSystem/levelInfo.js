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
        .setTimestamp()
        .setColor(utilities.colors.default)
        .setFooter('🍆 Girth Gang 🍆');

        try {
            await profileModel.findOne({
                userID: message.author.id,
            })
        } catch {
            embed.setTitle("Catch Error")
                .setDescription('Database control error')
                .setColor(utilities.colors.red)
            return message.channel.send(embed)
        }
        
        const {xp, level} = await profileModel.findOne({
            userID: message.author.id
        })
        const percentage = xp*100/(level*100)
        const percentageN = percentage.toFixed(2)
        

        embed.setAuthor(`Level information for ${message.author.username}`, message.author.avatarURL())
            .setDescription('\u200B')
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