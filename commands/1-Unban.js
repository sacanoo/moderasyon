const Discord = require("discord.js"),
client = new Discord.Client();
const db = require("quick.db");
module.exports.run = async (client, message, args) => {

let banyetkili = db.fetch(`${message.guild.id}_banyetkilisi`);

let salvoembed = new Discord.MessageEmbed().setColor(0x7997ff).setFooter(`Safe Code ❤ Salvatore`).setAuthor(message.author.username, message.author.avatarURL({dynamic: true}))
if(!message.member.roles.cache.has(banyetkili) && !message.member.hasPermission('BAN_MEMBERS')) return message.channel.send(salvoembed.setDescription(`Yetki yetersiz`))
const user = await client.users.fetch(args[0]);
if (!args[0]) return message.channel.send(salvoembed.setDescription(`Lütfen Bir Kullanıcı ID'si Belirtin`))
let sebep = args.splice(1).join(" ") || 'Sebep yok';

let banmesaj = await message.channel.send(salvoembed.setDescription(`**__Unban İşlemi Başlatıldı__**

\`Kullanıcı:\` ${user}
\`Yetkili:\` ${message.author}
\`Sebep:\` **${sebep}**

**Emojilere Basarak İşleminizi Tamamlayabilirsiniz;**
• ⛔ : \`Unban (Yasak Kaldır)\`
• ❌ : \`İptal Et\`
`))

banmesaj.react("⛔").then(() => banmesaj.react("❌"));
const filter = (reaction, user) => {
return(
    ["⛔","❌"].includes(reaction.emoji.name) &&
    user.id === message.author.id
);
}
banmesaj.awaitReactions(filter, {max: 1, time: 30000, errors: ["time"]})
.then((collected) => {
const reaction = collected.first();
if (reaction.emoji.name === "⛔") {
    banmesaj.edit(salvoembed.setDescription(`${user} İsimli kullanıcının yasaklaması **${sebep}** nedeni ile kaldırıldı`))
    banmesaj.reactions.removeAll().catch(error => console.error("bir hata oluştu", error));
    unbanİslem();
} else if(reaction.emoji.name === "❌") {
    banmesaj.delete();
}
})

const unbanİslem = async () => {
message.guild.members.unban(user.id).catch(error => message.channel.send(salvoembed.setDescription(`Belirtilen kullanıcı bulunamadı`)))
client.channels.cache.get("824709642625875969").send(salvoembed.setDescription(`**__Bir Kullanıcının Banı Kaldırıldı__**

Kullanıcı: <@!${user}>
Yetkili: ${message.author}
Sebep: ${sebep}`))
};


};

exports.config = {
  name: "unban",
  guildOnly: true,
  aliases: [],
};