require('dotenv').config();
const Discord = require('discord.js')
const client = new Discord.Client()

client.on('ready', () => {
    console.log(`Merge botu ${client.user.tag}`)
})

client.on('message', (receivedMessage) => {

    if (receivedMessage.author == client.user) {
        return
    }

    if (receivedMessage.content.startsWith("!")) {
        processCommand(receivedMessage)
    }
})

// process commands
function processCommand(receivedMessage) {
    let fullCommand = receivedMessage.content.substr(1)
    let splitCommand = fullCommand.split(" ")
    let primaryCommand = splitCommand[0]
    let arguments = splitCommand.slice(1)


    if (primaryCommand === "sal") {
        customGreetings(receivedMessage)
    } if (primaryCommand === "rps") {
        rpsGame(receivedMessage, arguments)
    } if (primaryCommand === "clean") {
        cleanChat(receivedMessage, arguments)
    } if (primaryCommand === "duel") {
        duelGame(receivedMessage)
    } if (primaryCommand === "guess") {
        guessNumber(receivedMessage, arguments)
    }
}

// commands functions
function customGreetings(receivedMessage) {
    //custom greetings
    switch (receivedMessage.author.username) {
        case "alburt":
            receivedMessage.channel.send("duten plm cioroiule")
            break;
        case "Aux Heat":
            receivedMessage.channel.send("iesi de aici ghebosule")
            break;
        case "d u n e l":
            receivedMessage.channel.send("spalate la pl roakere")
            break;
        case "Tibovski":
            receivedMessage.channel.send("intri al 2 lea pe usa ca primu intra nasu'")
            break;
        case "Stefi<3":
            receivedMessage.channel.send("ceau graso")
            break;
        case "Gabitsa":
            receivedMessage.channel.send("cf pitico")
            break;
        case "69UCI":
            receivedMessage.channel.send("du-te si spala masini ochelaristule")
            break;
        case "Gogiman":
            receivedMessage.channel.send("cf frate, bagam niste cox?")
            break;
        default:
            receivedMessage.channel.send(`sal bro ${receivedMessage.author.toString()}`)
            break;
    }
}

function rpsGame(receivedMessage, arguments) {
    // if users inserts more than one argument => output error
    if (arguments.length > 1) {
        return receivedMessage.channel.send("Error, try `!rps rock`")
    }

    // choices and bot's random choice
    let choices = ["rock", "paper", "scissors"];
    let botChoice = choices[Math.floor(Math.random() * choices.length)];

    // possible combinations and output result
    if (botChoice === "rock" && arguments[0] === "scissors") {
        receivedMessage.channel.send(`**${botChoice}**\nTeapa fraiere ${receivedMessage.author.toString()}`)
    } if (botChoice === "rock" && arguments[0] === "paper") {
        receivedMessage.channel.send(`**${botChoice}**\nBv frate, m-ai batut ${receivedMessage.author.toString()}`)
    } if (botChoice === "rock" && arguments[0] === "rock") {
        receivedMessage.channel.send(`**${botChoice}**\nEgal ${receivedMessage.author.toString()}`)
    } if (botChoice === "paper" && arguments[0] === "rock") {
        receivedMessage.channel.send(`**${botChoice}**\nTeapa fraiere ${receivedMessage.author.toString()}`)
    } if (botChoice === "paper" && arguments[0] === "scissors") {
        receivedMessage.channel.send(`**${botChoice}**\nBv frate, m-ai batut ${receivedMessage.author.toString()}`)
    } if (botChoice === "paper" && arguments[0] === "paper") {
        receivedMessage.channel.send(`**${botChoice}**\nEgal ${receivedMessage.author.toString()}`)
    } if (botChoice === "scissors" && arguments[0] === "paper") {
        receivedMessage.channel.send(`**${botChoice}**\nTeapa fraiere ${receivedMessage.author.toString()}`)
    } if (botChoice === "scissors" && arguments[0] === "rock") {
        receivedMessage.channel.send(`**${botChoice}**\nBv frate, m-ai batut ${receivedMessage.author.toString()}`)
    } if (botChoice === "scissors" && arguments[0] === "scissors") {
        receivedMessage.channel.send(`**${botChoice}**\nEgal ${receivedMessage.author.toString()}`)
    } if (!arguments[0] == "scissors" || !arguments[0] == "paper" || !arguments[0] == "rock") {
        return receivedMessage.channel.send("Error, arguments must be `rock`, `paper` or `scissors`")
    }
}

function cleanChat(receivedMessage, arguments) {
    if (arguments.length >= 1 ) {
        return receivedMessage.channel.send("Try !clean")
    }
    receivedMessage.channel.bulkDelete(50);
}

function duelGame(receivedMessage) {
    //checks if the username to fight is in the message
    let author = receivedMessage.author.username;
    let user = receivedMessage.mentions.users.first();
    if(!user) return receivedMessage.reply("Try `!duel @username`");

    //checks if the users is trying to fight themselves
    if(user.id == receivedMessage.author.id) return receivedMessage.reply('You cannot fight yourself!');

    //checks if the user is trying to fight the bot
    if(user.bot ==  true)
        return receivedMessage.reply('You cannot fight a bot!');

    //saves the two user ids to variables
    let fighter1 = receivedMessage.author.id;
    let fighter2 = user.id;

    //announces challenge and awaits response
    let challenged = user.toString();
    receivedMessage.channel.send(`${challenged}, ${author} has challenged you to a duel. Do you accept the challenge, yes or no?`)
        .then(() => {
            receivedMessage.channel.awaitMessages(response => response.content == 'yes' && response.author.id == fighter2 || response.content == 'no' && response.author.id == fighter2, {
                max: 1,
                time: 60000,
                errors: ['time'],
            })
            .then((collected) => {
                if (collected.first().content == 'yes') {
                    receivedMessage.channel.send(`${challenged} has accepted the chalenge!`)
                        .then(() => {
                            
                        })
                    
                }
                else if(collected.first().content == 'no') {
                    receivedMessage.channel.send(`nope`);
                }
            })
            .catch(() => {
                receivedMessage.channel.send(`No response. Fight has been cancelled.`);
            });
        });
}

function guessNumber(receivedMessage, arguments) {
    // error handlers
    if (arguments.length > 1) {
        return receivedMessage.channel.send("Error, only one argument accepted. Try !guess 69")
    } if (arguments.length <= 0) {
        return receivedMessage.channel.send("Argument must be higher than 0")
    } if (arguments[0] == 0) {
        return receivedMessage.challenged.send("Range must be higher than 0")
    } if (isNaN(arguments)) {
        return receivedMessage.channel.send("Error, only numbers accepted, Try !guess 69")
    }
    
    // declare variable for number inserted and random number generated by the bot
    let number = parseInt(arguments[0])
    let randomNumber = Math.floor(Math.random() * number)

    // wait players insert the correct answer
    receivedMessage.channel.send(`I'm thinking of a number between 0 and ${number}`)
    .then(() => {
        receivedMessage.channel.awaitMessages(response => response.content == randomNumber, {
                max: 1,
                time: 60000,
                errors: ['time']
            }).then((collected) => {
                if (collected.first().content == randomNumber)
                    return receivedMessage.reply({embed: {
                        title: 'Guess the number',
                        description: `Bot's number: **${randomNumber}**\n\nGood job ${collected.first().author} !`,
                    }})
            }).catch(() => {
                return receivedMessage.channel.send(`Bot's number: **${randomNumber}**\nNo one guessed the number`)
            })
        })


}

client.login()