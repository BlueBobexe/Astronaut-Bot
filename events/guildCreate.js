const mongoose = require('mongoose');
const config = require('../config.json');
const Guild = require('../models/guild');

module.exports = async (client, guild) => {
    guild = new Guild({
        _id: mongoose.Types.ObjectId(),
        guildID: guild.id,
        guildName: guild.name,
        prefix: config.defaultPrefix,
    })

    guild.save()
    .then(result => console.log(result))
    .catch(err => console.error(err));

    console.log('Bot has been added to a new server!');
}