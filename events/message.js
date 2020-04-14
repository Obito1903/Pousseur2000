module.exports = (client, message) => {
    // Ignore les message prevenant de bots
    if (message.author.bot) return;
    // Ignore les message sans prefix (in config.json)
    if (message.content.indexOf(client.config.prefix) !== 0) return;
    // Our standard argument/command name definition.
    const args = message.content.slice(client.config.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
    // Recupere les données depuis client.commands Enmap
    const cmd = client.commands.get(command);
    // Si la commande n'existe pas sort.
    if (!cmd) return;
    // Sinon execute la commande
    cmd.run(client, message, args);
};