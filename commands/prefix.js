
const Discord = require('discord.js');
const client = new Discord.Client();
const mongoose = require('mongoose');
const Guild = require('../models/guild');
const config = require('../config.json');

module.exports = {
    name: 'prefix',
    description: 'Sets the prefix for this server.',
    usage: `prefix <newPrefix>`,
    execute: async (message, args) => {
        
        if (!message.member.hasPermission('MANAGE_GUILD')) {
            message.reply('You do not have permission to use this command.');
        };

        const settings = await Guild.findOne({
            guildID: message.guild.id
        }, (err, guild) => {
            if (err) console.error(err)
            if (!guild) {
                const newGuild = new Guild({
                    _id: mongoose.Types.ObjectId(),
                    guildID: guild.id,
                    guildName: guild.name,
                    prefix: config.defaultPrefix,
                })

                newGuild.save()
                .then(result => console.log(result))
                .catch(err => console.error(err));

                return message.channel.send('This server was not in our database! We have added it, please retype this command.');
            }
        });

        if (args.length < 1) {
            return message.channel.send(`Your current server prefix is \`${settings.prefix}\``);
        };

        await settings.updateOne({
            prefix: args[0]
        });

        return message.channel.send(`Your server prefix has been updated to \`${args[0]}\``);
    }
}