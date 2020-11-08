const Discord = require('discord.js');
const client = new Discord.Client();
module.exports = {
	name: 'ping',
	description: 'Get the bots ping',
	execute(message, args) {
		message.channel.send('Pong! | Bot Latency: ' + (new Date().getTime() - message.createdTimestamp) + 'ms | API Latency: ' + client.ws.ping);
	},
};