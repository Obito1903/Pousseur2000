exports.run = (client, message, args) => {
    volume = args[0];
    if (isNaN(volume)) return message.channel.send('No volume specified.');
    if (volume < 0 || volume > 200) {
        return message.channel.send('Volume should be between 0 and 200.');
    }
    const guild = client.guildsList.get(message.guild.id);
    message.channel.send(`Setting volume to ${volume}.`);
    guild.defVolume = volume;
    if (guild.audioDispatcher) guild.audioDispatcher.setVolume(volume / 100);
}