const mysql = require('mysql');
const database = require('../settings.json').database;
const nozum = require('../util/nozum');
const userRoles = require("../config/userRoles").userRoles;

exports.run = (client, message, args) => {
  let member;

  if (message.channel.type == "dm") {
    member = message.channel.recipient.id;
  } else {
    member = assignMemberBasedOnUserRole(message, message.guild);
  }

  getMemberRole(client, member).then(function (userIsNotAMember) {
    if (userIsNotAMember) {
      return nozum.updateUser(member, client, message);
    } else {
      let messageToSend = "You don't have permissions to run that command.";
      return message.reply(messageToSend);
    }
  });
};

function getMemberRole(client, member) {
  return client.guilds.get('415598629537972224').fetchMember(member).then(guildMember => {
    var roles = guildMember.roles;
    if (roles.find("name", "Members")) {
      return false;
    } else {
      return true;
    }
  }).catch(function () {
    console.log("Error");
    return false;
  });
};

function assignMemberBasedOnUserRole(message, guild) {
  if (message.member.roles.find("name", "Administrators") || message.member.roles.find("name", "Developers") || message.member.roles.find("name", "Moderators")) {
    console.log("User has perms to @ people: " + message.member);
    return guild.member(message.mentions.users.first() ? message.mentions.users.first() : message.author);
  } else {
    console.log("User doesn't have perms to @ people: " + message.member);
    return message.author;
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['sync'],
  permLevel: 0
};

exports.help = {
  name: 'sync',
  description: 'Syncs the users Discord account with their forum account if they have their Discord Id set in their Profile information.',
  usage: 'sync [mention]'
};