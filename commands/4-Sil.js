const Discord = require("discord.js"),
client = new Discord.Client();

module.exports.run = async (client, message, args) => {
    
let salvoembed = new Discord.MessageEmbed().setColor("RANDOM").setFooter(`Safe Code ♥ Salvatore`).setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true}))
if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(salvoembed.setDescription(`Bu komudu kullanmak için gerekli izinlere sahip değilsin.`)).then(x => x.delete({timeout: 10000}));
if(!args[0] || (args[0] && isNaN(args[0])) || Number(args[0]) < 1 || Number(args[0]) > 100) return message.channel.send(salvoembed.setDescription(`1-100 Arasında Silinecek Bir Değer Giriniz`)).then(m => m.delete({timeout: 7000}));
await message.delete().catch();
message.channel.bulkDelete(Number(args[0])).then(mesajlar => message.channel.send(salvoembed.setDescription(`Başarılı Bir Şekilde ${mesajlar.size} Adet Mesaj Silindi`))).then(m => m.delete({timeout: 7000}));

};

exports.config = {
  name: "sil",
  guildOnly: true,
  aliases: [],
};