exports.run = (client, message, args) => {
    const guild = client.guildsList.get(message.guild.id);
    if (!guild.audioDispatcher) return message.channel.send('Nothing playing right now.');
    message.channel.send('Skipping song.');
    guild.audioDispatcher.end();
}