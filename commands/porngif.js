exports.run = (client, message, args) => {
    if (!args[0]) return message.channel.send(`Il n'y a pas d'argument. "${client.config.prefix}help porngif" pour plus d'info.`)
    if (!message.channel.nsfw) return message.channel.send("Vous n'etes pas dans un channel NSFW");
    const Pornsearch = new client.ps.search(args[0]);
    Pornsearch.gifs(Math.floor(Math.random() * 5))
        .then(gifs => {
            if (args[1] === 'gif') return message.channel.send(gifs[Math.floor(Math.random() * (gifs.length - 1)) + 1].url);
            message.channel.send(gifs[Math.floor(Math.random() * (gifs.length - 1)) + 1].webm)
        });
}