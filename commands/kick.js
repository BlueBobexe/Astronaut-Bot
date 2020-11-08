const Discord = require('discord.js');
const client = new Discord.Client();
module.exports = {
	name: 'kick',
	description: 'Kick a member',
	execute(message, args, member) {
        
        const logschannel = message.guild.channels.cache.find(ch => ch.name === 'logs');

        if(message.member.hasPermission('KICK_MEMBERS'))
        {
            if(!logschannel) return message.reply('There is no logschannel setup!');
            
            let whoKick = message.mentions.members.first();
            let kickBy = message.author
            let kickReason = args.slice(1).join(" ");
            
            if(kickReason === "")
            {
                kickReason = "No Reason Specified";
            }

            if(!args[0]) return message.reply('Please mention someone to kick');
            if(!whoKick) return message.send(`"${args[0]}" is not a member.`);

            whoKick.kick(kickReason)

            const kicklogembed = new Discord.MessageEmbed()
	        .setColor('#bd574e')
            .setTitle('User Kicked :rotating_light:')
	        .addField(`${whoKick} was kicked by ${kickBy.tag}:`, `${kickReason}`, false)
	        logschannel.send(kicklogembed) && message.channel.send(kicklogembed);
        }

        else{
            message.reply('You do not have permission to use this command.');
        }
	},
};