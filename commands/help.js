const Discord = require('discord.js');
const client = new Discord.Client();
module.exports = {
	name: 'help',
	description: 'Get the bots commands',
	execute(message, args) {
        
        const config = require('../config.json');

        //Main help
        if(!args[0])
        {
            const helpEmbed = new Discord.MessageEmbed()
            .setColor('#7289DA')
            .setTitle('Astronaut Help')
            .setDescription('Do `!help {command}` to get help on a command')
            .addField(`Ping`, `Gets the bot's ping`, false)
            .setFooter(`Astronaut | Made by ${config.ownerTag}`)
            message.channel.send(helpEmbed);
        }

        //Ping Help
        if(args[0] === 'ping')
        {
            const helpPingEmbed = new Discord.MessageEmbed()
            .setColor('#7289DA')
            .setTitle('Astronaut Help')
            .setDescription('Ping')
            .addField(`Usage`, '`!ping`', false)
            .addField(`Description`, `Get the bot's ping`, false)
            .setFooter(`Astronaut | Made by ${config.ownerTag}`)
            message.channel.send(helpPingEmbed);
        }
	},
};