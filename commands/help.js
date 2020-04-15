const Discord = require('discord.js');
const fs = require("fs");

exports.run = (client, message, args) => {
    args[0] = args[0] || 'helpMain';
    fs.readdir("./commands/help/", (err, files) => {
        if (err) return console.error(err);
        files.forEach(file => {
            //Si le fichier n'est pas un ".json" sort de la boucle.
            if (!file.endsWith(".json")) return;
            let commandName = file.split(".")[0];
            if (args[0] === commandName) {
                let Embed = new Discord.MessageEmbed(require(`./help/${file}`).MessageEmbed);
                Embed.setTimestamp;
                message.channel.send(Embed);
            }
        });
    });
}