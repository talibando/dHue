module.exports = {
    token: 'bot_token', //Your Discord bot token
    bridgeIp: 'bridge_ip',  //The IP of your Hue Bridge
    bridgeUsername: 'bridge_username',  //The username you generated on your Hue Bridge
    apiTimeout: 15000,  //How long the API will wait before it times out, the default is 15 seconds
    whitelistOnly: false,   //If this is toggled only the person with the specified Owner ID can use commands, with the exception of help and ping
    whitelistID: [], //If ownerOnly is toggled, this is the Discord user ID of the user you want to be able to do all of the commands. This supports multiple ownerIDs
    botPrefix: '>'  //The prefix the bot will respond to
}
