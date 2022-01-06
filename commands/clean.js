const settings = require('../settings.json').general;
exports.run = (client, message, args) => {
  let type = args.join(' ');
  switch(type) {
    case 'botMsgs':
    case 'botMessages':
    case 'bot':
      message.channel.fetchMessages().then(messages => {
        let msgs = messages.array();
        for(let i = 0; i < messages.size; i++) {
          if(client.user.id === msgs[i].author.id) {
            msgs[i].delete();
          }
        }
        return;
      }).catch(function(){
        return;
      });
      break;
    case 'failedCommands':
    case 'failedCmds':
      message.channel.fetchMessages().then(messages => {
        let msgs = messages.array();
        for(let i = 0; i < messages.size; i++) {
          if(msgs[i].content.startsWith(settings.prefix)) {
            msgs[i].delete();
          }
        }
        return;
      }).catch(function(){
        return;
      });
      break;
    default:
      message.reply('You need to specify a type of cleanup to perform.');
      break;
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 3
};

exports.help = {
  name: 'clean',
  description: 'Cleans the appropriate channel of messages.',
  usage: 'clean [type]'
};