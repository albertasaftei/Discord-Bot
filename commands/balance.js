const profileModel = require("../models/profileSchema")
const { MessageEmbed } = require('discord.js')
const utilities = require("../config.json")

module.exports = {
    aliases: ['bal', 'b'],
    category: 'Girth Cash',
    maxArgs: 0,
    description: 'Check user balance',
    callback: async ({message}) => {
        let embed = new MessageEmbed()
        .setTitle("Balance")
        .setTimestamp()
        .setColor(utilities.colors.default)
        .setFooter('🍆 Girth Gang 🍆');

        let user = await profileModel.findOne({ userID: message.author.id })

        if(user) {
            embed.setDescription(`${message.author}, your GirtCash balance is: ${user.coins} 💸`)
            message.channel.send(embed)
        }
    }
}