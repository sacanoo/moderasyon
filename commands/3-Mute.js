const Discord = require("discord.js"),
client = new Discord.Client();
const qdb = require("quick.db");
const cdb = new qdb.table("cezalar");
const pdb = new qdb.table("puanlar");
const moment = require("moment");
const ms = require("ms");
const ayar = require("../ayarlar.js");
moment.locale("tr");
module.exports.run = async (client, message, args) => {
let salvoembed = new Discord.MessageEmbed().setColor(0x7997ff).setFooter(`Safe Code ❤ Salvatore`).setAuthor(message.author.username, message.author.avatarURL({dynamic: true}))
let muteyetkili = qdb.fetch(`${message.guild.id}_muteyetkilisi`);
let mutekanal = qdb.fetch(`${message.guild.id}_mutekanal`);
let chatmuterol = qdb.fetch(`${message.guild.id}_chatmuterol`);
let sesmuterol = qdb.fetch(`${message.guild.id}_sesmuterol`);
if(!message.member.roles.cache.has(muteyetkili) && !message.member.hasPermission('BAN_MEMBERS')) return message.channel.send(salvoembed.setDescription(`Yetki yetersiz`))

if(!qdb.has(`${message.guild.id}_muteyetkilisi`)) return message.channel.send(salvoembed.setDescription(`**__Mute Yetkilisi Rolü Ayarlanmamış__**

\`Kurulum:\` **${ayar.prefix}mute-yetkili ayarla @rol**
\`Sıfırlama:\` **${ayar.prefix}mute-yetkili sıfırla**`)).then(m => m.delete({timeout: 10000})); else {
}

if(!qdb.has(`${message.guild.id}_chatmuterol`)) return message.channel.send(salvoembed.setDescription(`**__Chat Mute Rolü Ayarlanmamış__**

\`Kurulum:\` **${ayar.prefix}chat-mute-rol ayarla @rol**
\`Sıfırlama:\` **${ayar.prefix}chat-mute-rol sıfırla**`)).then(m => m.delete({timeout: 10000})); else {
}

if(!qdb.has(`${message.guild.id}_sesmuterol`)) return message.channel.send(salvoembed.setDescription(`**__Ses Mute Rolü Ayarlanmamış__**

\`Kurulum:\` **${ayar.prefix}ses-mute-rol ayarla @rol**
\`Sıfırlama:\` **${ayar.prefix}ses-mute-rol sıfırla**`)).then(m => m.delete({timeout: 10000})); else {
}
if(!qdb.has(`${message.guild.id}_mutekanal`)) return message.channel.send(salvoembed.setDescription(`**__Mute Log Kanalı Ayarlanmamış__**

\`Kurulum:\` **${ayar.prefix}mute-kanal ayarla #kanal**
\`Sıfırlama:\` **${ayar.prefix}mute-kanal sıfırla**`)).then(m => m.delete({timeout: 10000})); else {
}

const user = message.guild.member(message.mentions.users.first()) || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find((user) => user.name === args[0]);
if (!args[0]) return message.channel.send(salvoembed.setDescription(`Lütfen Bir Kullanıcı Etiketleyiniz yada Bir ID Belirtiniz`))
const mutesure = args[1]
.replace(`sn`, `s`)
.replace(`dk`, `m`)
.replace(`sa`, `h`)
.replace(`g`, `d`);
if (!mutesure) return message.reply(salvoembed.setDescription(`Lütfen Mute Süresini Belirtin Örnek: \`${ayar.prefix}mute @kullanıcı <1sn/1dk/1sa/1g>\``));
let sebep = args.splice(2).join(" ") || 'Sebep Belirtilmedi!';
let salvosure = mutesure
.replace(`y`, " Yıl")
.replace(`d`, " Gün")
.replace(`h`, " Saat")
.replace(`m`, " Dakika")
.replace(`s`, " Saniye")
let mutemesaj = await message.channel.send(salvoembed.setDescription(`**__Mute İşlemi Başlatıldı__**

• \`Kullanıcı:\` ${user}
• \`Yetkili:\` ${message.author}
• \`Süre:\` **${salvosure}**
• \`Sebep:\` **${sebep}**

**Emojilere Basarak İşleminizi Tamamlayabilirsiniz;**
• 🔊 : \`Ses Mute\`
• 💬 : \`Chat Mute\`
• ❌ : \`İptal Et\`
`))

mutemesaj.react("🔊").then(() => mutemesaj.react("💬")).then(() => mutemesaj.react("❌"));
const filter = (reaction, user) => {
return(
    ["🔊","💬","❌"].includes(reaction.emoji.name) &&
    user.id === message.author.id
);
}
mutemesaj.awaitReactions(filter, {max: 1, time: 120000, errors: ["time"]})
.then((collected) => {
const reaction = collected.first();
if (reaction.emoji.name === "🔊") {
    mutemesaj.edit(salvoembed.setDescription(`${user} İsimli kullanıcıya ${message.author} Tarafından **${sebep}** Nedeniyle **${salvosure}** Ses Mute Atıldı`))
    mutemesaj.reactions.removeAll().catch(error => console.error("bir hata oluştu", error));
    sesMuteIslem();
} else if (reaction.emoji.name === "💬") {
    mutemesaj.edit(salvoembed.setDescription(`${user} İsimli kullanıcıya ${message.author} Tarafından **${sebep}** Nedeniyle **${salvosure}** Chat Mute Atıldı`))
    mutemesaj.reactions.removeAll().catch(error => console.error("bir hata oluştu", error));
    chatMuteIslem();
} else if(reaction.emoji.name === "❌") {
    mutemesaj.delete();
  }
})


//SES MUTE
const sesMuteIslem = async () => {
let vnick = user.displayName;
qdb.set(`sesmutenick_${user.id}_${message.guild.id}`, vnick);
if (user.displayName.startsWith("[Muteli]")) return;
user.setNickname(`[Muteli] ` + vnick);
user.roles.add(sesmuterol);
user.voice.setMute(true);
let cezaID = cdb.get(`cezaid.${message.guild.id}`)+1
cdb.add(`cezaid.${message.guild.id}`, +1);
cdb.set("voicemute", { id: user.id, bitis: Date.now()+ms(mutesure)});
cdb.set(`punishments.${cezaID}.${message.guild.id}`, { mod: message.author.id, sebep: sebep, kisi: user.id, id: cezaID, zaman: Date.now(), komut: "Ses Mute" });
cdb.push(`sicil.${user.id}.${message.guild.id}`, { mod: message.author.id, sebep: sebep, id: cezaID, zaman: Date.now(), komut: "Ses Mute" });
pdb.add(`cezapuan.${user.id}.${message.guild.id}`, +10);
pdb.add(`vmuteCez.${message.author.id}.${message.guild.id}`, +1);
pdb.add(`vmute.${user.id}.${message.guild.id}`, +1);
let nickk = qdb.fetch(`sesmutenick_${user.id}_${message.guild.id}`)
client.channels.cache.get(mutekanal).send(salvoembed.setDescription(`**__Bir Kullanıcıya Ses Mute Atıldı__**

• \`Susturulan Üye:\` ${user.toString()}
• \`Susturan Yetkili:\` ${message.author}
• \`Susturma Tarihi:\` ${moment(Date.now()).format("LLL")}
• \`Susturma Süresi:\` ${salvosure}
• \`Susturma Sebebi:\` ${sebep}
`))
setTimeout(function() {
    user.setNickname(nickk)
    qdb.delete(`sesmutenick_${user.id}_${message.guild.id}`)
    user.roles.remove(sesmuterol);
    user.voice.setMute(false);
    client.channels.cache.get(mutekanal).send(salvoembed.setDescription(`${user} İsimli Kullanıcının Ses Mute Süresi Bitti`));
  }, ms(mutesure));

};

//CHAT MUTE
const chatMuteIslem = async () => {
let knick = user.displayName;
qdb.set(`chatmutenick_${user.id}_${message.guild.id}`, knick);
if (user.displayName.startsWith("[Muteli]")) return;
user.setNickname(`[Muteli] ` + knick);
user.roles.add(chatmuterol);
let cezaID = cdb.get(`cezaid.${message.guild.id}`)+1
cdb.add(`cezaid.${message.guild.id}`, +1);
cdb.push("tempmute", { id: user.id, bitis: Date.now()+ms(mutesure) });
cdb.set(`punishments.${cezaID}.${message.guild.id}`, { mod: message.author.id, sebep: sebep, kisi: user.id, id: cezaID, zaman: Date.now(), komut: "Chat Mute" });
cdb.push(`sicil.${user.id}.${message.guild.id}`, { mod: message.author.id, sebep: sebep, id: cezaID, zaman: Date.now(), komut: "Chat Mute" });
pdb.add(`cezapuan.${user.id}.${message.guild.id}`, +10);
pdb.add(`cmuteCez.${message.author.id}.${message.guild.id}`, +1);
pdb.add(`cmute.${user.id}.${message.guild.id}`, +1);
let nickkk = qdb.fetch(`chatmutenick_${user.id}_${message.guild.id}`)
client.channels.cache.get(mutekanal).send(salvoembed.setDescription(`**__Bir Kullanıcıya Chat Mute Atıldı__**

• \`Susturulan Üye:\` ${user.toString()} 
• \`Susturan Yetkili:\` ${message.author}
• \`Susturma Tarihi:\` **${moment(Date.now()).format("LLL")}**
• \`Susturma Süresi:\` **${salvosure}**
• \`Susturma Sebebi:\` **${sebep}**`))

setTimeout(function() {
  user.setNickname(nickkk)
  qdb.delete(`chatmutenick_${user.id}_${message.guild.id}`)
    user.roles.remove(chatmuterol);
    client.channels.cache.get(mutekanal).send(salvoembed.setDescription(`${user} İsimli Kullanıcının Chat Mute Süresi Bitti`));
  }, ms(mutesure));

};
};


exports.config = {
  name: "mute",
  guildOnly: true,
  aliases: [],
};