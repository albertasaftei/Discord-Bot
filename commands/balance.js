const profileModel = require("../models/profileSchema")
const embed = require("../models/embed");
    embed.setTitle("Balance")

module.exports = {
    aliases: ['bal', 'b'],
    category: 'Girth Cash',
    maxArgs: 0,
    description: 'Check user balance',
    callback: async ({message}) => {
        let user = await profileModel.findOne({ userID: message.author.id })

        if(user) {
            embed.setDescription(`${message.author}, your GirtCash balance is: ${user.coins} 💸`)
            message.channel.send(embed)
        }
    }
}