exports.run = (client, message, args) => {
    const Discord = require('discord.js');
    if (!args[0]) {
        const Embed = new Discord.MessageEmbed()
            .setColor('#f5005e')
            .setTitle('Aide')
            .setAuthor('Pousseur2000', 'https://i.imgur.com/wSTFkRM.png', 'https://discord.js.org')
            .setDescription('Liste des commandes')
            .setThumbnail('https://i.imgur.com/wSTFkRM.png')
            .addFields(
                { name: ':information_source: Info', value: '`help`' },
                { name: ':underage: NSFW', value: '`porngif`' },
                { name: ':satellite_orbital: Test', value: '`ping`' },
                { name: ':wrench: Outils', value: '`reload`' }
            )
            .setTimestamp()
        message.channel.send(Embed);
    } else {
        const Embed = new Discord.MessageEmbed()
        switch (args[0]) {
            case 'help':
                Embed.setColor('#f5005e')
                    .setTitle('help')
                    .setDescription('Affiche la liste des commandes')
                    .addFields(
                        { name: 'Commande', value: '`help <commande>`' },
                    )
                break;
            case 'porngif':
                Embed.setColor('#f5005e')
                    .setTitle('porngif')
                    .setDescription('Affiche du cul !')
                    .addFields(
                        { name: 'Commande', value: '`porn <recherche>`' },
                        { name: 'option', value: '`gif` permet d\'afficher des gifs au lieu de webm', inline: true },
                    )
            default:
                break;
        }
        message.channel.send(Embed);
    }


}