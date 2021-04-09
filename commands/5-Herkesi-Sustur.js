const Discord = require("discord.js"),
client = new Discord.Client();
 

module.exports.run = async (client, message, args) => {
    let salvoembed = new Discord.MessageEmbed().setColor(0x7997ff).setFooter(`Safe Code ❤ Salvatore`).setAuthor(message.author.username, message.author.avatarURL({dynamic: true}))

if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(salvoembed.setDescription(`Bu komutu kullanmak için yeterli yetkin yok`)).then(m => m.delete({timeout: 10000}));
let channel = message.guild.channels.cache.get(args[0]) || message.member.voice.channel;
if (!channel) message.channel.send(salvoembed.setDescription(`Bir Kanal ID'si Belirtin yada Bir Kanala Katılın`)).then(m => m.delete({timeout: 10000}));
channel.members.filter((s) => !s.hasPermission("ADMINISTRATOR"))
.forEach((s, index) => {
  s.voice.setMute(true);
});
message.channel.send(salvoembed.setDescription(`\`${channel.name}\` Kanalındaki Herkes Başarılı Bir Şekilde Susturuldu`))
};

exports.config = {
  name: "herkesi-sustur",
  guildOnly: true,
  aliases: ["hs"],
};