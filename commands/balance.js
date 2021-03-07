const profileModel = require("../models/profileSchema")
<<<<<<< HEAD
const { MessageEmbed } = require('discord.js')
const utilities = require("../config.json")
=======
const embed = require("../models/embed");
    embed.setTitle("Balance")
>>>>>>> 934ac7b38228a7aaa916a16e79b510b0ef01c3d2

module.exports = {
    aliases: ['bal', 'b'],
    category: 'Girth Cash',
    maxArgs: 0,
    description: 'Check user balance',
    callback: async ({message}) => {
<<<<<<< HEAD
        let embed = new MessageEmbed()
        .setTitle("Balance")
        .setTimestamp()
        .setColor(utilities.colors.default)
        .setFooter('🍆 Girth Gang 🍆');

=======
>>>>>>> 934ac7b38228a7aaa916a16e79b510b0ef01c3d2
        let user = await profileModel.findOne({ userID: message.author.id })

        if(user) {
            embed.setDescription(`${message.author}, your GirtCash balance is: ${user.coins} 💸`)
            message.channel.send(embed)
        }
    }
}