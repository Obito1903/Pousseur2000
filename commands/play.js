exports.run = (client, message, args) => {
    client.music.playFunction(message, args[0], force = false);
}