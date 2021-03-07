const profileModel = require("../../models/profileSchema")
<<<<<<< HEAD
const { MessageEmbed } = require('discord.js')
const utilities = require('../../config.json')
=======
const embed = require("../../models/embed");
>>>>>>> 934ac7b38228a7aaa916a16e79b510b0ef01c3d2

module.exports = {
    name: 'add',
    permissions: ['ADMINISTRATOR'],
    expectedArgs: "**<amount> <@username>**",
    category: "Admin",
    description: 'Add coins to an user',
    callback: async ({message, args}) => {
<<<<<<< HEAD
        let embed = new MessageEmbed()
        .setTitle("Add coins")
        .setTimestamp()
        .setColor(utilities.colors.default)
        .setFooter('🍆 Girth Gang 🍆');

        if (message.mentions.users.first() === undefined) {
            embed.setDescription("This user doesn't exist")
                .setColor(utilities.colors.red)
=======
        embed.setTitle("Add coins")

        if (message.mentions.users.first() === undefined) {
            embed.setDescription("This user doesn't exist")
                .setColor(0xff0000)
>>>>>>> 934ac7b38228a7aaa916a16e79b510b0ef01c3d2
            return message.channel.send(embed)
        }
        if(args[0] <= 0) {
                embed.setDescription("Amount value must be higher than 0")
            return message.channel.send(embed)
        } else {
            try {
                await profileModel.findOneAndUpdate({
                    userID: message.mentions.users.first().id 
                }, {
                    $inc: {
                        coins: args[0]
                    }
                })
            } catch(err) {
                embed.setDescription("Something went wrong, check logs")
<<<<<<< HEAD
                .setColor(utilities.colors.red)
                return message.channel.send(embed)
            }

            embed.setDescription(`Admin has added ${args[0]} GirthCash to ${message.mentions.users.first()}`)
                .setColor(utilities.colors.green)
            return message.channel.send(embed)
        }
    }
}
=======
                .setColor(0xff0000)
                return message.channel.send(embed)
            }
            
            embed.setDescription(`Admin has added ${args[0]} GirthCash to ${message.mentions.users.first()}`)
            return message.channel.send(embed)
        }
    }
}
>>>>>>> 934ac7b38228a7aaa916a16e79b510b0ef01c3d2
