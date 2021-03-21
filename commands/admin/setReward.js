const profileModel = require("../../models/profileSchema")
const { MessageEmbed } = require('discord.js')
const utilities = require("../../config.json")

const setRewards = async (client) => {
    const guild = client.guilds.cache.get("406780459540807681")
    const databaseMembers = await profileModel.find()

    for (let i = 0; i < databaseMembers.length; i++) {
        const {userID: id} = databaseMembers[i]
        let member = guild.members.cache.get(id)

        if (member) { // check if the member from the db exists in the server then check if he's online
            if(member.presence.status === 'online' || member.presence.status === 'dnd' || member.presence.status === 'idle') {
                await profileModel.findOneAndUpdate({
                    userID: id
                }, {
                    $inc: {
                        coins: 500
                    }
                })
            }
        }
    }

    setTimeout(() => {
        setRewards(client)
    }, 1000 * 60 * 15);
}

module.exports = {
    name: 'setReward',
    aliases: ['sr'],
    permissions: ['ADMINISTRATOR'],
    maxArgs: 0,
    category: "Admin",
    description: 'Set up cash rewards',
    callback: async ({message, client}) => {
        let embed = new MessageEmbed()
            .setTitle("Set Rewards")
            .setTimestamp()
            .setColor(utilities.colors.default)
            .setFooter('🍆 Girth Gang 🍆');

        setRewards(client)
        embed.setDescription("The bot has started giving rewards to all the users")
            .setColor(utilities.colors.admin)
        
        return message.channel.send(embed)
    }
}