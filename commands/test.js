exports.run = (client, message, args) => {
  message.reply(`I'm a test command.`);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 3
};

exports.help = {
  name: 'test',
  description: 'Test command.',
  usage: 'test'
};
