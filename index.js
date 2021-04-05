require('dotenv').config();
const Discord = require('discord.js')
const client = new Discord.Client()
const profileModel = require('./models/profileSchema')
const { MessageEmbed } = require('discord.js')
const utilities = require('./config.json');
const WOKCommands = require('wokcommands')
const levels = require('./levels')

let embed = new MessageEmbed()
        .setTitle("⬆️ Level up ⬆️")
        .setTimestamp()
        .setColor(utilities.colors.default)
        .setFooter('🍆 Girth Gang 🍆');

client.on('ready', () => {
    console.log(`Bot ${client.user.tag} connected`)
    levels(client)
    client.user.setActivity('!help for commands', {type: "PLAYING"})

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
        },
        {
            name: 'Level System',
            emoji: '⬆️'
        }
    ])
})

client.on('message', async (message) => {
    let profileData
    try{
        if (!message.author.bot) {
            profileData = await profileModel.findOne({ userID: message.author.id })
            if(!profileData) {
                await profileModel.updateOne({
                    userID: message.author.id,
                    serverID: message.guild.id,      
                }, {
                    coins: 1000
                });
            }
        }
    }catch(err) {
        console.log(err)
    }
})

client.login()