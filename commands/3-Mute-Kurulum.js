const Discord = require("discord.js"),
client = new Discord.Client();
const db = require("quick.db");
const ayar = require("../ayarlar.js");
module.exports.run = async (client, message, args) => {

let salvoembed = new Discord.MessageEmbed().setColor(0x7997ff).setFooter(`Safe Code ❤ Salvatore`).setAuthor(message.author.username, message.author.avatarURL({dynamic: true}))
if(!message.member.hasPermission('BAN_MEMBERS')) return message.channel.send(salvoembed.setDescription(`Yetki yetersiz`))

message.channel.send(salvoembed.setDescription(`**__Mute Sistemi Kurulum__**

**1-) Mute Sistemi İçin Gerekli Ayarlar;**

• \`Mute Yetkilisi Rolü\`
• \`Chat Mute Rolü\`
• \`Ses Mute Rolü\`
• \`Mute Log Kanalı\`

**2-) Mute Sistemi Kurulum Adımları;**

➥ \`${ayar.prefix}mute-yetkili ayarla @rol\`
➥ \`${ayar.prefix}chat-mute-rol ayarla @rol\`
➥ \`${ayar.prefix}ses-mute-rol ayarla @rol\`
➥ \`${ayar.prefix}mute-kanal ayarla #kanal\`
---------------------------------------
➥ \`${ayar.prefix}mute-yetkili sıfırla\`
➥ \`${ayar.prefix}chat-mute-rol sıfırla\`
➥ \`${ayar.prefix}ses-mute-rol sıfırla\`
➥ \`${ayar.prefix}mute-kanal sıfırla\`

**3-) Mute Sistemine Dahil Komutlar;**

• \`${ayar.prefix}mute\`
• \`${ayar.prefix}mute-yetkili\`
• \`${ayar.prefix}chat-mute-rol\`
• \`${ayar.prefix}ses-mute-rol\`
• \`${ayar.prefix}mute-kanal\`

\`1. Not:\` **sıfırla Komutları Ayarlamış Olduğunuz Rolleri/Kanalları Sıfırlar**
\`2. Not:\` **Çalma! Kullan Dostum :)**`))


};

exports.config = {
  name: "mute-kurulum",
  guildOnly: true,
  aliases: [],
};