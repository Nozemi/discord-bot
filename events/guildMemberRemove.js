const chalk = require('chalk');
module.exports = member => {
  console.log(chalk.bgGreen.black(`${member.user.username} was removed from the server.`));
  let guild = member.guild;
  let newMember = member.toString();
  let logChannel = guild.channels.find('name', 'member-log');
  logChannel.send(`Sadly ${newMember} chose to leave us.`);
}
