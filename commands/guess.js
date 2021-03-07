module.exports = {
    category: 'Girth Gang',
    expectedArgs: "**<range>**",
    description: 'The argument of this command is the range of the numbers between the bot will choose a random number. Try and guess it.',
    callback: ({message, args}) => {
        // error handlers
        if (args.length > 1) {
            return message.channel.send("Error, only one argument accepted. Try !guess 69")
        } if (args.length <= 0) {
            return message.channel.send("Argument must be higher than 0")
        } if (args[0] == 0) {
            return message.challenged.send("Range must be higher than 0")
        } if (isNaN(args)) {
            return message.channel.send("Error, only numbers accepted, Try !guess 69")
        }
        
        // declare variable for number inserted and random number generated by the bot
        let number = parseInt(args[0])
        let randomNumber = Math.floor(Math.random() * number)

        // wait players insert the correct answer
        message.channel.send(`I'm thinking of a number between 0 and ${number}`)
        .then(() => {
            message.channel.awaitMessages(response => response.content == randomNumber, {
                    max: 1,
                    time: 60000,
                    errors: ['time']
                }).then((collected) => {
                    if (collected.first().content == randomNumber)
                        return message.reply({embed: {
                            title: 'Guess the number',
                            description: `Bot's number: **${randomNumber}**\n\nGood job ${collected.first().author} !`,
                        }})
                }).catch(() => {
                    return message.channel.send(`Bot's number: **${randomNumber}**\nNo one guessed the number`)
                })
            })
        }
}