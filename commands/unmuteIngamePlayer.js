const mysql = require("mysql");
const database = require("../settings.json").database;
const ingamePlayerManagement = require("../util/ingamePlayerManagement");

exports.run = (client, message, args) => {
  var player = message.content.substr("::unmute ".length);
  if (player) {
    ingamePlayerManagement.unmutePlayer(player, client, message);
  } else {
    message.member.send("You must specify a player to unmute.");
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["unmute"],
  permLevel: 3
};

exports.help = {
  name: "unmute",
  description: "Unmutes the player if they are online. This is for ingame.",
  usage: "unmute "
};
