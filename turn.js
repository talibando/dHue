const config = require("../config/config.js");
let huejay = require('huejay');
const Discord = require('discord.js');

let hueclient = new huejay.Client({
    host: config.bridgeIp,
    username: config.bridgeUsername,
    timeout: config.apiTimeout,
});

module.exports = {
    name: 'turn',
    description: "This command turns the light on or off.",
    execute(message, client, args, createErrorEmbed) {
        const {
            member,
            mentions
        } = message

        if (config.ownerOnly)
            if (!config.ownerID.includes(message.author.id)) return message.channel.send(createErrorEmbed("Only the owner can do this."));
        const id = args[0];
        if (!id) return message.channel.send(createErrorEmbed("Please specify the id of a light."));
        const parsedId = parseInt(id);
        const offoron = args[1];
        if (!offoron) return message.channel.send(createErrorEmbed("Please specify if you want the light on or off."));
        if (offoron.includes('off')) {

            hueclient.lights.getById(parsedId)
                .then(light => {

                    light.on = false;

                    const embed = new Discord.MessageEmbed()
                        .setColor('#3F84E5')
                        .setTitle(`Light status`)
                        .setDescription(`Set **${light.name}** to **off**.`)
                        .setAuthor(`${client.user.tag}`, 'https://i.fiery.me/24csz.png')
                        .setThumbnail('https://i.fiery.me/aIyxE.png')
                        .setFooter(`${addZero(new Date)}`)
                    message.channel.send(embed)
                    return hueclient.lights.save(light);

                }).catch(error => {
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

        } else {

            hueclient.lights.getById(parsedId)
                .then(light => {

                    light.on = true;

                    const embed = new Discord.MessageEmbed()
                        .setColor('#3F84E5')
                        .setTitle(`Light status`)
                        .setDescription(`Set **${light.name}** to **on**.`)
                        .setAuthor(`huecord®`, 'https://i.fiery.me/24csz.png')
                        .setThumbnail('https://i.fiery.me/aIyxE.png')
                        .setFooter(`${addZero(new Date)}`)
                    message.channel.send(embed)
                    return hueclient.lights.save(light);

                }).catch(error => {
                    console.log(error)
                    const embed = new Discord.MessageEmbed()
                        .setColor('#d2797f')
                        .setTitle(`Error`)
                        .setDescription(`An error occured. Does a light exist with the ID **${parsedId}**?`)
                        .setAuthor(`huecord®`, 'https://i.fiery.me/ODMAw.png')
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