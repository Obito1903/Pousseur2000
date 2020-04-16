exports.run = (client, message, args) => {
    const guild = client.guildsList.get(message.guild.id);
    if (!guild.audioDispatcher) {
        message.channel.send('Nothing playing right now.');
    } else if (!guild.audioDispatcher.paused) {
        message.channel.send('Music already playing.');
    } else {
        guild.audioDispatcher.resume();
        message.channel.send('Playback resumed.');
    }
}