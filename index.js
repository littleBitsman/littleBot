const Discord = require('discord.js')
const bot = new Discord.Client()
const token ='NzA5ODIzMjQwMjY0MDg5NjEx.XvIZwA.r9PHAbDOmztFUyETEj7bODeA3zk';
const PREFIX = '/';
const embed = new Discord.MessageEmbed()
const ping = require('minecraft-server-util')
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
  let args = message.content.substring(PREFIX.length).split(' ')
  if(message.content.startsWith(PREFIX))
  switch (args[0]) {
    case 'testlittlebot':
      message.reply('I am online! Created by @littleBitsman.')
      break;

    case 'clear':
      if (!args[1]) return message.reply('the argument for messages to delete is missing. It should be a number.')
      message.delete()
      message.channel.bulkDelete(args[1]);
      message.reply(`I have successfully deleted ${args[1]} message(s).`)
      .then(msg => {
        msg.delete( {timeout: 3000})
      })
      break;
    case 'joinmcserver':
      var embed = new Discord.MessageEmbed()
        .setTitle('Join Minecraft Server:')
        .setColor(0xff000)
        .setDescription('This is the link to be whitelisted for the Minecraft server: https://forms.gle/XZhNGjANpEUbtqFP6.')
        .setAuthor('Written by @littleBitsman')
        message.channel.send(embed)
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
        .addField('testlittlebot', 'Check if I am online.')
        .addField('clear', 'Clear a specific amount of messages. Usage: /clear <messages to be deleted>. The limit is 100.')
        .addField('joinmcserver', 'Get the form to be whitelisted on the Minecraft server.')
        .addField('inviteme', 'Invite me to your server! Please not that I am not always online.')
        .addField('youtube', 'Look at @littleBitsman\'s Youtube channel.')
        .addField('help', 'Show this message for help!')
        .addField('mcserverstats', 'Check an MC servers: IP, version, status, online players, and max players. Usage: /mcserverstats <server IP> <server port>')
        .addField('applystaff', 'Apply for a staff rank!')
        .setAuthor('Written by @littleBitsman')
        message.author.send(embed)
        message.reply('help was sent in a DM.')
        break;
    case 'ping':
        if(!args[1]) return message.channel.send('You must type a Minecraft server IP')
        if(!args[2]) return message.channel.send('You must type a Minecraft server port')
        ping(args[1], parseInt(args[2]), (error, Response) =>{
          if(error) message.reply('I had trouble finding that server.')
          var embed = new Discord.MessageEmbed()
            .setTitle('Server Status: ' + args[1] + ':' + args[2])
            .addField('Server IP: ', Response.host)
            .addField('Server Version: ', Response.version)
            .addField('Online Players: ', Response.onlinePlayers)
            .addField('Max Players: ', Response.maxPlayers)
            message.channel.send(embed)
        })
      break;
    case 'applystaff':
      var embed = new Discord.MessageEmbed()
        .setTitle('Apply for Staff:')
        .setDescription('Apply for staff here: https://forms.gle/CXB3aYto1FW6d22K8')
        .setAuthor('Written by @littleBitsman')
        message.channel.send(embed)
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
          .setDescription('Hey ' + mentioned + '! You recieved this because of: ' + reason + '.')
        message.client.users.fetch(`${mentionID}`).then(user => user.send(messagetosend))
        message.delete()
        message.reply(`I successfully sent a ticket to ${mention}`)
        console.log(`Sent ticket to ${mention}`)
        break;
      }
      else
        message.reply('you do not have permission to use this command.')
      break;
}})
  bot.login(token);
