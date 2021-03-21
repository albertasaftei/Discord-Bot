const profileModel = require("../../models/profileSchema")

module.exports = {
    name: 'updateDB',
    aliases: ['udb'],
    permissions: ['ADMINISTRATOR'],
    category: "Admin",
    description: "Updates the users in the database",
    callback: async ({client}) => {
        const guild = client.guilds.cache.get("406780459540807681")
        let profileData

        try {
            guild.members.fetch().then(members => {
                members.forEach(async member => {
                    let {id} = member

                    if (member.user.bot === true) return // for each member check if is a bot, if not check if is in the database

                    profileData = await profileModel.findOne({ userID: id })
                    if (!profileData) {
                        let profile = await profileModel.create({
                            userID: id,
                            serverID: client.guilds.id,
                            coins: 1000
                        });
                        profile.save()
                    }
                    });
                })
        } catch(err) {
            console.log(err)
        }
    }
}