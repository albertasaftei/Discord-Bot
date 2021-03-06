const profileModel = require("../../models/profileSchema")

module.exports = async (member) => {
    let profile = await profileModel.create({
        userID: member.id,
        serverID: member.guild.id,
        coins: 1000
    })

    profile.save((err) => {
        console.log(err)
    })
}