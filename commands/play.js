const ytdl = require('ytdl-core');

exports.run = async (client, message, args) => {
    try {
        if (!client.guilds.has(message.guild.id)) {
            client.guilds.set(message.guild.id, {
                id: message.guild.id,
                audioDispatcher: null,
                queue: new Array(),
                history: new Array(),
                volume: 50
            });
        }
        const guild = client.guilds.get(message.guild.id);

        client.commands.get('join').run(client, message, args);
        console.log('2');
        console.log('3');
    } catch (err) {
        console.log('Erreur play.js' + err);
    }
}