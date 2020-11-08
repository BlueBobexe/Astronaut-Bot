const Discord = require('discord.js');
const client = new Discord.Client();
module.exports = {
	name: 'ban',
	description: 'Ban a member',
	execute(message, args, logschannel, member) {
        
        if(message.member.hasPermission('BAN_MEMBERS'))
        {
            if(!logschannel) return;


            let whoBan = message.mentions.members.first();
            let banBy = message.author
            let banReason = args.slice(1).join(" ");
    
            if(banReason === "")
            {
                banReason = "No Reason Specified";
            }
    
            if(!args[0]) return message.reply('Please mention someone to kick');
            if(!whoBan) return message.reply(`"${args[0]}" is not a member.`);
    
            whoBan.ban(banReason)
    
            const banlogembed = new Discord.MessageEmbed()
            .setColor('#bd574e')
            .setTitle('User Banned :rotating_light:')
            .addField(`${whoBan} was banned by ${banBy.tag}:`, `${banReason}`, false)
            logschannel.send(banlogembed) && message.channel.send(banlogembed);
        }

        else{
            message.channel.reply('You do not have permission to use this command.');
        }
	},
};