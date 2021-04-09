const Discord = require("discord.js"),
client = new Discord.Client();
const qdb = require("quick.db");
const cdb = new qdb.table("cezalar");
const pdb = new qdb.table("puanlar");
const moment = require("moment");
const ayar = require("../ayarlar.js");
const emoji = require("../extra/emojiler.json");
module.exports.run = async (client, message, args) => {
let salvoembed = new Discord.MessageEmbed().setColor(0x7997ff).setAuthor(message.author.username, message.author.avatarURL({dynamic: true}))
let banyetkili = qdb.fetch(`${message.guild.id}_banyetkilisi`);
let bankanal = qdb.fetch(`${message.guild.id}_bankanal`);
if(!message.member.roles.cache.has(banyetkili) && !message.member.hasPermission('BAN_MEMBERS')) return message.channel.send(salvoembed.setDescription(`Yetki yetersiz`))
if(!qdb.has(`${message.guild.id}_banyetkilisi`)) return message.channel.send(salvoembed.setDescription(`**__Ban Yetkilisi Rolü Ayarlanmamış__**

\`Kurulum:\` **${ayar.prefix}ban-yetkili ayarla @rol**
\`Sıfırlama:\` **${ayar.prefix}ban-yetkili sıfırla**`)).then(m => m.delete({timeout: 10000})); else {
}
if(!qdb.has(`${message.guild.id}_bankanal`)) return message.channel.send(salvoembed.setDescription(`**__Ban Log Kanalı Ayarlanmamış__**

\`Kurulum:\` **${ayar.prefix}ban-kanal ayarla #kanal**
\`Sıfırlama:\` **${ayar.prefix}ban-kanal sıfırla**`)).then(m => m.delete({timeout: 10000})); else {
}
const user = message.guild.member(message.mentions.users.first()) || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find((user) => user.name === args[0]);
if (!args[0]) return message.channel.send(salvoembed.setDescription(`Lütfen Bir Kullanıcı Etiketleyiniz yada Bir ID Belirtiniz`))
let sebep = args.splice(1).join(" ") || 'Sebep Belirtilmedi';
let banmesaj = await message.channel.send(salvoembed.setDescription(`${emoji.yukleniyor} **Ban İşlemi Başlatıldı**

--------------------------------
• \`Kullanıcı:\` ${user}
• \`Kullanıcı ID:\` **${user.id}**
• \`Yetkili:\` ${message.author}
• \`Yetkili ID:\` **${message.author.id}**
• \`Sebep:\` **${sebep}**

${emoji.yukleniyor} **Emojilere Basarak İşleminizi Tamamlayabilirsiniz;**

• ⛔ : \`Ban (Yasakla)\`
• ❌ : \`İptal Et\`
--------------------------------
`))
banmesaj.react("⛔").then(() => banmesaj.react("❌"));
const filter = (reaction, user) => {
return(
    ["⛔","❌"].includes(reaction.emoji.name) &&
    user.id === message.author.id
);
}
banmesaj.awaitReactions(filter, {max: 1, errors: ["time"]})
.then((collected) => {
const reaction = collected.first();
if (reaction.emoji.name === "⛔") {
    banmesaj.edit(salvoembed.setDescription(`${user} İsimli Kullanıcı ${message.author} Tarafından **${sebep}** Sebebiyle Sunucudan Banlandı`))
    banmesaj.reactions.removeAll().catch(error => console.error("bir hata oluştu", error));
    message.react(emoji.tamamlandı);
    banİslem();
} else if(reaction.emoji.name === "❌") {
    message.react(emoji.iptal);
    banmesaj.delete();
}
})

const banİslem = async () => {
let cezaID = cdb.get(`cezaid.${message.guild.id}`)+1
cdb.add(`cezaid.${message.guild.id}`, +1);
cdb.push("ban", { id: user.id });
cdb.set(`punishments.${cezaID}.${message.guild.id}`, { mod: message.author.id, sebep: sebep, kisi: user.id, id: cezaID, zaman: Date.now(), komut: "Ban" });
cdb.push(`sicil.${user.id}.${message.guild.id}`, { mod: message.author.id, sebep: sebep, id: cezaID, zaman: Date.now(), komut: "Ban" });
pdb.add(`cezapuan.${user.id}.${message.guild.id}`, +15);
pdb.add(`banCez.${message.author.id}.${message.guild.id}`, +1);
pdb.add(`ban.${user.id}.${message.guild.id}`, +1);
qdb.add(`bansayısı.${message.guild.id}`, +1);
let bansayı = qdb.fetch(`bansayısı.${message.guild.id}`);
user.ban({reason: sebep});
client.channels.cache.get(bankanal).send(salvoembed.setDescription(`\`${bansayı || '0'}.\` **Ban Bilgisi**

• \`Kullanıcı:\` ${user}
• \`Kullanıcı ID:\` **${user.id}**
• \`Yetkili:\` ${message.author}
• \`Yetkili ID:\` **${message.author.id}**
• \`Sebep:\` **${sebep}**`))
};


};

exports.config = {
  name: "ban",
  guildOnly: true,
  aliases: [],
};