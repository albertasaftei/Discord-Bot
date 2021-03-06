module.exports = {
    maxArgs: 1,
    callback: ({message}) => {
        //checks if the username to fight is in the message
    let author = message.author.username;
    let user = message.mentions.users.first();
    if(!user) return message.reply("Try `!duel @username`");

    //checks if the users is trying to fight themselves
    if(user.id == message.author.id) return message.reply('You cannot fight yourself!');

    //checks if the user is trying to fight the bot
    if(user.bot ==  true)
        return message.reply('You cannot fight a bot!');

    //saves the two user ids to variables
    let fighter1 = message.author.id;
    let fighter2 = user.id;

    //announces challenge and awaits response
    let challenged = user.toString();
    message.channel.send(`${challenged}, ${author} has challenged you to a duel. Do you accept the challenge, yes or no?`)
        .then(() => {
            message.channel.awaitMessages(response => response.content == 'yes' && response.author.id == fighter2 || response.content == 'no' && response.author.id == fighter2, {
                max: 1,
                time: 60000,
                errors: ['time'],
            })
            .then((collected) => {
                if (collected.first().content == 'yes') {
                    message.channel.send(`${challenged} has accepted the chalenge!`)
                        .then(() => {
                            
                        })
                    
                }
                else if(collected.first().content == 'no') {
                    message.channel.send(`nope`);
                }
            })
            .catch(() => {
                message.channel.send(`No response. Fight has been cancelled.`);
            });
        });
    }
}