const profileModel = require("../models/profileSchema")
const { MessageEmbed } = require('discord.js')
const utilities = require("../config.json")

module.exports = {
    name: "gamble",
    minArgs: 1,
    maxArgs: 1,
    category: "Girth Gang",
    description: "Gamble a certain amount of money. If you win, your gambled amount will be doubled.",
    expectedArgs: "<coins amount>",
    callback: async ({message, args}) => {
        let embed = new MessageEmbed()
            .setTitle("🎰 Gamble 🎰")
            .setTimestamp()
            .setColor(utilities.colors.default)
            .setFooter('🍆 Girth Gang 🍆');

        let author = await profileModel.findOne({
            userID: message.author.id,
        })
        let balance = author.coins
        
        if(parseInt(args[0]) > balance) {
            embed.setDescription("You don't have that amount of GirthCash!")
            .addField("Your current balance", `**${author.coins}** GirthCash`)
            .setColor(utilities.colors.red)
            return message.channel.send(embed)
        }

        if (args[0] <= balance || args[0] === "all") { //if argument is minor than current ballance or is equals to all, continue
            if (!args[0].length) { //if argument doesn't exist stop
                embed.setDescription("Something went wrong, try **!gamble <coins amount>**")
                return message.channel.send(embed)
            } if (args[0] === "all") {
                let random = Math.floor(Math.random() < 0.5)
                console.log(random)
                if (random == 1) {
                        try {
                            await profileModel.findOneAndUpdate({
                                userID: message.author.id
                            }, {
                                $inc: {
                                    coins: balance*2
                                }
                            })
                        } catch(err) {
                            return message.channel.send("Catch error")
                        }
                        author = await profileModel.findOne({
                            userID: message.author.id,
                        })
                        embed.setDescription(`${message.author}, congratulations! You won **${author.coins*2}** GirthCash!`)
                        .addField("Your current balance", `**${author.coins}** GirthCash`)
                        .setColor(utilities.colors.green)
                        
                        return message.channel.send(embed)
                } else {
                    await profileModel.findOneAndUpdate({
                        userID: message.author.id
                    }, {
                        $inc: {
                            coins: -balance
                        }
                    })
                    author = await profileModel.findOne({
                        userID: message.author.id,
                    })
                    embed.setDescription(`${message.author}, I'm sorry, you lost the gamble.`)
                    .addField("Your current balance", `**${author.coins}** GirthCash`)
                    return message.channel.send(embed)
                }
            } if (args[0] > 0) {
                let random = Math.floor(Math.random() < 0.5)
                if (random == 1) {
                    try {
                        await profileModel.findOneAndUpdate({
                            userID: message.author.id
                        }, {
                            $inc: {
                                coins: args[0]*2
                            }
                        })
                    } catch(err) {
                        return message.channel.send("Catch error")
                    }
                    author = await profileModel.findOne({
                        userID: message.author.id,
                    })
                    embed.setDescription(`${message.author}, congratulations! You won **${args[0]*2}** GirthCash!`)
                    .addField("Your current balance", `**${author.coins}** GirthCash`)
                    .setColor(utilities.colors.green)
                    return message.channel.send(embed)
                } else {
                    await profileModel.findOneAndUpdate({
                        userID: message.author.id
                    }, {
                        $inc: {
                            coins: -args[0]
                        }
                    })
                    author = await profileModel.findOne({
                        userID: message.author.id,
                    })
                    embed.setDescription(`${message.author}, I'm sorry, you lost the gamble.`)
                    .addField("Your current balance", `**${author.coins}** GirthCash`)
                    return message.channel.send(embed)
            }
        } else {
            embed.setDescription("Argument must be higher than 0")
                .addField("Your current balance", `**${author.coins}** GirthCash`)
                .setColor(utilities.colors.red)

            return message.channel.send(embed)
        }
    } else {
        embed.setDescription("You dont have enough cash!")
            .addField("Your current balance", `**${author.coins}** GirthCash`)
            .setColor(utilities.colors.red)
    }
},
    error: ({error, message}) => {
        if (error === 'INVALID ARGUMENTS') {
            let embed = new MessageEmbed()
            .setTitle("Invalid arguments")
            .setTimestamp()
            .setColor(utilities.colors.default)
            .setFooter('🍆 Girth Gang 🍆')
            .setDescription(`${message.author}, something went wrong, try **!gamble <coins amount> or !gamble all**`)
            .setColor(utilities.colors.red)

        message.reply(embed)
        }
    }
}