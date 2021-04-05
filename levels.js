const profileModel = require("./models/profileSchema")
const { MessageEmbed } = require('discord.js')
const utilities = require('./config.json');

module.exports = (client) => {
    client.on('message', (message) => {
        const {guild, member} = message

        addXP(guild.id, member.id, 1, message)
    })
}

const getNeededExp = (level) => level * 100

const addXP = async (serverID, userID, xpToAdd, message) => {
    let embed = new MessageEmbed()
        .setTitle("⬆️ Level up ⬆️")
        .setTimestamp()
        .setColor(utilities.colors.default)
        .setFooter('🍆 Girth Gang 🍆');


    if (!message.author.bot) {
        try {
            const result = await profileModel.findOneAndUpdate({
                serverID,
                userID,
            }, {
                serverID,
                userID,
                $inc: {
                    xp: xpToAdd,
                }
            }, {
                upsert: true,
                new: true
            })

            let {xp, level} = result
            const needed = getNeededExp(level)  

            if (xp >= needed) {
                ++level
                xp -= needed

                embed.setDescription(`**${message.author}**, you leveled up!\nYou are now level **${level}**`)
                    .setColor(utilities.colors.green)
                message.channel.send(embed)
            }

            await profileModel.updateOne({
                serverID,
                userID
            }, {
                level,
                xp
            })
    
        } catch(err) {
            return console.log(err)
        }
    }
}