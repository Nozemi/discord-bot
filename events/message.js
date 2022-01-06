const settings = require('../settings.json').general;
const request = require("request");
const config = require("../config/keys");

module.exports = message => {
    let client = message.client;
    if (message.author.bot) return;
    if (!message.content) return;

    let perms = 0;
    if (message.guild != null) {
        perms = client.elevation(message);
    }

    if (message.content.startsWith(settings.prefix)) {
        let command = message.content.split(' ')[0].slice(settings.prefix.length);
        let params = message.content.split(' ').slice(1);
        let cmd;
        if (client.commands.has(command)) {
            cmd = client.commands.get(command);
        } else if (client.aliases.has(command)) {
            cmd = client.commands.get(client.aliases.get(command));
        }

        if (cmd) {
            if (message.guild != null) {
                message.delete();
            }
            if (perms < cmd.conf.permLevel) return message.reply(`You don't have permissions to run that command.`);
            cmd.run(client, message, params, perms);
        }

        return;
    }

    if (message.channel.id !== "416716485243961395") return;

    // TODO: Need to load these API tokens from the config file.

    let dialogflow_options = {
        method: 'GET',
        url: 'https://api.dialogflow.com/v1/query',
        qs: {
            v: '20170712',
            query: message.content,
            lang: 'en',
            timezone: 'Europe/Oslo',
            sessionId: message.author.id
        },
        headers: {
            'Cache-Control': 'no-cache',
            Authorization: 'Bearer ' + config.dialogflowToken
        }
    };

    request(dialogflow_options, function (error, response, body) {
        if (error) throw new Error(error);

        let responseData = JSON.parse(body);
        let responseText = responseData.result.fulfillment.speech;

        if (responseText !== "") {
            return message.reply(responseText);
        }

        let cleverbot_options = {
            method: 'GET',
            url: 'https://www.cleverbot.com/getreply',
            qs: {
                key: config.cleverbotToken,
                input: message.content,
                conversation_id: message.author.id
            }
        };

        request(cleverbot_options, function (error, response, body) {
            if (error) throw new Error(error);

            let responseData = JSON.parse(body);
            let responseText = decapitalizeFirstLetter(responseData.output);

            if (responseText !== "") {
                return message.reply(decapitalizeFirstLetter(responseText));
            }

            let defaultResponse = `I'm sleeping. Don't bother me now.`;
            return message.reply(defaultResponse);
        });
    });
};

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function decapitalizeFirstLetter(string) {
    if (string.charAt(0) === "I") return string;
    return string.charAt(0).toLowerCase() + string.slice(1);
}