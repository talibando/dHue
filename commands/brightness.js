const config = require("../config/config.js");
let huejay = require('huejay');
const Discord = require('discord.js');

let hueclient = new huejay.Client({
    host: config.bridgeIp,
    username: config.bridgeUsername,
    timeout: config.apiTimeout,
});

module.exports = {
    name: 'brightness',
    description: "This command changes the brightness value.",
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
        const brightnessVal = args[1];
        if (!brightnessVal) return message.channel.send(createErrorEmbed("Please specify the brightness value to set."));
        if (isNaN(brightnessVal)) return message.channel.send(createErrorEmbed("The brightness value must be a numeric value."));
        const parsedBrightnessVal = parseInt(brightnessVal);
        if (parsedBrightnessVal <= 0 || parsedBrightnessVal > 254) return message.channel.send(createErrorEmbed("The brightness value must be between 1 - 254."));

        hueclient.lights.getById(parsedId)
            .then(light => {
                light.brightness = parsedBrightnessVal;
                const embed = new Discord.MessageEmbed()
                    .setColor('#3F84E5')
                    .setTitle(`Light brightness`)
                    .setDescription(`Set **${light.name}** to **${parsedBrightnessVal}** brightness.`)
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