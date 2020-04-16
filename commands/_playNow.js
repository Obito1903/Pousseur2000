const ytdl = require('ytdl-core-discord');

exports.run = async (client, message, args) => {
    try {
        const guild = client.guildsList.get(message.guild.id);
        const voiceConnection = client.voice.connections.find(val => val.channel.guild.id === message.guild.id);

        const dOptions = {
            volume: guild.volume / 100,
            bitrate: client.config.bitRate,
            passes: 3,
            type: 'opus',
            highWaterMark: 1
        }
        guild.audioDispatcher = voiceConnection.play(await ytdl(args.url), dOptions);
        if (guild.history[0] !== args) {
            guild.history.unshift(args);
            while (guild.history.length > client.config.maxHistory) guild.history.pop();
        }
        guild.audioDispatcher.on('speaking', (speaking) => {
            if (!speaking) {
                client.commands.get('_playNext').run(client, message, args);
            }
        });
    } catch (err) {
        console.log('Erreur playNow.js' + err);
        client.commands.get('_playNext').run(client, message, args)
    }
}