const mysql = require("mysql");
const database = require("../settings.json").database;
const chalk = require("chalk");
const util = require("util");
const userRoles = require("../config/userRoles").userRoles;
const request = require("request");

exports.kickPlayer = (player, client, message, sync = false) => {
  connection.query(
    "SELECT name  FROM " +
      database.prefix +
      "core_members WHERE name = '" +
      player +
      "'",
    function(error, results, fields) {
      if (error) {
        console.log(chalk.bgRed(`Database Query Error: ${error}`));
        message.member.send("The command failed to run. Try again.");
        return;
      } else {
        if (results.length) {
          webRequestToServer(player, message, "kick");
        } else {
          let messageToSend = "Could not find the specified player to kick.";
          message.member.send(messageToSend);
          return;
        }
      }
    }
  );
};

exports.mutePlayer = (player, client, message, sync = false) => {
  connection.query(
    "SELECT name  FROM " +
      database.prefix +
      "core_members WHERE name = '" +
      player +
      "'",
    function(error, results, fields) {
      if (error) {
        console.log(chalk.bgRed(`Database Query Error: ${error}`));
        message.member.send("The command failed to run. Try again.");
        return;
      } else {
        if (results.length) {
          webRequestToServer(player, message, "mute");
        } else {
          let messageToSend = "Could not find the specified player to mute.";
          message.member.send(messageToSend);
          return;
        }
      }
    }
  );
};

exports.banPlayer = (player, client, message, sync = false) => {
  connection.query(
    "SELECT name  FROM " +
      database.prefix +
      "core_members WHERE name = '" +
      player +
      "'",
    function(error, results, fields) {
      if (error) {
        console.log(chalk.bgRed(`Database Query Error: ${error}`));
        message.member.send("The command failed to run. Try again.");
        return;
      } else {
        if (results.length) {
          webRequestToServer(player, message, "ban");
        } else {
          let messageToSend = "Could not find the specified player to ban.";
          message.member.send(messageToSend);
          return;
        }
      }
    }
  );
};

exports.unbanPlayer = (player, client, message, sync = false) => {
  connection.query(
    "SELECT name  FROM " +
      database.prefix +
      "core_members WHERE name = '" +
      player +
      "'",
    function(error, results, fields) {
      if (error) {
        console.log(chalk.bgRed(`Database Query Error: ${error}`));
        message.member.send("The command failed to run. Try again.");
        return;
      } else {
        if (results.length) {
          webRequestToServer(player, message, "unban");
        } else {
          let messageToSend = "Could not find the specified player to unban.";
          message.member.send(messageToSend);
          return;
        }
      }
    }
  );
};

exports.unmutePlayer = (player, client, message, sync = false) => {
  connection.query(
    "SELECT name  FROM " +
      database.prefix +
      "core_members WHERE name = '" +
      player +
      "'",
    function(error, results, fields) {
      if (error) {
        console.log(chalk.bgRed(`Database Query Error: ${error}`));
        message.member.send("The command failed to run. Try again.");
        return;
      } else {
        if (results.length) {
          webRequestToServer(player, message, "unmute");
        } else {
          let messageToSend = "Could not find the specified player to unmute.";
          message.member.send(messageToSend);
          return;
        }
      }
    }
  );
};

webRequestToServer = function(results, message, actionToPerform) {
  let options = {
    method: "PUT",
    url: "http://home.nozemi.me:43596/players/" + results,
    body: JSON.stringify({
      action: actionToPerform,
      duration: "",
      reason: "",
      key: "insertApiKeyHere"
    })
  };
  request(options, function(error, response, body) {
    console.log("Body: " + body);
    if (error) throw new Error(error);

    if (response.statusCode == 201) {
      return message.member.send(body);
    }
    return message.member.send(body);
  });
};
