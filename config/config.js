module.exports = {
	token: 'NzQxMTUwMjY4MDc4NDI0MTk1.XyzX-Q.c7n_CPQKrcsVL5oN2m012emxHlY', //Your Discord bot token
	bridgeIp: '192.168.4.31',	//The IP of your Hue Bridge
	bridgeUsername: '34bbtd7djQBAqRyZ52vMSvkWaMjPTFzRcOuBDTBs',	//The username you generated on your Hue Bridge
	apiTimeout: 15000,	//How long the API will wait before it times out
	ownerOnly: false,	//If this is toggled only the person with the specified Owner ID can use commands, with the exception of help and ping
	ownerID: ['273629762084274188', '180280668239036416'],	//If ownerOnly is toggled, this is the Discord user ID of the user you want to be able to do all of the commands
	botPrefix: '>'	//The prefix the bot will respond to
}