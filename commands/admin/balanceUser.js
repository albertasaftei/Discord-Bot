const profileModel = require("../../models/profileSchema")
<<<<<<< HEAD
const { MessageEmbed } = require('discord.js')
const utilities = require("../../config.json")
=======
const embed = require("../../models/embed");
>>>>>>> 934ac7b38228a7aaa916a16e79b510b0ef01c3d2

module.exports = {
    name: 'badmin',
    permissions: ['ADMINISTRATOR'],
    expectedArgs: "**<@username>**",
    category: "Admin",
    description: 'See tagged user balance',
    callback: async ({message}) => {
<<<<<<< HEAD
        let embed = new MessageEmbed()
        .setTitle("Balance Admin")
        .setColor(utilities.colors.default)
        .setTimestamp()
        .setFooter('🍆 Girth Gang 🍆');

=======
        embed.setTitle("User Balance")
>>>>>>> 934ac7b38228a7aaa916a16e79b510b0ef01c3d2
        try {
            let user = await profileModel.findOne({ userID: message.mentions.users.first().id })
    
            if(user) {
                embed.setDescription(`${message.mentions.users.first()} has **${user.coins}** GirthCash 💸`)
                message.channel.send(embed)
            } else {
                embed.setDescription("This user doesn't exist")
                message.channel.send(embed)
            }
        } catch(err) {
            embed.setDescription("Something went wrong, check logs.")
                .setColor(utilities.colors.red)
            return message.channel.send(embed)
        }
    }
}