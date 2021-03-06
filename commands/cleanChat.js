module.exports = {
    name: 'clean',
    permissions: ['ADMINISTRATOR'],
    category: 'Admin',
    description: 'Deletes 50 messages',
    callback: ({message, args}) => {
        if (args.length >= 1 ) {
            return message.channel.send("Try !clean")
        }
        message.channel.bulkDelete(50);
    }
}