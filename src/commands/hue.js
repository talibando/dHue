const config = require("../config/config.js");
let huejay = require('huejay');
const Discord = require('discord.js');

let hueclient = new huejay.Client({
    host: config.bridgeIp,
    username: config.bridgeUsername,
    timeout: config.apiTimeout,
});

module.exports = {
    name: 'hue',
    description: "This command changes the hue value of a light.",
    execute(message, client, args, createErrorEmbed) {
        const {
            member,
            mentions
        } = message

        if (config.whitelistOnly)
        if (!config.ownerID.includes(message.author.id)) return message.channel.send(createErrorEmbed("Only whitelisted people can do this."));
        const id = args[0];
        if (!id) return message.channel.send(createErrorEmbed("Please specify the id of a light."));
        if (isNaN(id)) return message.channel.send(createErrorEmbed("The id value must be a numeric value."));
        const parsedId = parseInt(id);
        const hueVal = args[1];
        if (!hueVal) return message.channel.send(createErrorEmbed("Please specify the hue amount to set."));
        if (isNaN(hueVal)) return message.channel.send(createErrorEmbed("The hue value must be a numeric value."));
        const parsedhueVal = parseInt(hueVal);
        if (parsedhueVal <= 0 || parsedhueVal > 65535) return message.channel.send(createErrorEmbed("The hue value must be between 1 - 65535."));

        hueclient.lights.getById(parsedId)
            .then(light => {
                light.on = true;
                light.hue = parsedhueVal;
                const embed = new Discord.MessageEmbed()
                    .setColor('#3F84E5')
                    .setTitle(`Light hue`)
                    .setDescription(`Set **${light.name}** to a hue of **${parsedhueVal}**.`)
                    .setAuthor(`${client.user.tag}`, 'https://i.fiery.me/24csz.png')
                    .setThumbnail('https://i.fiery.me/aIyxE.png')
                    .setFooter(`${addZero(new Date)}`)
                message.channel.send(embed)
                return hueclient.lights.save(light);
            })
            .catch(error => {
                console.log(error)
                const embed = new Discord.MessageEmbed()
                    .setColor('#d2797f')
                    .setTitle(`Error`)
                    .setDescription(`An error occured. Does a light exist with the ID **${parsedId}**?`)
                    .setAuthor(`${client.user.tag}`, 'https://i.fiery.me/ODMAw.png')
                    .setThumbnail('https://i.fiery.me/fgtL3.png')
                    .addFields(

                        {

                            name: 'Error Message:',
                            value: `\|| ${error} ||`

                        }

                    )
                    .setFooter(`${addZero(new Date)}`)
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