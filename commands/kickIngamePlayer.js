const mysql = require("mysql");
const database = require("../settings.json").database;
const ingamePlayerManagement = require("../util/ingamePlayerManagement");

exports.run = (client, message, args) => {
  var player = message.content.substr("::kick ".length);
  if (player) {
    ingamePlayerManagement.kickPlayer(player, client, message);
  } else {
    message.member.send("You must specify a player to kick.");
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["kick"],
  permLevel: 3
};

exports.help = {
  name: "kick",
  description: "Kicks the player if they are online. This is for ingame.",
  usage: "kick "
};
