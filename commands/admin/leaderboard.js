const profileModel = require("../../models/profileSchema")
const { MessageEmbed } = require('discord.js')
const utilities = require('../../config.json');

const fetchTopMembers = async () => {
    let finalMessage = ""
    let leaderboard = await profileModel.find().sort({
        coins: -1
    }).limit(10)


    for (let i = 0; i < leaderboard.length; i++) {
        const {userID, coins} = leaderboard[i];

        finalMessage += `#${i + 1} <@${userID}> with **${coins}** GirthCash\n`
    }

    return finalMessage
}

const updateLeaderboard = async (client) => {
    let embed = new MessageEmbed()
        .setTitle("Leaderboard")
        .setTimestamp()
        .setColor(utilities.colors.admin)
        .setFooter('🍆 Girth Gang 🍆');

    const results = await profileModel.find({})

    for(const result of results) {
        const guild = client.guilds.cache.get("406780459540807681")
        if (guild) {
            const channel = guild.channels.cache.get("818592412985196544")
            if (channel) {
                const messages = await channel.messages.fetch()
                const firstMessage = messages.first()
                
                const topMembers = await fetchTopMembers()
                embed.setDescription(topMembers)

                if (firstMessage) {
                    firstMessage.edit(embed)
                } else {
                    channel.send(embed)
                }
            }
        }

    }

    setTimeout(() => {
        updateLeaderboard(client)
    }, 1000 * 60 * 60);
}

module.exports = {
    name: "leaderboard",
    category: "Admin",
    description: "Set up the leaderboard",
    permissions: ['ADMINISTRATOR'],
    callback: async ({message, client}) => {
        let embed = new MessageEmbed()
        .setTitle("Leaderboard")
        .setTimestamp()
        .setColor(utilities.colors.admin)
        .setFooter('🍆 Girth Gang 🍆');

        updateLeaderboard(client)

        embed.setDescription("Leaderboard has been set")
        return message.channel.send(embed)
    }
}