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
    name: 'light',
    description: "This command gets info about a specified light.",
    execute(message, client, args, createErrorEmbed) {
        const {
            member,
            mentions
        } = message


        if (config.whitelistOnly)
            if (!config.whitelistID.includes(message.author.id)) return message.channel.send(createErrorEmbed("Only whitelisted people can do this."));
        if (isNaN(args[0]) || parseInt(args[0]) <= 0) {
            return message.channel.send(createErrorEmbed(`Please specify a light ID!`))
        }
        hueclient.lights.getById(args[0])
            .then(light => {

                const embed = new Discord.MessageEmbed()
                    .setColor('#3F84E5')
                    .setTitle(`${light.name}`)
                    .setAuthor(`${client.user.tag}`, 'https://i.fiery.me/24csz.png')
                    .setThumbnail('https://i.fiery.me/aIyxE.png')
                    .setFooter(`${addZero(new Date)}`)
                    .addFields(


                        {
                            inline: true,
                            name: `Light Name`,
                            value: `${light.name}`

                        }, {
                            inline: true,
                            name: `Light Type`,
                            value: `${light.type}`
                        }, {
                            inline: true,
                            name: `ID`,
                            value: `${light.id}`
                        }, {
                            inline: true,
                            name: `Light On`,
                            value: `${light.on}`
                        }, {
                            inline: true,
                            name: `Hue`,
                            value: `${light.hue}`
                        }, {
                            inline: true,
                            name: `Saturation`,
                            value: `${light.saturation}`
                        }, {
                            inline: true,
                            name: `Brightness`,
                            value: `${light.brightness}`
                        },


                    )

                message.channel.send(embed)

            })

            .catch(error => {
                const embed = new Discord.MessageEmbed()
                    .setColor('#d2797f')
                    .setTitle(`Error`)
                    .setDescription(`An error occured. Does a light exist with the ID **${args[0]}**?`)
                    .setAuthor(`${client.user.tag}`, 'https://i.fiery.me/ODMAw.png')
                    .setThumbnail('https://i.fiery.me/fgtL3.png')
                    .setFooter(`${addZero(new Date)}`)
                    .addFields(

                        {

                            name: 'Error Message:',
                            value: `\|| ${error} ||`

                        }

                    )
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
