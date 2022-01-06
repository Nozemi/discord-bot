exports.run = (client, message, args) => {
    if (message.channel.type == "dm") {
        message.reply(`Your Discord ID is: ${message.channel.recipient.id}`);
    } else {
        message.member.send(`Your Discord ID is: ${message.member.id}`);
    }
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0
};

exports.help = {
    name: 'myid',
    description: 'Sends the your Discord ID in a direct message.',
    usage: 'myid'
};
