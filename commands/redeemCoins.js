const profileModel = require("../models/profileSchema")
const { MessageEmbed } = require('discord.js')
const utilities = require("../config.json");

module.exports = {
    name: 'reward',
    maxArgs: 0,
    cooldown: '24h',
    category: 'Girth Cash',
    description: 'Redeem 10k GirthCash every day',
    callback: async ({message}) => {
        let embed = new MessageEmbed()
            .setTitle("Daily reward")
            .setTimestamp()
            .setColor(utilities.colors.admin)
            .setFooter('🍆 Girth Gang 🍆');

        let {userID: member, coins} = await profileModel.findOne({
            userID: message.author.id
        })

        if (message.author.bot) return

        if (member) { // Check if user exists in the database. If true, add the reward to their balance 
            await profileModel.findOneAndUpdate({
                userID: message.author.id
            }, {
                $inc: {
                    coins: 10000
                }
            })
            
            embed.setDescription("You received **10.000** Girthcash 💸")
                .addField("Your current balance", `**${coins+10000}** GirthCash`)
            return message.channel.send(embed)
        } else {
            embed.setDescription("Looks like you are not inserted in the database")
                .setColor(utilities.colors.red)
            return message.channel.send(embed)
        }
    },
    error: ({error, message, info}) => {
        let embed = new MessageEmbed()
            .setTimestamp()
            .setColor(utilities.colors.admin)
            .setFooter('🍆 Girth Gang 🍆');

        if (error === 'COOLDOWN') {
            embed.setTitle('Cooldown Error')
                .setDescription(`You must wait **${info.timeLeft}** to redeem another daily reward`)
                .setColor(utilities.colors.red)
            
            return message.channel.send(embed)
        }

        if (error === "INVALID ARGUMENTS") {
            embed.setTitle("Invalid Arguments")
                .setDescription("This command doesn't require any arguments")
                .setColor(utilities.colors.red)
            
            return message.channel.send(embed)
        }
    }
}