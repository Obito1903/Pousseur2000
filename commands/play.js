const ytdl = require('ytdl-core');
const SearchEngine = require('./_playSearch')

const search = new SearchEngine()

exports.run = async (client, message, args) => {
    if (!args) return message.channel.send('No URL or query found.');

    if (!client.guildsList.has(message.guild.id)) {
        client.guildsList.set(message.guild.id, {
            id: message.guild.id,
            audioDispatcher: null,
            queue: new Array(),
            history: new Array(),
            volume: 50
        });
    }
    const guild = client.guildsList.get(message.guild.id);
    console.log(guild.queue);
    const voiceChannel = message.member.voice.channel;
    if (!voiceChannel) return message.channel.send('Must be in a voice channel.');

    try {
        let songs = await search.search(message, args.join(' '));

        if (songs.length + guild.queue.length > client.config.maxQueue) {
            if (songs.length === 1) return message.channel.send('Queue is full.');
            message.channel.send('Playlist has been shortened.');
            songs = songs.slice(0, client.config.maxQueue - guild.queue.length);
        }
        for (const song of songs) {
            song.requester = message.author.id;
            song.requesterAvatarURL = message.author.displayAvatarURL();
        }
        guild.queue = guild.queue.concat(songs);
        console.log(guild.queue);
        console.log(`[QUEUE] SERVERID:${message.guild.id} Added ${songs.length} songs.`);
        if (songs.length > 1) {
            message.channel.send(`Added to queue: ${songs.length} songs`);
        } else {
            message.channel.send(`Added to queue: [${songs[0].title}](${songs[0].url})`);
        }
        client.commands.get('join').run(client, message, args);
        if (!guild.audioDispatcher) client.commands.get('_playNext').run(client, message, args);
        //client.commands.get('join').run(client, message, args);
    } catch (err) {
        console.log('Erreur play.js ' + err);
    }
}