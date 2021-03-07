const { MessageEmbed } = require('discord.js')

module.exports = {
    category: 'Girth Gang',
    expectedArgs: "**<range>**",
    description: 'The argument of this command is the range of the numbers between the bot will choose a random number. Try and guess it.',
    callback: ({message, args}) => {
        let embed = new MessageEmbed()
        .setTitle("Guess the number")
        .setTimestamp()
        .setColor("#9939bf")
        .setFooter('🍆 Girth Gang 🍆');
        // error handlers
        if (args.length > 1) {
            embed.setDescription("Error, only one argument accepted. Try !guess 69")
            .setTitle("Invalid Arguments")
                .setColor(0xff0000)
            return message.channel.send(embed)
        } if (args.length <= 0) {
            embed.setDescription("Argument must be higher than 0")
            return message.channel.send(embed)
        } if (args[0] == 0) {
            embed.setDescription("Range must be higher than 0")
            return message.challenged.send(embed)
        } if (isNaN(args)) {
            embed.setDescription("Error, only numbers accepted, Try !guess 69")
            return message.channel.send(embed)
        }
        
        // declare variable for number inserted and random number generated by the bot
        let number = parseInt(args[0])
        let randomNumber = Math.floor(Math.random() * number)

        // wait players insert the correct answer
        embed.setDescription(`I'm thinking of a number between 0 and ${number}`)
        message.channel.send(embed)
        .then(() => {
            message.channel.awaitMessages(response => response.content == randomNumber, {
                    max: 1,
                    time: 60000,
                    errors: ['time']
                }).then((collected) => {
                    if (collected.first().content == randomNumber)
                        embed.setDescription(`Bot's number: **${randomNumber}**\n\nGood job ${collected.first().author} !`)
                            .setColor()
                        return message.channel.send(embed)
                }).catch(() => {
                    embed.setDescription(`Bot's number: **${randomNumber}**\nNo one guessed the number`)
                    return message.channel.send(embed)
                })
            })
        }
}