const profileModel = require("../../models/profileSchema")
const { MessageEmbed } = require('discord.js')
const utilities = require("../../config.json")

module.exports = {
    name: 'badmin',
    permissions: ['ADMINISTRATOR'],
    expectedArgs: "**<@username>**",
    category: "Admin",
    description: "See tagged user's balance",
    callback: async ({message}) => {
        let embed = new MessageEmbed()
        .setTitle("Balance Admin")
        .setColor(utilities.colors.admin)
        .setTimestamp()
        .setFooter('🍆 Girth Gang 🍆');

        try {
            let user = await profileModel.findOne({ userID: message.mentions.users.first().id })
    
            if(user) {
                embed.setDescription(`${message.mentions.users.first()} has **${user.coins}** GirthCash 💸`)
                message.channel.send(embed)
            } else {
                embed.setDescription("This user doesn't exist in the database")
                message.channel.send(embed)
            }
        } catch(err) {
            embed.setDescription("Something went wrong, check logs.")
                .setColor(utilities.colors.red)
            return message.channel.send(embed)
        }
    }
}