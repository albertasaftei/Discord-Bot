module.exports = {
    name: 'sal',
    category: 'Girth Gang',
    description: 'Custom messages for some users and default message for the others',
    callback: ({message}) => {

        switch (message.author.username) {
            case "alburt":
                message.channel.send("duten plm cioroiule")
                break;
            case "Aux Heat":
                message.channel.send("iesi de aici ghebosule")
                break;
            case "d u n e l":
                message.channel.send("spalate la pl roakere")
                break;
            case "Tibovski":
                message.channel.send("intri al 2 lea pe usa ca primu intra nasu'")
                break;
            case "Stefi<3":
                message.channel.send("ceau graso")
                break;
            case "Gabitsa":
                message.channel.send("cf pitico")
                break;
            case "69UCI":
                message.channel.send("du-te si spala masini ochelaristule")
                break;
            case "Gogiman":
                message.channel.send("cf frate, ne bagam?", {files: ["./coca.jpg"]})
                break;
            default:
                message.channel.send(`sal bro ${message.author.toString()}`)
                break;
        }
    }
}