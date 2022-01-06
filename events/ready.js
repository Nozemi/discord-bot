const chalk = require('chalk');
const mysql = require("mysql");
const settings = require('../settings.json').general;
const database = require("../settings.json").database;
const nozum = require('../util/nozum');
connection = mysql.createConnection({
  host: database.host,
  user: database.user,
  password: database.pass,
  database: database.name
});

module.exports = client => {
  console.log(chalk.bgGreen.black('Bot is ready.'));
  connection.connect(function(err) {
    if (err) {
      console.log(chalk.bgRed(`Database Connection Error: ${err}`));
      return;
    }

    console.log(chalk.bgGreen(`Database Connected!`));
  });
  client.user.setUsername(settings.name);

  var guild = client.guilds.first;
  if(guild != null) {
    //guild.members.find(client.user.id).setNickname(settings.nickname);
  }

  //client.user.setNickname(settings.nickname);


  //message.guild.members.get(bot.user.id).setNickname("some nickname");

  if(updateInterval !== null) {
    clearInterval(updateInterval);
  }

  var updateInterval = setInterval(function() {
  }, settings.userSyncInterval);
};
