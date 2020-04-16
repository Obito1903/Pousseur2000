exports.run = (client, message, args) => {

    try {
        const guild = client.guildsList.get(message.guild.id);
        if (guild.queue.length > 0) {
            const song = guild.queue[0];
            guild.queue.shift();

            if (song) return client.commands.get('_playNow').run(client, message, song);
            client.commands.get('stop').run(client, message, args);
            /*
            if (this.autoLeaveIn !== 0) {
                this.timeout = setTimeout(() => this.disconnectVoiceConnection(msg), this.autoLeaveIn);
            }
            */
            message.channel.send('Queue is empty, playback finished.');
        }
    } catch (err) {
        console.log('err' + err)
        client.voice.connections.forEach(conn => {
            if (conn.channel.guild.id === message.guild.id) conn.disconnect();
        });
    }
}