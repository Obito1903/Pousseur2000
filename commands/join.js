exports.run = (client, message, args) => {
    const voiceChannel = message.member.voice.channel;
    if (!voiceChannel) return message.channel.send('Must be in a voice channel.');
    if (!message.guild) throw new Error('Unable to find discord server.');
    const voiceConnection = client.voice.connections.find(val => val.channel.guild.id === message.guild.id);
    if (!voiceConnection || force) {
        if (voiceChannel && voiceChannel.joinable) return voiceChannel.join();
        throw new Error('Unable to join your voice channel.');
    }
    message.channel.send('Joining voice channel.');
}