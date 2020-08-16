const Discord = require('discord.js');
const config = require("../config/config.js");

module.exports = {
    name: 'help',
    description: "This command shows all available commands.",
    execute(message, client, args, createErrorEmbed) {
        const {
            member,
            mentions
        } = message

        const embed = new Discord.MessageEmbed()
            .setColor('#3F84E5')
            .setTitle(`Prefix: \|| ${config.botPrefix} ||`)
            .setAuthor(`${client.user.tag}`, 'https://i.fiery.me/24csz.png')
            .setThumbnail('https://i.fiery.me/aIyxE.png')
            .setFooter(`${addZero(new Date)}`)
            .addFields(


                {
                    inline: false,
                    name: `To get started:`,
                    value: `Run the ID command, it will tell all of the ID's of your lights, this is important because we control the lights using the ID's.`

                }, {
                    inline: true,
                    name: `ID`,
                    value: `Gets all the ID's of lights on your network.  `
                }, {
                    inline: true,
                    name: `Light`,
                    value: `Displays info about a selected light.`
                }, {
                    inline: true,
                    name: `Hex`,
                    value: `Set's a light to a certain hex code color.`
                }, {
                    inline: true,
                    name: `Saturation`,
                    value: `Changes a lights saturation.`
                }, {
                    inline: true,
                    name: `Hue`,
                    value: `Changes a lights hue.`
                }, {
                    inline: true,
                    name: `Brightness`,
                    value: `Changes a light's brightness.`
                }, {
                    inline: true,
                    name: `Turn on`,
                    value: `Turns a light on.`
                }, {
                    inline: true,
                    name: `Turn off`,
                    value: `Turns a light off.`
                }, {
                    inline: true,
                    name: `\u200b`,
                    value: `\u200b`
                }
                
            )

        message.channel.send(embed)



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
