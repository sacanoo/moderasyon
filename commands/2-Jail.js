const Discord = require("discord.js"),
client = new Discord.Client();
const qdb = require("quick.db");
const cdb = new qdb.table("cezalar");
const pdb = new qdb.table("puanlar");
const ayar = require("../ayarlar.js");
module.exports.run = async (client, message, args) => {
let salvoembed = new Discord.MessageEmbed().setColor(0x7997ff).setFooter(`Safe Code ❤ Salvatore`).setAuthor(message.author.username, message.author.avatarURL({dynamic: true}))
let jailyetkili = qdb.fetch(`${message.guild.id}_jailyetkilisi`);
let jailkanal = qdb.fetch(`${message.guild.id}_jailkanal`);
let jailrol = qdb.fetch(`${message.guild.id}_jailrol`);
let kayıtsızrol = qdb.fetch(`${message.guild.id}_kayıtsızrol`);
let boosterrol = qdb.fetch(`${message.guild.id}_boosterrol`);
if(!message.member.roles.cache.has(jailyetkili) && !message.member.hasPermission('BAN_MEMBERS')) return message.channel.send(salvoembed.setDescription(`Yetki yetersiz`))

if(!qdb.has(`${message.guild.id}_jailyetkilisi`)) return message.channel.send(salvoembed.setDescription(`**__Jail Yetkilisi Rolü Ayarlanmamış__**

\`Kurulum:\` **${ayar.prefix}jail-yetkili ayarla @rol**
\`Sıfırlama:\` **${ayar.prefix}jail-yetkili sıfırla**`)).then(m => m.delete({timeout: 10000})); else {
}
if(!qdb.has(`${message.guild.id}_jailrol`)) return message.channel.send(salvoembed.setDescription(`**__Jail Rolü Ayarlanmamış__**

\`Kurulum:\` **${ayar.prefix}jail-rol ayarla @rol**
\`Sıfırlama:\` **${ayar.prefix}jail-rol sıfırla**`)).then(m => m.delete({timeout: 10000})); else {
}
if(!qdb.has(`${message.guild.id}_kayıtsızrol`)) return message.channel.send(salvoembed.setDescription(`**__Kayıtsız Rolü Ayarlanmamış__**

\`Kurulum:\` **${ayar.prefix}jail-kayıtsız-rol ayarla @rol**
\`Sıfırlama:\` **${ayar.prefix}jail-kayıtsız-rol sıfırla**`)).then(m => m.delete({timeout: 10000})); else {
}
if(!qdb.has(`${message.guild.id}_boosterrol`)) return message.channel.send(salvoembed.setDescription(`**__Booster Rolü Ayarlanmamış__**

\`Kurulum:\` **${ayar.prefix}jail-booster-rol ayarla @rol**
\`Sıfırlama:\` **${ayar.prefix}jail-booster-rol sıfırla**`)).then(m => m.delete({timeout: 10000})); else {
}
if(!qdb.has(`${message.guild.id}_jailkanal`)) return message.channel.send(salvoembed.setDescription(`**__Ban Log Kanalı Ayarlanmamış__**

\`Kurulum:\` **${ayar.prefix}jail-kanal ayarla #kanal**
\`Sıfırlama:\` **${ayar.prefix}jail-kanal sıfırla**`)).then(m => m.delete({timeout: 10000})); else {
}

const user = message.guild.member(message.mentions.users.first()) || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find((user) => user.name === args[0]);
if (!args[0]) return message.channel.send(salvoembed.setDescription(`Lütfen Bir Kullanıcı Etiketleyiniz yada Bir ID Belirtiniz`))
let sebep = args.splice(1).join(" ") || 'Sebep Belirtilmedi';
let jailmesaj = await message.channel.send(salvoembed.setDescription(`**__Jail İşlemi Başlatıldı__**

• \`Kullanıcı:\` ${user}
• \`Yetkili:\` ${message.author}
• \`Sebep:\` **${sebep}**

**Emojilere Basarak İşleminizi Tamamlayabilirsiniz;**
• 🔒 : \`Jail (Cezalı)\`
• 🔓 : \`Unjail (Kayıtsız)\`
• ❌ : \`İptal Et\`
`))

jailmesaj.react("🔒").then(() => jailmesaj.react("🔓")).then(() => jailmesaj.react("❌"));
const filter = (reaction, user) => {
return(
    ["🔒","🔓","❌"].includes(reaction.emoji.name) &&
    user.id === message.author.id
);
}
jailmesaj.awaitReactions(filter, {max: 1, time: 120000, errors: ["time"]})
.then((collected) => {
const reaction = collected.first();
if (reaction.emoji.name === "🔒") {
    jailmesaj.edit(salvoembed.setDescription(`${user} İsimli kullanıcı **${sebep}** Nedeniyle ${message.author} Tarafından Cezalıya Atıldı`))
    jailmesaj.reactions.removeAll().catch(error => console.error("bir hata oluştu", error));
    jailIslem();
} else if (reaction.emoji.name === "🔓") {
    jailmesaj.edit(salvoembed.setDescription(`${user} İsimli kullanıcı **${sebep}** Nedeniyle ${message.author} Tarafından Cezalıdan Çıkarıldı`))
    jailmesaj.reactions.removeAll().catch(error => console.error("bir hata oluştu", error));
    unjailIslem();
} else if(reaction.emoji.name === "❌") {
    jailmesaj.delete();
  }
})

//JAİL
const jailIslem = async () => {
let cezaID = cdb.get(`cezaid.${message.guild.id}`)+1
cdb.add(`cezaid.${message.guild.id}`, +1);
cdb.push("jail", { id: user.id });
cdb.set(`punishments.${cezaID}.${message.guild.id}`, { mod: message.author.id, sebep: sebep, kisi: user.id, id: cezaID, zaman: Date.now(), komut: "Jail" });
cdb.push(`sicil.${user.id}.${message.guild.id}`, { mod: message.author.id, sebep: sebep, id: cezaID, zaman: Date.now(), komut: "Jail" });
pdb.add(`cezapuan.${user.id}.${message.guild.id}`, +15);
pdb.add(`jailCez.${message.author.id}.${message.guild.id}`, +1);
pdb.add(`jail.${user.id}.${message.guild.id}`, +1);

user.roles.set(user.roles.cache.has(boosterrol) ? [jailrol, boosterrol] : [jailrol]).catch(error => console.error("bir hata oluştu", error));
client.channels.cache.get(jailkanal).send(salvoembed.setDescription(`**__Bir Kullanıcı Cezalıya Atıldı__**

\`Kullanıcı:\` ${user}
\`Yetkili:\` ${message.author}
\`Sebep:\` **${sebep}**`))
};
//UNJAİL
const unjailIslem = async () => {
user.roles.remove(jailrol);
user.roles.add(kayıtsızrol);
client.channels.cache.get(jailkanal).send(salvoembed.setDescription(`**__Bir Kullanıcı Cezalıdan Çıkarıldı__**

\`Kullanıcı:\` ${user}
\`Yetkili:\` ${message.author}
\`Sebep:\` **${sebep}**`))
};
};

exports.config = {
  name: "jail",
  guildOnly: true,
  aliases: [],
};