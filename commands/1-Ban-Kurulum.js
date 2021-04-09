const Discord = require("discord.js"),
client = new Discord.Client();
const db = require("quick.db");
const ayar = require("../ayarlar.js");
module.exports.run = async (client, message, args) => {

let salvoembed = new Discord.MessageEmbed().setColor(0x7997ff).setFooter(`Safe Code ❤ Salvatore`).setAuthor(message.author.username, message.author.avatarURL({dynamic: true}))
if(!message.member.hasPermission('BAN_MEMBERS')) return message.channel.send(salvoembed.setDescription(`Yetki yetersiz`))

message.channel.send(salvoembed.setDescription(`**__Ban Sistemi Kurulum__**

**1-) Ban Sistemi İçin Gerekli Ayarlar;**

• \`Ban Yetkilisi Rolü\`
• \`Ban Log Kanalı\`

**2-) Ban Sistemi Kurulum Adımları;**

➥ \`${ayar.prefix}ban-yetkili ayarla @rol\`
➥ \`${ayar.prefix}ban-kanal ayarla #kanal\`
---------------------------------------
➥ \`${ayar.prefix}ban-yetkili sıfırla\`
➥ \`${ayar.prefix}ban-kanal sıfırla\`

**3-) Ban Sistemine Dahil Komutlar;**

• \`${ayar.prefix}ban\`
• \`${ayar.prefix}unban\`
• \`${ayar.prefix}ban-bilgi\`
• \`${ayar.prefix}ban-kanal\`
• \`${ayar.prefix}ban-yetkili\`

\`1. Not:\` **sıfırla Komutları Ayarlamış Olduğunuz Rol/Kanal Sıfırlar**
\`2. Not:\` **Çalma! Kullan Dostum :)**`))


};

exports.config = {
  name: "ban-kurulum",
  guildOnly: true,
  aliases: [],
};