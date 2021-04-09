const Discord = require("discord.js"),
client = new Discord.Client();

module.exports.run = async (client, message, args) => {


    const mapping = {
        " ": "",
        "0": "<a:sifir:817011588808310784>",
        "1": "<a:bir:817011587675979846>",
        "2": "<a:iki:817011588112187423>",
        "3": "<a:uc:817011588565434408>",
        "4": "<a:dort:817011588351524915>",
        "5": "<a:bes:817011587994877983>",
        "6": "<a:alti:817011584706019368>",
        "7": "<a:yedi:817011588325310506>",
        "8": "<a:sekiz:817011588640538624>",
        "9": "<a:dokuz:817011588263313459>",
        "!": ":grey_exclamation:",
        "?": ":grey_question:",
        "#": ":hash:",
        "*": ":asterisk:"
      };
      
      "abcdefghijklmnopqrstuvwxyz".split("").forEach(c => {
        mapping[c] = mapping[c.toUpperCase()] = `:regional_indicator_${c}:`;
      });
    
        if (!message.member.roles.cache.has("KULLANACAK YETKİLİ ROL İD") && !message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(new Discord.MessageEmbed().setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true})).addField(`Hatalı Kullanım` ,` Bu Komutu Kullanabilmeniz için Yeterli Yetkiniz Yok`).setColor(0x003366)).then(m => m.delete({timeout: 7000}));
            let voiceChannels = message.guild.channels.cache.filter(c => c.type === 'voice');
          let count = 0
          for (const [id, voiceChannel] of voiceChannels) count += voiceChannel.members.size
          let ses = `**Toplam Sesli Üye Sayısı:** \n  \`Sesli Üye:\` ` +
              `${count}` 
              .split("")
              .map(c => mapping[c] || c)
              .join("")
          let toplam = message.guild.memberCount;
          let sunucu = `**Toplam Üye Sayısı:  ** \n  \`Toplam Üye:\` ` +
              `${toplam}`
              .split("")
              .map(c => mapping[c] || c)
              .join(" ")
        let taglıs = message.guild.roles.cache.filter(x => x.id === 'TAGLI ÜYE ROL ID'); 
          let counts = 0
           for (const [id, taglı] of taglıs) counts += taglı.members.size
          let online = `**Toplam Taglı Üye Sayısı:** \n  \`Taglı Üye:\` ` +
              `${counts}`
              .split("")
              .map(c => mapping[c] || c)
              .join("")
          let booster = message.guild.roles.cache.filter(x => x.id === 'BOOSTER ÜYE ROL ID')
          let countss = 0
           for (const [id, boostere] of booster) countss += boostere.members.size
          let boosters = `**Toplam Booster Üye Sayısı:** \n  \`Booster Üye:\` ` +
              `${countss}`
              .split("")
              .map(c => mapping[c] || c)
              .join("")
           let kız = message.guild.roles.cache.filter(x => x.id === 'KIZ ÜYE ROL ID')
          let kızcıkks = 0
           for (const [id, kızzz] of kız) kızcıkks += kızzz.members.size
          let kızz = `**Toplam Kadın Üye Sayısı:** \n  \`Kadın Üye:\` ` +
              `${kızcıkks}`
              .split("")
              .map(c => mapping[c] || c)
              .join("")
           let erek = message.guild.roles.cache.filter(x => x.id === 'ERKEK ÜYE ROL ID')
          let countssssss = 0
           for (const [id, boostereeer] of erek) countssssss += boostereeer.members.size
          let erkek = `**Toplam Erkek Üye Sayısı:** \n  \`Erkek Üye:\` ` +
              `${countssssss}`
              .split("")
              .map(c => mapping[c] || c)
              .join("") 
         let onlinesayi = message.guild.members.cache.filter(
            only => only.presence.status != "offline"
          ).size;
          let aktif = `**Toplam Aktif Üye Sayısı:** \n  \`Online Üye:\` ` +
              `${onlinesayi}`
              .split("")
              .map(c => mapping[c] || c)
              .join(" ")
            const embed = new Discord.MessageEmbed()
            .setColor('BLACK')
            //.addField("Sunucudaki üye sayısı", message.guild.memberCount)
            .setDescription('**Sunucu İstatistikleri Aşağıda Sıralanmıştır**\n\n ' + sunucu + '\n \n' + online +  '\n \n' + ses + ' \n \n' + boosters +  ' \n \n' + kızz + ' \n \n' + erkek + ' \n \n' + aktif + '')
            .setFooter('Bu Mesaj 15 Saniye Sonra Silinecektir')
            .setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true}))
        
        //.(online)
          message.channel.send(embed).then(m => m.delete({timeout: 15000}));
          /*message.channel.send('Online sayısı: ' + 
            `${onlinesayi}`
              .split("")
              .map(c => mapping[c] || c)
              .join(" ")
          );*/
  
};

exports.config = {
  name: "say",
  guildOnly: true,
  aliases: [],
};