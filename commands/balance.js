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

        try {
            await profileModel.findOne({
                userID: message.author.id,
            })
        } catch {
            embed.setTitle("New member detected")
                .setDescription(`${message.author}, looks like you're a new member\n\n**Inserting your information in the database...**`)
                .setColor(utilities.colors.admin)
            return message.channel.send(embed)
                .then(msg => {
                setTimeout(() => {
                    embed.addFields({name: "Data Inserted", value: '✅'})
                    msg.edit(embed)
                }, 2000);
            })
        }
        
        let {userID: member, coins} = await profileModel.findOne({ userID: message.author.id })

        if(member) {
            embed.setDescription(`${message.author}, your GirtCash balance is: ${coins} 💸`)
            message.channel.send(embed)
        }
    }
}