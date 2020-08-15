const axios = require('axios');
const Discord = require('discord.js');
const config = require("../config/config.js");

module.exports = {
    name: 'info',
    description: "This command gets info about the bot.",
    execute(message, client, args, createErrorEmbed) {
        const {
            member,
            mentions
        } = message
        
        
        var sendDate = (new Date()).getTime();
        axios.get('http://192.168.4.31/api/34bbtd7djQBAqRyZ52vMSvkWaMjPTFzRcOuBDTBs/').then(Response => {
        
        var receiveDate = (new Date()).getTime();
        var responseTimeMs = receiveDate - sendDate;

        let totalSeconds = (client.uptime / 1000)
        let days = Math.floor(totalSeconds / 86400)
        let hours = Math.floor(totalSeconds / 3600)
        totalSeconds %= 3600;
        let minutes = Math.floor(totalSeconds / 60)
        let seconds = Math.floor(totalSeconds % 60);
        
        let ownerUsers = [];
        config.ownerID.forEach(id => {
            ownerUsers.push(client.users.cache.find(u => u.id === id));
        })

        const embed = new Discord.MessageEmbed()

            .setColor('#3F84E5')
            .setTitle(`Bot Info`)
            .setDescription(`Some info about the bot.`)
            .setAuthor(`${client.user.tag}`, 'https://i.fiery.me/24csz.png')
            .setThumbnail('https://i.fiery.me/aIyxE.png')
            .setFooter(`${addZero(new Date)}`)
            .addField('Hue API Ping', `\`${responseTimeMs}ms\``, false)
            .addField('Bot Uptime', `\`${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds\``, false)
            .addField('Bot Prefix', `\`${config.botPrefix}\``, false)
            .addField('Owner Only Whitelisted Users', `\`${ownerUsers.map(o => o.tag).join(`, `)}\``, false)
        message.channel.send(embed)
        })
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