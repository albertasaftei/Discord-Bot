const profileModel = require("../../models/profileSchema")
const { MessageEmbed } = require('discord.js')
const utilities = require("../../config.json")

module.exports = {
    name: "remove",
    permissions: ["ADMINISTRATOR"],
    expectedArgs: "**<balance> <@username>**",
    category: "Admin",
    description: "Remove GirthCash from an user",
    callback: async ({message, args}) => {
        let embed = new MessageEmbed()
        .setTitle("Remove coins")
        .setTimestamp()
        .setColor(utilities.colors.admin)
        .setFooter('🍆 Girth Gang 🍆');
        
        const mentionedUser = await profileModel.findOne({
            userID: message.mentions.users.first().id,
        })

        const balance = mentionedUser.coins

        if (balance == 0) {
            embed.setDescription(`${message.mentions.users.first()}'s balance is **0**`)
                .setColor(utilities.colors.red)
            return message.channel.send(embed)
        }

        if (message.mentions.users.first() === undefined) {
            embed.setDescription("This user doesn't exist")
                .setColor(utilities.colors.red)
            return message.channel.send(embed)
        }

        if (args[0] === "all" && message.mentions.users.first()) {
            try {
                
                await profileModel.findOneAndUpdate({
                    userID: message.mentions.users.first().id 
                }, {
                    $inc: {
                        coins: -balance
                    }
                })
            } catch(err) {
                console.log(err)
                embed.setDescription("Something went wrong, check logs")
                    .setColor(utilities.colors.red)
                return message.channel.send(embed)
            }

            embed.setDescription(`Admin has removed all ${message.mentions.users.first()}'s GirtCash`)
                .setColor(utilities.colors.admin)
            return message.channel.send(embed)
        }

        if(args[0] > mentionedUser.coins) {
            embed.setDescription(`${message.mentions.users.first()}'s balance is lower than **${args[0]}**`)
                .setColor(utilities.colors.red)
            return message.channel.send(embed)
        }
        
        if(args[0] <= 0) {
                embed.setDescription("Amount value must be higher than 0")
                    .setColor(utilities.colors.red)
            return message.channel.send(embed)
        } else {
            try {
                await profileModel.findOneAndUpdate({
                    userID: message.mentions.users.first().id 
                }, {
                    $inc: {
                        coins: -args[0]
                    }
                })
            } catch(err) {
                embed.setDescription("Something went wrong, check logs")
                    .setColor(utilities.colors.red)
                return message.channel.send(embed)
            }

            embed.setDescription(`Admin has removed ${args[0]} GirthCash from ${message.mentions.users.first()}'s balance`)
                .setColor(utilities.colors.green)
            return message.channel.send(embed)
        }
    }
}