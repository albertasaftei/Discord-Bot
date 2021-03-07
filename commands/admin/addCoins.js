const profileModel = require("../../models/profileSchema")
const embed = require("../../models/embed");

module.exports = {
    name: 'add',
    permissions: ['ADMINISTRATOR'],
    expectedArgs: "**<amount> <@username>**",
    category: "Admin",
    description: 'Add coins to an user',
    callback: async ({message, args}) => {
        embed.setTitle("Add coins")

        if (message.mentions.users.first() === undefined) {
            embed.setDescription("This user doesn't exist")
                .setColor(0xff0000)
            return message.channel.send(embed)
        }
        if(args[0] <= 0) {
                embed.setDescription("Amount value must be higher than 0")
            return message.channel.send(embed)
        } else {
            try {
                await profileModel.findOneAndUpdate({
                    userID: message.mentions.users.first().id 
                }, {
                    $inc: {
                        coins: args[0]
                    }
                })
            } catch(err) {
                embed.setDescription("Something went wrong, check logs")
                .setColor(0xff0000)
                return message.channel.send(embed)
            }
            
            embed.setDescription(`Admin has added ${args[0]} GirthCash to ${message.mentions.users.first()}`)
            return message.channel.send(embed)
        }
    }
}
