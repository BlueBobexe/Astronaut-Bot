const fs = require('fs');
const Discord = require('discord.js');
const mongoose = require('mongoose');
const config = require('./config.json');
const prefix = config.defaultprefix;

const client = new Discord.Client();
client.commands = new Discord.Collection();
client.mongoose = require('./utils/mongoose');

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

client.once('ready', () => {
	console.log('Astronaut Online!');
	client.user.setActivity(client.guilds.cache.size + config.status, { type: config.activitytype });
});

//Event Handler
fs.readdir('./events/', (err, files) => {
    if (err) return console.error;
    files.forEach(file => {
        if (!file.endsWith('.js')) return;
        const evt = require(`./events/${file}`);
        let evtName = file.split('.')[0];
        client.on(evtName, evt.bind(null, client));
    });
});

//Command Handler
client.on('message', (message, guild, member) => {
	//const serverid = message.guild.id;
	//const prefix = config.serverid;
	
	if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).trim().split(/ +/);
	const command = args.shift().toLowerCase();
	const logschannel = message.guild.channels.cache.find(ch => ch.name === 'logs');

	if (command === 'ping') {
		client.commands.get('ping').execute(message, args);
	}
	else if(command === 'help')
	{
		client.commands.get('help').execute(message, args);
	}
	else if(command === 'kick')
	{
		client.commands.get('kick').execute(message, args, logschannel, member);
	}

	else if(command === 'ban')
	{
		client.commands.get('ban').execute(message, args, logschannel, member);
	}
})

//welcome message
client.on('guildMemberAdd', (member, guild) => {
	const welcomechannel = member.guild.channels.cache.find(ch => ch.name === 'main-chat');
	if (!welcomechannel) return;

	if(!member.user.bot)
	{
        const welcomeEmbed = new Discord.MessageEmbed()
        .setColor('#7289DA')
        .setTitle('New Member! :wave:')
        .setDescription(`Welcome, ${member}, enjoy your stay! Please make sure to read <#714428593341726730>`)
        welcomechannel.send(welcomeEmbed);
	}

	//Join Log
	const logschannel = member.guild.channels.cache.find(ch => ch.name === 'logs');
	if(!logschannel) return;
	const joinlogembed = new Discord.MessageEmbed()
	.setColor('#a7e9af')
	.setTitle('Member Joined :wave:')
	.addField(`${member.user.tag} joined:`, `Account made at ${member.user.createdAt}`, false)
	logschannel.send(joinlogembed);
})

//Logging

//Ban Logs
client.on('guildBanAdd', async (guild, user) => {
	
	const logschannel = guild.channels.cache.find(ch => ch.name === 'logs');
	if(!logschannel) return;
	
	const fetchedLogs = await guild.fetchAuditLogs({
		limit: 1,
		type: 'MEMBER_BAN_ADD',
	});
	
	const banLog = fetchedLogs.entries.first();

	const { executor, target } = banLog;

	var banreason;

	

	const banlogembed = new Discord.MessageEmbed()
	.setColor('#bd574e')
        .setTitle('User Banned :rotating_light:')
		.addField(`${user.tag} was banned by ${executor.tag}:`, `${banLog.reason}`, false)
        logschannel.send(banlogembed);
});

//Unban Logs
client.on('guildBanRemove', async (guild, user) => {
	
	const logschannel = guild.channels.cache.find(ch => ch.name === 'logs');
	if(!logschannel) return;
	
	const fetchedLogs = await guild.fetchAuditLogs({
		limit: 1,
		type: 'MEMBER_BAN_REMOVE',
	});
	
	const unbanLog = fetchedLogs.entries.first();

	const { executor, target } = unbanLog;

	const unbanlogembed = new Discord.MessageEmbed()
	.setColor('#86e783')
        .setTitle('User Unbanned :rotating_light:')
		.addField(`${user.tag} was unbanned by ${executor.tag}:`, `No Reason Specified`, false)
        logschannel.send(unbanlogembed);
});

//Kick Logs
client.on('guildMemberRemove', async (member, guild, user) => {
	
	const logschannel = member.guild.channels.cache.find(ch => ch.name === 'logs');
	if(!logschannel) return;

	const fetchedLogs = await member.guild.fetchAuditLogs({
		limit: 1,
		type: 'MEMBER_KICK',
	});
	const kickLog = fetchedLogs.entries.first();

	const { executor, target } = kickLog;

	const kicklogembed = new Discord.MessageEmbed()
	.setColor('#bd574e')
    .setTitle('User Kicked :rotating_light:')
	.addField(`${member.user.tag} was kicked by ${executor.tag}:`, `${kickLog.reason}`, false)
	logschannel.send(kicklogembed);
});

//Delete Message Logs
client.on('messageDelete', async (message, guild, user) => {

	const logschannel = message.guild.channels.cache.find(ch => ch.name === 'logs');
	if(!logschannel) return;

	if (!message.guild) return;
	const fetchedLogs = await message.guild.fetchAuditLogs({
		limit: 1,
		type: 'MESSAGE_DELETE',
	});
	const deletionLog = fetchedLogs.entries.first();

	const fetchedLogs2 = await message.guild.fetchAuditLogs({
		limit: 1,
		type: 'MESSAGE_BULK_DELETE',
	});
	const bulkDeletionLog = fetchedLogs2.entries.first();

	const { executor, target } = deletionLog;

	if(deletionLog && !bulkDeletionLog)
	{
		const deletionlogembed = new Discord.MessageEmbed()
		.setColor('#bd574e')
        .setTitle('Message Deleted :wastebasket:')
		.addField(`Message by ${message.author.tag} was deleted in #${message.channel.name}:`, `${message.content}`, false)
		logschannel.send(deletionlogembed);
	}
	else if(bulkDeletionLog && deletionLog)
	{
		const bulkdeletionlogembed = new Discord.MessageEmbed()
		.setColor('#bd574e')
        .setTitle('Bulk Messages Deleted :wastebasket:')
		.addField(`Bulk messages deleted in #${message.channel.name}:`, `${bulkDeletionLog.count} messages deleted`, false)
		logschannel.send(bulkdeletionlogembed);
	}
});

client.mongoose.init();

client.login(config.token);