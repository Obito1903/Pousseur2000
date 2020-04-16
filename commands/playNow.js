const ytdl = require('ytdl-core');

exports.run = async (client, message, args) => {
    try {
        const guild = client.guildsList.get(message.guild.id);
        const voiceConnection = client.voice.connections.find(val => val.channel.guild.id === message.guild.id);

        const ytOptions = {
            filter: 'audioonly',
            quality: 'highestaudio',
            highWaterMark: 1 << 25
        };

        const dOptions = {
            volume: guild.volume / 100,
            bitrate: client.config.bitRate,
            passes: 3,
            type: 'opus',
            highWaterMark: 1
        }
        guild.audioDispatcher = voiceConnection.play(ytdl(args[0], ytOptions), dOptions);

    } catch (err) {
        console.log('Erreur playNow.js' + err);
    }
}