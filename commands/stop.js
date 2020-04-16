exports.run = (client, message, args) => {
    const guild = client.guildsList.get(message.guild.id);
    if (!guild.audioDispatcher) {
        return message.channel.send('Nothing playing right now.');
    }
    guild.audioDispatcher.pause();
    guild.audioDispatcher.destroy();
    guild.audioDispatcher = null;
    message.channel.send('Playback stopped.');
    guild.queue = new Array();
    message.channel.send('Queue is now empty.');
}