const yt = require('ytdl-core');

exports.run = (client, message, args) => {
    let url = args[0];
    console.log(typeof args[0] + url);
    if (url == '' || url === undefined) return message.channel.send(`You must add a YouTube video url, or id after ${client.config.prefix}add`);
    yt.getInfo(url, (err, info) => {
        if (err) return message.channel.send('Invalid YouTube Link: ' + err);
        if (!client.queue.hasOwnProperty(message.guild.id)) client.queue[message.guild.id] = {}, client.queue[message.guild.id].playing = false, client.queue[message.guild.id].songs = [];
        client.queue[message.guild.id].songs.url = url;
        client.queue[message.guild.id].songs.title = info.title;
        client.queue[message.guild.id].songs.requester = message.author.id;
        console.log(client.queue[message.guild.id]);
        message.channel.send(`added **${info.title}** to the queue`);
    });
}