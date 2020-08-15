const config = require("./config/config.js");
const Discord = require('discord.js');
const client = new Discord.Client();
const prefix = config.botPrefix;
const fs = require('fs');
let huejay = require('huejay');

client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

client.on('ready', () => {
    console.log(`Sucessfully started ${client.user.tag}.`);
});

client.on('message', message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    // Error Embed Function
    const createErrorEmbed = (msg) => {
        return new Discord.MessageEmbed()
        .setColor('#d2797f')
        .setTitle(`Error`)
        .setDescription(msg)
        .setAuthor(`${client.user.tag}`, 'https://i.fiery.me/ODMAw.png')
        .setThumbnail('https://i.fiery.me/fgtL3.png')
        .setFooter(`${addZero(new Date)}`)
    }

    if (command === 'brightness') {
        client.commands.get('brightness').execute(message, client, args, createErrorEmbed);
    } else if (command === 'turn') {
        client.commands.get('turn').execute(message, client, args, createErrorEmbed);
    } else if (command === 'hue') {
        client.commands.get('hue').execute(message, client, args, createErrorEmbed);
    } else if (command === 'saturation') {
        client.commands.get('saturation').execute(message, client, args, createErrorEmbed);
    } else if (command === 'help') {
        client.commands.get('help').execute(message, client, args, createErrorEmbed);
    } else if (command === 'light') {
        client.commands.get('light').execute(message, client, args, createErrorEmbed);
    } else if (command === 'hex') {
        client.commands.get('hex').execute(message, client, args, createErrorEmbed);
    } else if (command === 'info') {
        client.commands.get('info').execute(message, client, args, createErrorEmbed);
    } else if (command === 'id') {
        client.commands.get('id').execute(message, client, args, createErrorEmbed);
    }   
});

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

client.login(config.token);