const profileModel = require("../models/profileSchema")

module.exports = {
    aliases: ['bal', 'b'],
    category: 'Girth Cash',
    description: 'Check user balance',
    callback: async ({message}) => {

        let user = await profileModel.findOne({ userID: message.author.id })

        if(user) {
            message.channel.send(`GirthCash balance: ${user.coins}`)
        }
    }
}