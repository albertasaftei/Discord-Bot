module.exports = {
    name: 'rps',
    maxArgs: 1,
    expectedArgs: "**<rock / paper / scissors>**",
    category: 'Girth Gang',
    description: 'rock paper scissors game with the bot',
    callback: ({message, args}) => {
        if (args.length > 1) {
            return message.channel.send("Error, try `!rps rock`")
        }
    
        // choices and bot's random choice
        let choices = ["rock", "paper", "scissors"];
        let botChoice = choices[Math.floor(Math.random() * choices.length)];
    
        // possible combinations and output result
        if (botChoice === "rock" && args[0] === "scissors") {
            message.channel.send(`**${botChoice}**\nTeapa fraiere ${message.author.toString()}`)
        } if (botChoice === "rock" && args[0] === "paper") {
            message.channel.send(`**${botChoice}**\nBv frate, m-ai batut ${message.author.toString()}`)
        } if (botChoice === "rock" && args[0] === "rock") {
            message.channel.send(`**${botChoice}**\nEgal ${message.author.toString()}`)
        } if (botChoice === "paper" && args[0] === "rock") {
            message.channel.send(`**${botChoice}**\nTeapa fraiere ${message.author.toString()}`)
        } if (botChoice === "paper" && args[0] === "scissors") {
            message.channel.send(`**${botChoice}**\nBv frate, m-ai batut ${message.author.toString()}`)
        } if (botChoice === "paper" && args[0] === "paper") {
            message.channel.send(`**${botChoice}**\nEgal ${message.author.toString()}`)
        } if (botChoice === "scissors" && args[0] === "paper") {
            message.channel.send(`**${botChoice}**\nTeapa fraiere ${message.author.toString()}`)
        } if (botChoice === "scissors" && args[0] === "rock") {
            message.channel.send(`**${botChoice}**\nBv frate, m-ai batut ${message.author.toString()}`)
        } if (botChoice === "scissors" && args[0] === "scissors") {
            message.channel.send(`**${botChoice}**\nEgal ${message.author.toString()}`)
        } if (!args[0] == "scissors" || !args[0] == "paper" || !args[0] == "rock") {
            return message.channel.send("Error, args must be `rock`, `paper` or `scissors`")
        }
    }
}