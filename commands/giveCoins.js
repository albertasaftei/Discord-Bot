const profileModel = require("../models/profileSchema")

module.exports = {
    name: 'give',
    aliases: ['g', 'taxaprotectie'],
    minArgs: 1,
    maxArgs: 2,
    category: 'Girth Cash',
    description: 'Give Girth Cash to another user',
    callback: async ({message, args, client}) => {
        if (message.mentions.has(client.user.id)) {
            return message.channel.send("You can't give cash to a Bot")
        } if (!args.length) {
            return message.channel.send("Try !give <number> <@user>")
        } if (args.length == 3) {
            return message.channel.send("Try !give <number> <@user>")
        } if (isNaN(args[0])) {
            return message.channel.send("Try !give <number> <@user>")
        }

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
            return message.channel.send("Something went wrong")
        }
        
        return message.channel.send(`${message.author.toString()} has given **${message.mentions.users.first().toString()}** ${args[0]} GirthCash`)
        
    }
}