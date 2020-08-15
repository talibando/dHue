const config = require("../config/config.js");
let huejay = require('huejay');
const Discord = require('discord.js');

let hueclient = new huejay.Client({
    host: config.bridgeIp,
    username: config.bridgeUsername,
    timeout: config.apiTimeout,
});

module.exports = {
    name: 'saturation',
    description: "This command changes the saturation value.",
    execute(message, client, args, createErrorEmbed) {
        const {
            member,
            mentions
        } = message

        if (config.whitelistOnly)
            if (!config.whitelistID.includes(message.author.id)) return message.channel.send(createErrorEmbed("Only whitelisted people can do this."));
        const id = args[0];
        if (!id) return message.channel.send(createErrorEmbed("Please specify the id of a light."));
        if (isNaN(id)) return message.channel.send(createErrorEmbed("The id value must be a numeric value."));
        const parsedId = parseInt(id);
        const satVal = args[1];
        if (!satVal) return message.channel.send(createErrorEmbed("Please specify the saturation amount to set."));
        if (isNaN(satVal)) return message.channel.send(createErrorEmbed("The saturation value must be a numeric value."));
        const parsedsatVal = parseInt(satVal);
        if (parsedsatVal <= 0 || parsedsatVal > 65535) return message.channel.send(createErrorEmbed("The saturation value must be between 1 - 254."));

        hueclient.lights.getById(parsedId)
            .then(light => {
                light.on = true;
                light.hue = parsedsatVal;
                const embed = new Discord.MessageEmbed()
                    .setColor('#3F84E5')
                    .setTitle(`Light saturation`)
                    .setDescription(`Set **${light.name}** to a saturation of **${parsedsatVal}**.`)
                    .setAuthor(`${client.user.tag}`, 'https://i.fiery.me/24csz.png')
                    .setThumbnail('https://i.fiery.me/aIyxE.png')
                    .setFooter(`${addZero(new Date)}`)
                message.channel.send(embed)
                return hueclient.lights.save(light);

            })
            .catch(error => {
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
