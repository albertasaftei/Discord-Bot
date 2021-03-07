const profileModel = require("../models/profileSchema")
const { MessageEmbed, Message } = require('discord.js')

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

        let embed = new MessageEmbed()
        .setTimestamp()
        .setFooter('🍆 Girth Gang 🍆');

        if (!args.length || isNaN(args[0]) || isNaN(args[1])) {
            embed
            .setTitle('Invalid Arguments')
            .setDescription(` ${message.author}, something went wrong, try **!roll/!r <dice number> <balance>**`)
            .setColor(0xff0000)

            return message.reply(embed)
        }

        let number = Math.floor(Math.random() * 6) + 1;

        let author = await profileModel.findOne({
            userID: message.author.id,
        })
        let balance = author.coins

        if (args[1] <= balance) {
            if (args[0] == number) {
                try {
                    await profileModel.findOneAndUpdate({
                        userID: message.author.id
                    }, {
                        $inc: {
                            coins: args[1]*2
                        }
                    })
                    
                } catch (err) {
                    message.channel.send("Something went wrong.")
                }
            } else {
                await profileModel.findOneAndUpdate({
                    userID: message.author.id
                }, {
                    $inc: {
                        coins: -args[1]
                    }
                })
                embed.setTitle('Roll the Dice')
                    .addFields(
                        { name: '🎲 Bot 🎲', value: `${number}`},
                        { name: 'Your choice', value: `${args[0]}`},
                    )
                    .setColor("#e8e83f")
                return message.reply(embed)
            }
        } else {
            return message.reply("You don't have enough Girth Cash")
        }

        embed.setTitle("Roll the Dice")
            .setDescription(`${message.author}, congratulations, you won **${args[1]*2}** Girth Cash 💸`)
            .setColor("#2deb36")

        return message.reply(embed)
    },
    error: ({ error, message }) => {
        if (error === 'INVALID ARGUMENTS') {
        const embed = new MessageEmbed()
        .setTitle('Invalid Arguments')
        .setDescription(`${message.author}, something went wrong, try **!roll/!r <dice number> <balance>**`)
        .setColor(0xff0000)

        message.reply(embed)
        }
    }
}