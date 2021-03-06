const Discord = require('discord.js')
const bot = new Discord.Client()
const PREFIX = '/';
const ping = require('minecraft-server-util')
const weather = require('weather-js')
bot.on('ready', async () => {
  console.log('This bot is online! Created by @littleBitsman.');
  let statuses = [
     `Use ${PREFIX}help for help!`,
     'Made by @littleBitsman',
     `Online on ${bot.guilds.cache.size} Servers`
  ]
  setInterval(function() {
    let status = statuses[Math.floor(Math.random() * statuses.length)]
    bot.user.setActivity(status, {type: ''})
  }, 3000)
})

bot.on('message', message => {
  if (message.channel.type === 'dm') {return}
  let args = message.content.substring(PREFIX.length).split(' ')
  if(message.content.startsWith(PREFIX))
  switch (args[0]) {
    case 'testlittlebot':
      message.reply('I am online! Created by @littleBitsman.')
      break;

    case 'clear':
      if (!message.guild.member(message.author).hasPermission('MANAGE_MESSAGES')) return message.reply(':x: You do not have permission to use this command. Required permssion: MANAGE_MESSAGES')
      if (!args[1]) return message.reply('the argument for messages to delete is missing. It should be a number.')
      message.delete()
      message.channel.bulkDelete(args[1]);
      message.reply(`I have successfully deleted ${args[1]} message(s).`)
      .then(msg => {
        msg.delete( {timeout: 3000})
      })
      break;
    case 'inviteme':
      var embed = new Discord.MessageEmbed()
        .setTitle('Invite Me!:')
        .setColor(0xff0000)
        .setDescription('Invite me to your server using this link: https://discordapp.com/oauth2/authorize?client_id=709823240264089611&scope=bot&permissions=2146958590.')
        .setAuthor('Written by @littleBitsman')
        message.channel.send(embed)
        break;
    case 'youtube':
      var embed = new Discord.MessageEmbed()
        .setTitle('Youtube Channel:')
        .setColor(0xff0000)
        .setDescription('@littleBitsman\'s Youtube channel link is https://www.youtube.com/channel/UC7nD2OnVEMV7UxuSGo7cydQ.')
        .setAuthor('Written by @littleBitsman')
        message.channel.send(embed)
        break;
    case 'help':
      var embed = new Discord.MessageEmbed()
        .setTitle('Help:')
        .setColor(0xff0000)
        .addField('Prefix:', PREFIX)
        .addField('clear', 'Clear a specific amount of messages. Usage: /clear <messages to be deleted>. The limit is 100. Reqiures permission: MANAGE_MESSAGES')
        .addField('inviteme', 'Invite me to your server! Please not that I am not always online.')
        .addField('youtube', 'Look at @littleBitsman\'s Youtube channel.')
        .addField('help', 'Show this message for help!')
        .addField('ping', 'Check a Minecraft server\'s: IP, version, status, online players, and max players. Usage: /ping <server IP> <server port>')
        .addField('ticket', 'Send a ticket in a DM to somebody. Reqiures permission: ADMINISTRATOR')
        .setAuthor('Written by @littleBitsman')
        message.author.send(embed)
        message.reply('help was sent in a DM.')
        break;
    case 'ping':
        if(!args[1]) return message.channel.send('You must type a Minecraft server IP')
        if(!args[2]) return message.channel.send('You must type a Minecraft server port')
        message.channel.send(`Attempting to ping ${args[1]} at port ${args[2]}.`)
        ping(args[1], parseInt(args[2]), (error, Response) =>{
          if(error) message.reply('I had trouble finding that Minecraft server. Is it online? ')
          else message.channel.send('Received stats, now showing...')
          var embed = new Discord.MessageEmbed()
            .setTitle(`Server Stats of: ${args[1]} at port ${args[2]}`)
            .addField('Server IP: ', Response.host)
            .addField('Server Version: ', Response.version)
            .addField('Online Players: ', Response.onlinePlayers)
            .addField('Max Players: ', Response.maxPlayers)
            message.channel.send(embed)
        })
      break;
    case 'ticket':
      if (message.member.hasPermission(['ADMINISTRATOR'])) {
        mention = message.mentions.users.first()
        mentioned = args[1]
        args.splice(0,2)
        var reason = args.join(' ')
        if(mention === null) {message.reply('you didn\'t mention the user to warn!')}
        mentionID = mention.id
        var messagetosend = new Discord.MessageEmbed()
          .setTitle('Ticket')
          .setDescription(`Hey ${mentioned}! You recieved this because of: ${reason}.`)
        message.client.users.fetch(`${mentionID}`).then(user => user.send(messagetosend))
        message.delete()
        message.reply(`I successfully sent a ticket to ${mention}`)
        console.log(`Sent ticket to ${mention}`)
        break;
      }
      else
        message.reply('you do not have permission to use this command.')
      break;
    case 'weather':
      weather.find({search: `city, ${args[args.length - 1]}`, degreeType: 'F'}, function(err, result) {
              if(err) console.log(err);
              var currentw = new Discord.MessageEmbed()
                .setTitle(`Current Weather in ${args[1]} in state ${args[2]}`)
                .addField('Temperature', result[0].current.temperature)
                .addField('Sky Text', result[0].current.skytext)
                .addField('Humidity', result[0].current.humidity)
                .addField('Wind Speed & Direction', result[0].current.winddisplay)
                .addField('Feels Like', result[0].current.feelslike)
                .addField('Location', result[0].current.observationpoint)
                .addField('Time', result[0].current.observationtime)
                .addField('Date', result[0].current.date)
              message.channel.send(currentw)
            });
}})
  bot.login(TOKEN);
