const mysql = require("mysql");
const database = require("../settings.json").database;
const ingamePlayerManagement = require("../util/ingamePlayerManagement");

exports.run = (client, message, args) => {
  var player = message.content.substr("::mute ".length);
  if (player) {
    ingamePlayerManagement.mutePlayer(player, client, message);
  } else {
    message.member.send("You must specify a player to mute.");
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["mute"],
  permLevel: 3
};

exports.help = {
  name: "mute",
  description: "Mutes the player if they are online. This is for ingame.",
  usage: "mute "
};
