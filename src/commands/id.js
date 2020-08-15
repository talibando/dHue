const config = require("../config/config.js");
let huejay = require('huejay');
const Discord = require('discord.js');
const axios = require('axios');

let hueclient = new huejay.Client({
    host: config.bridgeIp,
    username: config.bridgeUsername,
    timeout: config.apiTimeout,
});

module.exports = {
    name: 'id',
    description: "This command shows the IDs of all hue lights on your network.",
    execute(message, client, args, createErrorEmbed) {
        const {
            member,
            mentions
        } = message

        if (config.whitelistOnly)
            if (!config.whitelistID.includes(message.author.id)) return message.channel.send(createErrorEmbed("Only whitelisted people can do this."));
            hueclient.lights.getAll()
            .then(lights => {
                const lightvalues = [];
                lights.forEach(light => {
                    lightvalues.push(`[**${light.attributes.attributes.id}**]: ${light.attributes.attributes.name}`);
                });
                const embed = new Discord.MessageEmbed()
                    .setColor('#3F84E5')
                    .setTitle(`What are these?`)
                    .setDescription(`These are the IDs for all of the lights connected to your Hue bridge, you use these IDs to do commands on specific lights.`)
                    .setAuthor(`${client.user.tag}`, 'https://i.fiery.me/24csz.png')
                    .addField('Lights:', lightvalues.join('\n'))
                message.channel.send(embed)
            });
    }
}

function addZero(num) {
    var today = new Date();
    var hours = today.getHours();
    var minutes = today.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
}
