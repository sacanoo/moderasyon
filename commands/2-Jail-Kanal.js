const Discord = require("discord.js"),
client = new Discord.Client();
const db = require("quick.db");
const ayar = require("../ayarlar.js");

module.exports.run = async (client, message, args) => {
let prefix = ayar.prefix;
let salvoembed = new Discord.MessageEmbed().setColor(0x7997ff).setFooter(`Safe Code ❤ Salvatore`).setAuthor(message.author.username, message.author.avatarURL({dynamic: true}))

if(!message.member.hasPermission('MANAGE_ROLES')) return message.channel.send(salvoembed.setDescription(`Yetki yetersiz`))
if(!args[0]) return message.channel.send(salvoembed.setDescription(`**__Hatalı Kullanım;__**

\`${prefix}jail-kanal ayarla #kanal\` = **Jail Log Kanalını Ayarlarsınız**
\`${prefix}jail-kanal sıfırla\` = **Jail Log Kanalını Sıfırlarsınız**`))
if(args[0] === 'ayarla') {
var jailkanal = message.mentions.channels.first()
if(!jailkanal) return message.channel.send(salvoembed.setDescription(`Lütfen Bir Kanal Etiketleyiniz`)); else {
db.set(`${message.guild.id}_jailkanal`, jailkanal.id)
message.channel.send(salvoembed.setDescription(`Jail Log Kanalı Başarılı Bir Şekilde ${jailkanal} Olarak Ayarlandı`))
}
} else if(args[0] === 'sıfırla') {
if(!db.has(`${message.guild.id}_jailkanal`)) return message.channel.send(salvoembed.setDescription(`Jail Log Kanalı Zaten Ayarlı Değil`)); else {
db.delete(`${message.guild.id}_jailkanal`)
message.channel.send(salvoembed.setDescription(`Jail Log Kanalı Başarılı Bir Şekilde Sıfırlandı`))
}
}
};

exports.config = {
  name: "jail-kanal",
  guildOnly: true,
  aliases: [],
};