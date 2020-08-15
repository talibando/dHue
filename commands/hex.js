const config = require("../config/config.js");
let huejay = require('huejay');
const Discord = require('discord.js');
const axios = require('axios');
var converter = require('@q42philips/hue-color-converter');

let hueclient = new huejay.Client({
    host: config.bridgeIp,
    username: config.bridgeUsername,
    timeout: config.apiTimeout,
});

module.exports = {
    name: 'hex',
    description: "This command changes the light color to a hex value.",
    execute(message, client, args, createErrorEmbed) {
        const {
            member,
            mentions
        } = message

        if (config.ownerOnly)
            if (!config.ownerID.includes(message.author.id)) return message.channel.send(createErrorEmbed("Only the owner can do this."));
        if (isNaN(args[0]) || parseInt(args[0]) <= 0) {
            return message.channel.send(createErrorEmbed(`Please specify a light ID.`))
        }

        const messageArray = message.content.split(' ');
        const command = messageArray.slice(1);
        const hexCode = messageArray.slice(2)

        if (!args[1]) {
            return message.channel.send(createErrorEmbed(`Please specify a hex code!`));
        }
        const isValidHex = new RegExp('^#?([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$').test(hexCode);
        if (isValidHex) {

            axios.get(`https://www.thecolorapi.com/id?hex=${hexCode}`).then(Response => {

                if (!Response || !Response.data) return message.channel.send(createErrorEmbed("Sorry, couldn't convert the color. It might be invalid."));

                const data = (Response.data)
                const rvalue = JSON.parse(data.rgb.r)
                const gvalue = JSON.parse(data.rgb.g)
                const bvalue = JSON.parse(data.rgb.b)

                let xyvalues = converter.calculateXY(rvalue, gvalue, bvalue);

                axios.put(`http://192.168.4.31/api/faI8bilmeNIkJcQRcHKQz5BtNb36VFuz9T8gA6wz/lights/${args[0]}/state`, {

                    'xy': converter.calculateXY(rvalue, gvalue, bvalue)

                })


                hueclient.lights.getById(args[0])
                    .then(light => {
                        const embed = new Discord.MessageEmbed()
                            .setColor('#3F84E5')
                            .setTitle(`Hex Code`)
                            .setDescription(`Set **${light.name}** to a hex code of **${hexCode}**.`)
                            .setAuthor(`${client.user.tag}`, 'https://i.fiery.me/24csz.png')
                            .setThumbnail('https://i.fiery.me/aIyxE.png')
                            .setFooter(`${addZero(new Date)}`)
                        message.channel.send(embed)
                    })


            })
        } else {

            const embed = new Discord.MessageEmbed()
                .setColor('#d2797f')
                .setTitle(`Error`)
                .setDescription(`An error occured. Did you specify a valid hex code?`)
                .setAuthor(`${client.user.tag}`, 'https://i.fiery.me/ODMAw.png')
                .setThumbnail('https://i.fiery.me/fgtL3.png')
                .setFooter(`${addZero(new Date)}`)
            message.channel.send(embed)

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