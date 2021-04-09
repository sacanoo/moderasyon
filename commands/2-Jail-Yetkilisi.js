const Discord = require("discord.js"),
client = new Discord.Client();
const db = require("quick.db");
const ayar = require("../ayarlar.js");

module.exports.run = async (client, message, args) => {
let prefix = ayar.prefix;
let salvoembed = new Discord.MessageEmbed().setColor(0x7997ff).setFooter(`Safe Code ❤ Salvatore`).setAuthor(message.author.username, message.author.avatarURL({dynamic: true}))

if(!message.member.hasPermission('MANAGE_ROLES')) return message.channel.send(salvoembed.setDescription(`Yetki yetersiz`))
if(!args[0]) return message.channel.send(salvoembed.setDescription(`**__Hatalı Kullanım;__**

${prefix}jail-yetkili ayarla @rol = Jail Yetkisi
${prefix}jail-yetkili sıfırla = Rolü sıfırlarsınız`))
if(args[0] === 'ayarla') {
var jailrol = message.mentions.roles.first() || message.guild.roles.cache.find(r => r.id == args[1])
if(!jailrol) return message.channel.send(salvoembed.setDescription(`Lütfen bir rol etiketleyiniz`))
db.set(`${message.guild.id}_jailyetkilisi`, jailrol.id)
message.channel.send(salvoembed.setDescription(`Jail Yetkilisi rolü başarılı bir şekilde ${jailrol} Olarak Ayarlandı`))
} else if(args[0] == 'sıfırla') {
if(!db.has(`${message.guild.id}_jailyetkilisi`)) return message.channel.send(salvoembed.setDescription(`Jail Yetkilisi rolü zaten ayarlı değil`)); else {
    db.delete(`${message.guild.id}_jailyetkilisi`)
    message.channel.send(salvoembed.setDescription(`Jail Yetkilisi rolü başarılı bir şekilde silindi`))
    } 
  }
};

exports.config = {
  name: "jail-yetkili",
  guildOnly: true,
  aliases: [],
};