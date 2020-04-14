exports.run = (client, message, args) => {
    let deleteAmount = args[0] || 10;

    message.channel.bulkDelete(deleteAmount, true)
        .then(deleted => message.channel.send(`I deleted \`${deleted.size}\` messages.`))
        .catch(err => message.reply(`Something went wrong... ${err}`));
}