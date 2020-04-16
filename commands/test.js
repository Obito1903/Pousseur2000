const Discord = require("discord.js");

exports.run = (client, message, args) => {
    const embed = new Discord.MessageEmbed().setColor(this.color);
    embed.setDescription(`prout | ${null}`);
    console.log(embed);
    message.channel.send(embed);
}