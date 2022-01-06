const chalk = require('chalk');
module.exports = member => {
  console.log(chalk.bgGreen.black(`${member.user.username} just joined the server.`));
  let guild = member.guild;
  let newMember = member.toString();
  let logChannel = guild.channels.find('name', 'member-log');
  logChannel.send(`Please welcome ${newMember} to the server!`);
}
