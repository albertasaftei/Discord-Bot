const profileModel = require("../../models/profileSchema")
const embed = require("../../models/embed");

module.exports = {
    name: 'badmin',
    permissions: ['ADMINISTRATOR'],
    expectedArgs: "**<@username>**",
    category: "Admin",
    description: 'See tagged user balance',
    callback: async ({message}) => {
        embed.setTitle("User Balance")
        try {
            let user = await profileModel.findOne({ userID: message.mentions.users.first().id })
    
            if(user) {
                embed.setDescription(`${message.mentions.users.first()} has **${user.coins}** GirthCash 💸`)
                message.channel.send(embed)
            } else {
                embed.setDescription("This user doesn't exist")
                message.channel.send(embed)
            }
        } catch(err) {
            embed.setDescription("Something went wrong, check logs.")
                .setColor(0xff0000)
            return message.channel.send(embed)
        }
    }
}