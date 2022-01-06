const mysql = require("mysql");
const database = require("../settings.json").database;
const ingamePlayerManagement = require("../util/ingamePlayerManagement");

exports.run = (client, message, args) => {
  var player = message.content.substr("::ban ".length);
  if (player) {
    ingamePlayerManagement.banPlayer(player, client, message);
  } else {
    message.member.send("You must specify a player to ban.");
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["ban"],
  permLevel: 3
};

exports.help = {
  name: "ban",
  description: "Bans the player if they are online. This is for ingame.",
  usage: "ban "
};
