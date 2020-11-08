const Discord = require('discord.js');
const client = new Discord.Client();
module.exports = {
	name: 'help',
	description: 'Get the bots commands',
	execute: async (message, args) => {
        
        const config = require('../config.json');
        const Guild = require('../models/guild');

        const settings = await Guild.findOne({
            guildID: message.guild.id
        });
    
        const prefix = settings.prefix;

        //Main help
        if(!args[0])
        {
            const helpEmbed = new Discord.MessageEmbed()
            .setColor('#7289DA')
            .setTitle('Astronaut Help')
            .setDescription('Do `' + prefix + 'help {command}` to get help on a command')
            .addField(`General`, '`ping`', false)
            .addField(`Moderator`, '`kick`, `ban`', false)
            .addField(`Admin`, '`prefix`', false)
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
            .addField(`Usage`, '`' + prefix + 'ping`', false)
            .addField(`Description`, `Get the bot's ping`, false)
            .addField(`Permission`, `N/A`, false)
            .setFooter(`Astronaut | Made by ${config.ownerTag}`)
            message.channel.send(helpPingEmbed);
        }

        //Kick Help
        if(args[0] === 'kick')
        {
            const helpKickEmbed = new Discord.MessageEmbed()
            .setColor('#7289DA')
            .setTitle('Astronaut Help')
            .setDescription('Kick')
            .addField(`Usage`, '`' + prefix + 'kick {user} {reason (optional)}`', false)
            .addField(`Description`, `Kick a user`, false)
            .addField(`Permission`, `KICK_MEMBERS`, false)
            .setFooter(`Astronaut | Made by ${config.ownerTag}`)
            message.channel.send(helpKickEmbed);
        }

        //Ban Help
        if(args[0] === 'ban')
        {
            const helpBanEmbed = new Discord.MessageEmbed()
            .setColor('#7289DA')
            .setTitle('Astronaut Help')
            .setDescription('Ban')
            .addField(`Usage`, '`' + prefix + 'ban {user} {reason (optional)}`', false)
            .addField(`Description`, `Get the bot's ping`, false)
            .addField(`Permission`, `BAN_MEMBERS`, false)
            .setFooter(`Astronaut | Made by ${config.ownerTag}`)
            message.channel.send(helpBanEmbed);
        }

        //Ban Help
        if(args[0] === 'prefix')
        {
            const helpPrefiEmbed = new Discord.MessageEmbed()
            .setColor('#7289DA')
            .setTitle('Astronaut Help')
            .setDescription('Prefix')
            .addField(`Usage`, '`' + prefix + 'prefix {prefix}`', false)
            .addField(`Description`, `Change the server's prefix`, false)
            .addField(`Permission`, `MANAGE_SERVER`, false)
            .setFooter(`Astronaut | Made by ${config.ownerTag}`)
            message.channel.send(helpPrefixEmbed);
        }
	},
};