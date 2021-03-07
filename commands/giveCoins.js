const profileModel = require("../models/profileSchema")
<<<<<<< HEAD
const { MessageEmbed } = require('discord.js')
const utilities = require("../config.json")
=======
const embed = require("../models/embed");
>>>>>>> 934ac7b38228a7aaa916a16e79b510b0ef01c3d2

module.exports = {
    name: 'give',
    aliases: ['g', 'taxaprotectie'],
    minArgs: 1,
    maxArgs: 2,
    expectedArgs: "**<amount> <@username>**",
    category: 'Girth Cash',
    description: 'Give GirthCash to another user',
    callback: async ({message, args, client}) => {
<<<<<<< HEAD
        let embed = new MessageEmbed()
        .setTitle("Give coins")
        .setTimestamp()
        .setColor(utilities.colors.default)
        .setFooter('🍆 Girth Gang 🍆');
=======
        embed.setTitle("Give coins")
>>>>>>> 934ac7b38228a7aaa916a16e79b510b0ef01c3d2
        //error handlers
        if (message.mentions.has(client.user.id)) {
            embed.setDescription(`${message.author}, you can't give cash to a Bot`)
                .setTitle("Invalid Arguments")
<<<<<<< HEAD
                .setColor(utilities.colors.red)
=======
                .setColor(0xff0000)
>>>>>>> 934ac7b38228a7aaa916a16e79b510b0ef01c3d2
            return message.reply(embed)
        } if (message.mentions.has(message.author.id)) {
            embed.setDescription(`${message.author}, you can't give cash to yourself`)
            return message.reply(embed)
        } if (!args.length) {
            embed.setDescription(`${message.author}, try **!give/g <number> <@user>**`)
            return message.reply(embed)
        } if (isNaN(args[0])) {
            return message.reply(embed)
        } if (args[0] < 0) {
            embed.setDescription(`${message.author}, insert a number higher than 0`)
            return message.reply(embed)
        }

        let author = await profileModel.findOne({
            userID: message.author.id,
        })
        let balance = author.coins

        let receiver = await profileModel.findOne({
            userID:message.mentions.users.first().id
        })

<<<<<<< HEAD
        if (receiver === null) {
            embed.setDescription("This username doesn't exist in the database")
=======
        console.log(receiver)

        if (receiver === null) {
            embed.setDescription("This username doesn't exist in the database")
                .setColor(0xff0000)
>>>>>>> 934ac7b38228a7aaa916a16e79b510b0ef01c3d2
            return message.channel.send(embed)
        }

        //if the amount inserted is minor than the actual balance, continue
        //if not, return error
        if (args[0] <= balance) {
            try {
                await profileModel.findOneAndUpdate({
                    userID: message.mentions.users.first().id
                }, {
                    $inc: {
                        coins: args[0]
                    }
                })
        
                await profileModel.findOneAndUpdate({
                    userID: message.author.id
                }, {
                    $inc: {
                        coins: -args[0]
                    }
                })
            } catch(err) {
                return message.channel.send(embed)
            }
            
            embed.setDescription(`${message.author.toString()} has given **${message.mentions.users.first().toString()}** ${args[0]} GirthCash`)
<<<<<<< HEAD
                .setColor(utilities.colors.green)
=======
>>>>>>> 934ac7b38228a7aaa916a16e79b510b0ef01c3d2
            return message.channel.send(embed)

        } else {
            return message.reply("You don't have enough money")
        }
        
    },
    error: ({ error, message }) => {
        if (error === 'INVALID ARGUMENTS') {
        embed.setTitle('Invalid Arguments')
            .setDescription(`${message.author}, something went wrong, try **!give/!g <amount> <@username>**`)
<<<<<<< HEAD
            .setColor(utilities.colors.red)
=======
            .setColor(0xff0000)
>>>>>>> 934ac7b38228a7aaa916a16e79b510b0ef01c3d2

        message.reply(embed)
        }
    }
}