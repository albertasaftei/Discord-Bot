const profileModel = require("../models/profileSchema")
const { MessageEmbed } = require('discord.js')

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
        .setTitle("Invalid arguments")
        .setTimestamp()
        .setColor(0xff0000)
        .setFooter('🍆 Girth Gang 🍆');

        if (message.mentions.has(client.user.id)) {
            embed.setDescription(`${message.author}, you can't give cash to a Bot`)
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
            
            return message.channel.send(`${message.author.toString()} has given **${message.mentions.users.first().toString()}** ${args[0]} GirthCash`)

        } else {
            return message.reply("You don't have enough money")
        }
        
    },
    error: ({ error, message }) => {
        if (error === 'INVALID ARGUMENTS') {
        let embed = new MessageEmbed()
        .setTitle('Invalid Arguments')
        .setDescription(`${message.author}, something went wrong, try **!give/!g <amount> <@username>**`)
        .setColor(0xff0000)

        message.reply(embed)
        }
    }
}