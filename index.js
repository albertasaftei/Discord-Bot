require('dotenv').config();
const Discord = require('discord.js')
const client = new Discord.Client()
const WOKCommands = require('wokcommands')
const profileModel = require("./models/profileSchema")

client.on('ready', () => {
    console.log(`Bot ${client.user.tag} connected`)

    const dbOptions = {
        keepAlive: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
    }

    new WOKCommands(client, {
        commandsDir: 'commands',
        dbOptions
    })
    .setMongoPath(process.env.MONGO_SRV)
    .setCategorySettings([
        {
            name: 'Admin',
            emoji: '🕵🏻‍♂️'
        },
        {
            name: 'Girth Gang',
            emoji: '🍆'
        },
        {
            name: 'Girth Cash',
            emoji: '💸'
        }
    ])
})

client.on('message', async (receivedMessage) => {
    let profileData

        try{
            if (!receivedMessage.author.bot) {
                profileData = await profileModel.findOne({ userID: receivedMessage.author.id })
                if(!profileData) {
                    let profile = await profileModel.create({
                        userID: receivedMessage.author.id,
                        serverID: receivedMessage.guild.id,
                        coins: 1000
                    });
                    profile.save()
                }
            }
        }catch(err) {
            console.log(err)
        }
})

client.login()