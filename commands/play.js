const ytdl = require('ytdl-core');

exports.run = async (client, message, args) => {
    try {
        if (!client.guildsList.has(message.guild.id)) {
            client.guildsList.set(message.guild.id, {
                id: message.guild.id,
                audioDispatcher: null,
                queue: new Array(),
                history: new Array(),
                volume: 50
            });
        }
        console.log('1');
        const guild = client.guildsList.get(message.guild.id);

        client.commands.get('join').run(client, message, args);
        client.commands.get('playNow').run(client, message, args);
    } catch (err) {
        console.log('Erreur play.js' + err);
    }
}