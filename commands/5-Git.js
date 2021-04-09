const Discord = require("discord.js"),
client = new Discord.Client();

module.exports.run = async (client, message, args) => {

    let embed = new Discord.MessageEmbed().setColor("RANDOM").setFooter(`Safe Code ♥ Salvatore`).setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true}))
    if(message.channel.id == ayar.genelsohbet) {
      message.delete();
    message.channel.send(embed.setDescription(`Lütfen Bu Komutu <#${ayar.komutkanalı}> Kanalında Kullanın`)).then(msg => msg.delete({timeout: 5000}));
    return;
  };   
    let kisi = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    if (!kisi) return message.channel.send(embed.setDescription("Bulunduğunuz Ses Kanalına Çekmek İstediğiniz Kullanıcıyı Etiketleyiniz")).then(x => x.delete({timeout: 10000}));
    if (!message.member.voice.channel || !kisi.voice.channel || message.member.voice.channelID == !kisi.voice.channelID) return message.channel.send(embed.setDescription("Belirtilen Kullanıcı İle Aynı Ses Kanalındasınız")).then(x => x.delete({timeout: 10000}));
    if (message.member.hasPermission("ADMINISTRATOR")) {
      await kisi.voice.setChannel(message.member.voice.channelID);
      message.react(tamamlandiemoji).catch();
    } else {
      message.channel.send(embed.setDescription(`${message.author}, Adlı Kullanıcı Sizi **${message.member.voice.channel.name}** Kanalına Çekmek İstiyor Kabul Ediyormusunuz?`)).then(async msj => {
        msj.react('👍').then(() => msj.react('👎'));
  
  const filter = (reaction, user) => {
      return ['👍', '👎'].includes(reaction.emoji.name) && user.id === kisi.id;
  };
  
  msj.awaitReactions(filter, { max: 1, time: 60000, errors: ['time'] })
      .then(collected => {
          const reaction = collected.first();
  
        if (reaction.emoji.name === '👍') {
        kisi.voice.setChannel(message.member.voice.channelID);
        const kabul = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true}))
        .setFooter(`Safe Code ♥ Salvatore`)
        .setDescription(`${kisi}, Adlı Kullanıcı Başarılı Bir Şekilde **${message.member.voice.channel.name}** Kanalına Taşındı`);
        msj.edit(kabul)
        msj.delete({timeout:10000})
        } else { 
        const reddet = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true}))
        .setFooter(`Safe Code ♥ Salvatore`)
        .setDescription(`${message.author}, ${kisi} Adlı Kullanıcı İsteğinizi Reddetti`);
        msj.edit(reddet)
        msj.delete({timeout:10000})
          }
      })    
  })
}
  
};

exports.config = {
  name: "git",
  guildOnly: true,
  aliases: ["git","git"],
};