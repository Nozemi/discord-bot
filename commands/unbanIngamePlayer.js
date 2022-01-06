const mysql = require("mysql");
const database = require("../settings.json").database;
const ingamePlayerManagement = require("../util/ingamePlayerManagement");

exports.run = (client, message, args) => {
  var player = message.content.substr("::unban ".length);
  if (player) {
    ingamePlayerManagement.unbanPlayer(player, client, message);
  } else {
    message.member.send("You must specify a player to unban.");
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["unban"],
  permLevel: 3
};

exports.help = {
  name: "unban",
  description: "Unbans the player if they are online. This is for ingame.",
  usage: "unban "
};
