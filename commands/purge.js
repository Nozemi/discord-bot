exports.run = function(client, message, args) {
  let messagecount = parseInt(args.join(' '));
  message.channel.fetchMessages({
    limit: messagecount
  }).then(function(){
    messages => message.channel.bulkDelete(messages);
    return;
  }).catch(function(){
    return;
  });
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 3
};

exports.help = {
  name: 'purge',
  description: 'Purge X amount of messages from the current channel.',
  usage: 'purge <number>'
};
