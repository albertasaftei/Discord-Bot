const profileModel = require("../models/profileSchema")
const { MessageEmbed } = require('discord.js')
const utilities = require("../config.json")

module.exports = {
    name: 'give',
    aliases: ['g', 'taxaprotectie'],
    minArgs: 1,
    maxArgs: 2,
    expectedArgs: "**<amount> <@username>**",
    category: 'Girth Cash',
    description: 'Give GirthCash to another user',
    callback: async ({message, args, client}) => {
        let embed = new MessageEmbed()
        .setTitle("Give coins")
        .setTimestamp()
        .setColor(utilities.colors.default)
        .setFooter('🍆 Girth Gang 🍆');
        //error handlers
        if (message.mentions.has(client.user.id)) {
            embed.setDescription(`${message.author}, you can't give cash to a Bot`)
                .setTitle("Invalid Arguments")
                .setColor(utilities.colors.red)
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

        if (receiver === null) {
            embed.setDescription("This username doesn't exist in the database")
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
                .setColor(utilities.colors.green)
            return message.channel.send(embed)

        } else {
            return message.reply("You don't have enough money")
        }
        
    },
    error: ({ error, message }) => {
        if (error === 'INVALID ARGUMENTS') {
        embed.setTitle('Invalid Arguments')
            .setDescription(`${message.author}, something went wrong, try **!give/!g <amount> <@username>**`)
            .setColor(utilities.colors.red)

        message.reply(embed)
        }
    }
}