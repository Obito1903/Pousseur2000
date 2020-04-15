const ytdl = require('ytdl-core-discord');

exports.run = (client, message, args) => {
    let join = client.commands.get('join').run;
    let queue = client.queue;

    if (queue[message.guild.id] === undefined) return message.channel.send(`La queue est vide, faites d'abord ${client.config.prefix}add`);
    if (!message.guild.voice) return join(client, message, null).then(() => { client.commands.get('play').run(client, message, args) });
    if (queue[message.guild.id].playing) return message.channel.send('Déjà en cour de lecture');
    //let song = queue[message.guild.id].songs;
    let dispatcher;
    queue[message.guild.id].playing = true;
    (function play(song) {
        console.log(song);
        if (song === undefined) return message.channel.send('La queue est vide').then(() => {
            queue[message.guild.id].playing = false;
            message.member.voice.channel.leave();
        });
        message.channel.send(`Playing: **${song.title}** as requested by: **${song.requester}**`);
        dispatcher = message.guild.voice.connection.play(await ytdl(song.url), { type: 'opus' });
        let collector = message.channel.createMessageCollector(m => m);
        collector.on('message', m => {
            if (m.content.startsWith(tokens.prefix + 'pause')) {
                message.channel.send('paused').then(() => { dispatcher.pause(); });
            } else if (m.content.startsWith(tokens.prefix + 'resume')) {
                message.channel.send('resumed').then(() => { dispatcher.resume(); });
            } else if (m.content.startsWith(tokens.prefix + 'skip')) {
                message.channel.send('skipped').then(() => { dispatcher.end(); });
            } else if (m.content.startsWith('volume+')) {
                if (Math.round(dispatcher.volume * 50) >= 100) return message.channel.send(`Volume: ${Math.round(dispatcher.volume * 50)}%`);
                dispatcher.setVolume(Math.min((dispatcher.volume * 50 + (2 * (m.content.split('+').length - 1))) / 50, 2));
                message.channel.send(`Volume: ${Math.round(dispatcher.volume * 50)}%`);
            } else if (m.content.startsWith('volume-')) {
                if (Math.round(dispatcher.volume * 50) <= 0) return message.channel.send(`Volume: ${Math.round(dispatcher.volume * 50)}%`);
                dispatcher.setVolume(Math.max((dispatcher.volume * 50 - (2 * (m.content.split('-').length - 1))) / 50, 0));
                message.channel.send(`Volume: ${Math.round(dispatcher.volume * 50)}%`);
            } else if (m.content.startsWith(tokens.prefix + 'time')) {
                message.channel.send(`time: ${Math.floor(dispatcher.time / 60000)}:${Math.floor((dispatcher.time % 60000) / 1000) < 10 ? '0' + Math.floor((dispatcher.time % 60000) / 1000) : Math.floor((dispatcher.time % 60000) / 1000)}`);
            }
        });
        dispatcher.on('end', () => {
            collector.stop();
            play(queue[message.guild.id].songs.shift());
        });
        dispatcher.on('error', (err) => {
            return message.channel.send('error: ' + err).then(() => {
                collector.stop();
                play(queue[message.guild.id].songs.shift());
            });
        });
    })(queue[message.guild.id].songs);
    console.log('reussi');
}