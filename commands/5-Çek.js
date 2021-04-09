const Discord = require("discord.js"),
client = new Discord.Client();

module.exports.run = async (client, message, args) => {

    let embed = new Discord.MessageEmbed().setColor("RANDOM").setFooter(`Safe Code ♥ Salvatore`).setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true}))
    if(message.channel.id == ayar.genelsohbet) {
      message.delete();
    message.channel.send(embed.setDescription(`Lütfen Bu Komutu <#${ayar.komutkanalı}> Kanalında Kullanın`)).then(msg => msg.delete({timeout: 5000}));
    return;
  };   
    let uye = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    if (!uye) return message.channel.send(embed.setDescription("Bulunduğunuz Ses Kanalına Çekmek İstediğiniz Kullanıcıyı Etiketleyiniz")).then(x => x.delete({timeout: 7000}));
    if (!message.member.voice.channel || !uye.voice.channel || message.member.voice.channelID == !uye.voice.channelID) return message.channel.send(embed.setDescription("Belirtilen Kullanıcı İle Aynı Ses Kanalındasınız")).then(x => x.delete({timeout: 7000}));
    if (message.member.hasPermission("ADMINISTRATOR")) {
      await uye.voice.setChannel(message.member.voice.channelID);
      message.react(tamamlandiemoji).catch();
    } else {
      message.channel.send(embed.setDescription(`${message.author}, Adlı Kullanıcı Sizi **${message.member.voice.channel.name}** Kanalına Çekmek İstiyor Kabul Ediyormusunuz?`)).then(async msj => {
        msj.react('👍').then(() => msj.react('👎'));
  
  const filter = (reaction, user) => {
      return ['👍', '👎'].includes(reaction.emoji.name) && user.id === uye.id;
  };
  
  msj.awaitReactions(filter, { max: 1, time: 60000, errors: ['time'] })
      .then(collected => {
          const reaction = collected.first();
  
        if (reaction.emoji.name === '👍') {
        uye.voice.setChannel(message.member.voice.channelID);
        const ka = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true}))
        .setFooter(`Safe Code ♥ Salvatore`)
        .setDescription(`${uye}, Adlı Kullanıcı Başarılı Bir Şekilde **${message.member.voice.channel.name}** Kanalına Taşındı`);
        msj.edit(ka)
        msj.delete({timeout:7000})
        } else { 
        const kk = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true}))
        .setFooter(`Safe Code ♥ Salvatore`)
        .setDescription(`${message.author}, ${uye} Adlı Kullanıcı İsteğinizi Reddetti`);
        msj.edit(kk)
        msj.delete({timeout:7000})
          }
      })    
  })
}
  
};

exports.config = {
  name: "çek",
  guildOnly: true,
  aliases: ["çek","cek"],
};