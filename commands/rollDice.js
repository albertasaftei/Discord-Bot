const profileModel = require("../models/profileSchema")
const { MessageEmbed } = require('discord.js')
const utilities = require("../config.json")

module.exports = {
    name: 'roll',
    aliases: ['r'],
    minArgs: 2,
    maxArgs: 2,
    expectedArgs: "**<dice number> <bet amount>**",
    errorMsg: 'Something went wrong, try !roll/!r <dice number> <balance>',
    category: 'Girth Gang',
    description: 'Roll the dice, if you win, you double the bet',
    callback: async ({message, args}) => {
        let embed = new MessageEmbed()
        .setTitle("🎲 Roll the dice 🎲")
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

        let gambled = args[1]
        if (!args.length || isNaN(args[0]) || isNaN(gambled)) {
            embed
            .setTitle('Invalid Arguments')
            .setDescription(` ${message.author}, something went wrong, try **!roll/!r <dice number> <balance>**`)
            .setColor(utilities.colors.red)

            return message.channel.send(embed)
        }

        let number = Math.floor(Math.random() * 6) + 1;

        let {coins} = await profileModel.findOne({
            userID: message.author.id,
        })
        if(args[0] > 6) {
            embed.setDescription("Insert a number between 1 and 6!")
                .setColor(utilities.colors.red)
            return message.channel.send(embed)
        }
        if (gambled <= coins) {
            if (args[0] === number) {
                try {
                    await profileModel.findOneAndUpdate({
                        userID: message.author.id
                    }, {
                        $inc: {
                            coins: gambled*2
                        }
                    })
                    
                } catch (err) {
                    message.channel.send("Something went wrong, check logs.")
                }
                let {coins} = await profileModel.findOne({
                    userID: message.author.id,
                })
                embed.setDescription(`${message.author}, congratulations, you won **${gambled*2}** Girth Cash 💸`)
                    .addField("Your current balance", `**${coins}** GirthCash`)
                    .setColor(utilities.colors.green)
                return message.channel.send(embed)
            } else {
                await profileModel.findOneAndUpdate({
                    userID: message.author.id
                }, {
                    $inc: {
                        coins: -gambled
                    }
                })
                embed.addFields(
                        { name: 'Bot', value: `${number}`},
                        { name: 'Your choice', value: `${args[0]}`},
                    )
                    .addField("Your current balance", `**${coins-gambled}** GirthCash`)
                    .setColor(utilities.colors.default)
                return message.channel.send(embed)
            }
        } else {
            let {coins} = await profileModel.findOneAndUpdate({
                userID: message.author.id
            })
            embed.setDescription(`${message.author}, you don't have enough Girth Cash`)
                .addField("Your current balance", `**${coins}** GirthCash`)
                .setColor(utilities.colors.red)
            return message.reply("You don't have enough Girth Cash")
        }
    },
    error: ({ error, message }) => {
        if (error === 'INVALID ARGUMENTS') {
        let embed = new MessageEmbed()
            .setTitle("🎲 Roll the dice 🎲")
            .setTimestamp()
            .setColor(utilities.colors.default)
            .setFooter('🍆 Girth Gang 🍆');

            embed.setTitle('Invalid Arguments')
                .setDescription(`${message.author}, something went wrong, try **!roll/!r <dice number> <balance>**`)
                .setColor(utilities.colors.red)

        message.reply(embed)
        }
    }
}