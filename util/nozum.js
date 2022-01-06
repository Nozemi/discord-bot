const mysql = require("mysql");
const database = require("../settings.json").database;
const chalk = require("chalk");
const util = require("util");
const userRoles = require("../config/userRoles").userRoles;

exports.updateUser = (member, client, message, sync = false) => {
  var memberId = message.channel.type == "dm" ? member : member.id;

  return getMemberFromId(client, memberId).then(function (model) {
    member = model;
    connection.query("SELECT id, discordId, username, groupId FROM " + database.prefix + "users WHERE discordId = '" + memberId + "'",
      function (error, results, fields) {
        if (error) {
          console.log(chalk.bgRed(`Database Query Error: ${error}`));
          message.reply("The command failed to run. Try again.");
          return false;
        } else {
          if (results.length) {
            return setMemberDetails(results, message, member, client);
          } else {
            message.reply("The requested account failed to sync. Are you sure you added your Discord Id to your forum profile? Type ::myId in the Alverdine server to obtain your Id.");
            return false;
          }
        }
      }
    );
  }).catch(function () {
    console.log("Error: getMemberFromId");
    return false;
  });
};

setMemberDetails = function (results, message, member, client) {
  var username = results[0].username ? results[0].username : "";
  var memberGroupId = results[0].groupId ? results[0].groupId : "";
  var userRole = _.find(userRoles, function (role) {
    return role.value === memberGroupId;
  });

  if (userRole != null) {
    return setMemberRole(member, message, userRole, client).then(function () {
      return setMemberNickname(member, message, username).then(function () {
        return message.reply(username + " has been synced.");
      });
    });
  } else {
    message.reply("Failed to sync user role. Try again.");
    return false;
  }
};

setMemberRole = function (member, message, memberGroup, client) {
  var guild = client.guilds.get("415598629537972224");
  var userRole = guild.roles.find("name", memberGroup.discordName);
  return member
    .addRole(userRole)
    .then(function () {
      return member.removeRole(guild.roles.find("name", "Guests")).then(function () {
        return true;
      }).catch(function () {
        console.log(err);
        message.reply("Failed to sync user role. Failed to remove Guest role. Try again.");
        return false;
      });
    })
    .catch(function (err) {
      console.log(err);
      message.reply("Failed to sync user role. Try again.");
      return false;
    });
};

setMemberNickname = function (member, message, username) {
  return member
    .setNickname(username)
    .then(function () {
      return true;
    })
    .catch(function (err) {
      console.log(err);
      message.reply("Failed to sync user nickname. Try again.");
      return false;
    });
};

getMemberFromId = function (client, memberId) {
  return client.guilds.get('415598629537972224').fetchMember(memberId).then(guildMember => {
    return guildMember;
  }).catch(function () {
    console.log("Error: getMemberFromId");
    return false;
  });
};