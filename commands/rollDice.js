const profileModel = require("../models/profileSchema")
<<<<<<< HEAD
const { MessageEmbed } = require('discord.js')
const utilities = require("../config.json")
=======
const embed = require("../models/embed");
>>>>>>> 934ac7b38228a7aaa916a16e79b510b0ef01c3d2

module.exports = {
    name: 'roll',
    aliases: ['r'],
    minArgs: 2,
    maxArgs: 2,
    expectedArgs: "**<dice number> <bet amount>**",
    errorMsg: 'Something went wrong, try !roll/!r <dice number> <balance>',
    category: 'Girth Gang',
    description: 'Roll the dice, if you roll the number you chose, you win some coins',
    callback: async ({message, args}) => {
<<<<<<< HEAD
        let embed = new MessageEmbed()
        .setTitle("🎲 Roll the dice 🎲")
        .setTimestamp()
        .setColor(utilities.colors.default)
        .setFooter('🍆 Girth Gang 🍆');
        
        if (args.length == 1 || isNaN(args[0]) || isNaN(args[1])) {
=======
        embed.setTitle("Roll the dice")
        if (!args.length || isNaN(args[0]) || isNaN(args[1])) {
>>>>>>> 934ac7b38228a7aaa916a16e79b510b0ef01c3d2
            embed
            .setTitle('Invalid Arguments')
            .setDescription(` ${message.author}, something went wrong, try **!roll/!r <dice number> <balance>**`)
            .setColor(utilities.colors.red)

            return message.reply(embed)
        }

        let number = Math.floor(Math.random() * 6) + 1;

        let author = await profileModel.findOne({
            userID: message.author.id,
        })
        let balance = author.coins

        if (args[1] <= balance) {
            if (args[0] === number) {
                try {
                    await profileModel.findOneAndUpdate({
                        userID: message.author.id
                    }, {
                        $inc: {
                            coins: args[1]*2
                        }
                    })
                    
                } catch (err) {
                    message.channel.send("Something went wrong, check logs.")
                }

                embed.setDescription(`${message.author}, congratulations, you won **${args[1]*2}** Girth Cash 💸`)
                    .setColor(utilities.colors.green)
                return message.channel.send(embed)
            } else {
                await profileModel.findOneAndUpdate({
                    userID: message.author.id
                }, {
                    $inc: {
                        coins: -args[1]
                    }
                })
                embed.addFields(
                        { name: '🎲 Bot 🎲', value: `${number}`},
                        { name: 'Your choice', value: `${args[0]}`},
                    )
                    .setColor(utilities.colors.default)
                return message.reply(embed)
            }
        } else {
            return message.reply("You don't have enough Girth Cash")
        }
<<<<<<< HEAD
=======

        embed.setDescription(`${message.author}, congratulations, you won **${args[1]*2}** Girth Cash 💸`)
            .setColor("#2deb36")

        return message.reply(embed)
>>>>>>> 934ac7b38228a7aaa916a16e79b510b0ef01c3d2
    },
    error: ({ error, message }) => {
        if (error === 'INVALID ARGUMENTS') {
            embed.setTitle('Invalid Arguments')
                .setDescription(`${message.author}, something went wrong, try **!roll/!r <dice number> <balance>**`)
<<<<<<< HEAD
                .setColor(utilities.colors.red)
=======
                .setColor(0xff0000)
>>>>>>> 934ac7b38228a7aaa916a16e79b510b0ef01c3d2

        message.reply(embed)
        }
    }
}