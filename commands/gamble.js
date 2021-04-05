const profileModel = require("../models/profileSchema")
const { MessageEmbed } = require('discord.js')
const utilities = require("../config.json")

module.exports = {
    name: "gamble",
    minArgs: 1,
    maxArgs: 1,
    category: "Girth Gang",
    description: "Gamble a certain amount of money. If you win, you'll get the gambled amount.",
    expectedArgs: "<coins amount>",
    callback: async ({message, args}) => {
        let embed = new MessageEmbed()
            .setTitle("🎰 Gamble 🎰")
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

        let {coins} = await profileModel.findOne({
            userID: message.author.id,
        })
        let balance = coins
        let gambled = args[0]
        
        if(gambled > balance) {
            embed.setDescription("You don't have that amount of GirthCash!")
            .addField("Your current balance", `**${balance}** GirthCash`)
            .setColor(utilities.colors.red)
            return message.channel.send(embed)
        }

        if (gambled <= balance || gambled === "all") { //if argument is minor than current ballance or is equals to all, continue
            if (args[0] === "all") { //if arguments equals to "all" but balance is zero, return error   
                if (balance == 0) {
                    embed.setDescription("Your GirthCash balance is **0**")
                        .setColor(utilities.colors.red)
                    return message.channel.send(embed)
                } 
                let random = Math.floor(Math.random() * 100)
                if (random <= 48) {
                        try {
                            await profileModel.findOneAndUpdate({
                                userID: message.author.id
                            }, {
                                $inc: {
                                    coins: balance
                                }
                            })
                        } catch(err) {
                            return message.channel.send('Catch error ALL')
                        }
                        let {coins} = await profileModel.findOne({
                            userID: message.author.id,
                        })

                        embed.setDescription(`${message.author}, congratulations! You won **${balance}** GirthCash!`)
                        .addField("Your current balance", `**${coins}** GirthCash`)
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
                    let {coins} = await profileModel.findOne({
                        userID: message.author.id,
                    })
                    embed.setDescription(`${message.author}, I'm sorry, you lost the gamble.`)
                    .addField("Your current balance", `**${coins}** GirthCash`)
                    .setColor(utilities.colors.red)
                    return message.channel.send(embed)
                }
            } if (gambled > 0) {
                let random = Math.floor(Math.random() * 100)
                if (random <= 48) {
                    try {
                        await profileModel.findOneAndUpdate({
                            userID: message.author.id
                        }, {
                            $inc: {
                                coins: gambled
                            }
                        })
                    } catch(err) {
                        return message.channel.send("Catch error 2")
                    }
                    let {coins} = await profileModel.findOne({
                        userID: message.author.id,
                    })
                    embed.setDescription(`${message.author}, congratulations! You won **${gambled}** GirthCash!`)
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
                    let {coins} = await profileModel.findOne({
                        userID: message.author.id,
                    })
                    embed.setDescription(`${message.author}, I'm sorry, you lost the gamble.`)
                    .addField("Your current balance", `**${coins}** GirthCash`)
                    return message.channel.send(embed)
            }
        } else {
            embed.setDescription("Argument must be higher than 0")
                .addField("Your current balance", `**${coins}** GirthCash`)
                .setColor(utilities.colors.red)

            return message.channel.send(embed)
        }
    } else {
        embed.setDescription("You dont have enough cash!")
            .addField("Your current balance", `**${coins}** GirthCash`)
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