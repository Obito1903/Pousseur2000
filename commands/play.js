const yt = require('ytdl-core');

exports.run = (client, message, args) => {
    let join = client.commands.get('join').run;
    let play = client.commands.get('join').run;
    let queue = client.queue;

    if (queue[message.guild.id] === undefined) return message.channel.send(`La queue est vide, faites d'abord ${client.config.prefix}add`);
    if (!message.guild.voice) return join(client, message, null).then(() => { client.commands.get('play').run(client, message, args) });
    if (queue[message.guild.id].playing) return message.channel.send('Deja en cour de lecture');
    let song = queue[message.guild.id].songs;
    console.log('reussi');
}