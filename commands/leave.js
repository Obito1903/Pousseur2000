exports.run = (client, message, args) => {
    const voiceConnection = client.voice.connections.find(val => val.channel.guild.id === message.guild.id);
    if (!voiceConnection) return message.channel.send('Not in a voice channel.');
    const guild = client.guildsList.get(message.guild.id);
    if (!guild.audioDispatcher) {
        return message.channel.send('Nothing playing right now.');
    }
    guild.audioDispatcher.pause();
    guild.audioDispatcher.destroy();
    guild.audioDispatcher = null;
    client.voice.connections.forEach(conn => {
        if (conn.channel.guild.id === message.guild.id) conn.disconnect();
    });
    message.channel.send('Leaving voice channel.');
}