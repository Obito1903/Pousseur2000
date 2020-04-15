const cheerio = require('cheerio');
const axios = require('axios');

exports.run = (client, message, args) => {
    if (!message.channel.nsfw) return message.channel.send(`@${message.author.id} Vous n'etes pas dans un channel NSFW`);
    if (!args[0]) return message.channel.send(`@${message.author.id} Il n'y a pas d'argument. \`${client.config.prefix}help porngif\` pour plus d'info.`)
    axios.get('http://www.gifsfor.com/porngifs/' + args[0] + '/page/' + `${Math.floor((Math.random() * 3) + 0.1)}` + '/').then((res) => {

        const $ = cheerio.load(res.data);
        const gifs = [];
        $('.entry p a img').each(function (i, elem) {
            gifs[i] = $(this).attr('src');
        });
        message.channel.send(gifs[Math.floor(Math.random() * (gifs.length - 1)) + 1]);
    });
}