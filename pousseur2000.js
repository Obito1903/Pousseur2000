const Discord = require("discord.js");
const Enmap = require("enmap");
const fs = require("fs");
//const yt = require('ytdl-core');

const config = require("./config.json");

const client = new Discord.Client();

client.config = config;
client.queue = {};

// Lit le contenu du dossier ./events/ et attache chaque fichier a sont evenement.
fs.readdir("./events/", (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
        //Si le fichier n'est pas un ".js" sort de la boucle.
        if (!file.endsWith(".js")) return;
        //Charge l'evenement lier au fichier
        const event = require(`./events/${file}`);
        //Recupere le nom de l'event depui le nom du fichier
        let eventName = file.split(".")[0];
        client.on(eventName, event.bind(null, client));
    });
});

client.commands = new Enmap();

fs.readdir("./commands/", (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
        //Si le fichier n'est pas un ".js" sort de la boucle.
        if (!file.endsWith(".js")) return;
        //Charge le fichier de commande
        let props = require(`./commands/${file}`);
        //Extrait le nom de la commande
        let commandName = file.split(".")[0];
        console.log(`Chargement de la commande ${commandName}`);
        client.commands.set(commandName, props);
    });
    console.log(client.commands);
});

client.login(config.token);