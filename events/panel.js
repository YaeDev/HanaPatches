let { MessageEmbed, MessageButton, MessageActionRow } = require('discord.js')

function startPanel(client) {
            let pm = new MessageButton().setStyle("SUCCESS").setLabel("▶️ Tocar/Adicionar música").setCustomId("pm")
            let sm = new MessageButton().setStyle("DANGER").setLabel("🛑 Parar música").setCustomId("sm")
            let pause = new MessageButton().setStyle("PRIMARY").setLabel("⏯️ Pausar/Resumir").setCustomId("pause")
            let vol = new MessageButton().setStyle("PRIMARY").setLabel("🔉 Ajustar volume").setCustomId("vol")
            let filter = new MessageButton().setStyle("PRIMARY").setLabel("🎙️ Filtro/Autoplay").setCustomId("filter")
            let skm = new MessageButton().setStyle("PRIMARY").setLabel("⏩ Pular música").setCustomId("skip")
            let qy = new MessageButton().setStyle("PRIMARY").setLabel("🧾 Fila").setCustomId("queue")
            let rows = new MessageActionRow().addComponents(pm, sm, pause, qy)
            let rows2 = new MessageActionRow().addComponents(vol, filter, skm)
            
 let pc = client.guilds.cache.get(`991129159701114981`).channels.cache.get("991903403242438696")
 let mc = client.guilds.cache.get(`991129159701114981`).channels.cache.get("991134359853740063")
  
 let skip = 0
 let embed = new MessageEmbed()
 .setAuthor("Painel Hana", client.user.displayAvatarURL())
 .setDescription("O painel facilita tudo né? Use os botões abaixo para controlar sua música!")
 .setColor("#A616CD")

 let playembed = new MessageEmbed()
 pc.messages.fetch('991906349925535744').then(mesg => mesg.edit({content:'⠀',embeds: [embed], components:[rows, rows2]}).then(msg => {
   const queue = client.distube.getQueue(mesg)
   const filter = i => i.user.id === i.user.id;
    

          const collector = msg.createMessageComponentCollector(
                    {componentType:"BUTTON", filter: filter, max: 999}
                )
          let time;
          console.log(time)
          collector.on('collect', async(x) => {
            x.deferUpdate()
            let desc = "";
            let bot = client.guilds.cache.get(`991129159701114981`).members.cache.get(client.user.id)
            if (!x.member.voice.channel) desc = "Você precisa estar em um canal de voz para usar este botão!"
            const permissions = msg.channel.permissionsFor(msg.client.user)
          if (!permissions.has("CONNECT")) desc = "Não posso me conectar! Veja se tenho as permissões corretas!"
          if(bot.voice.channel && x.member.voice.channel.id != bot.voice.channel.id) desc = "Você não está conectado em meu canal!"
          if (!permissions.has("SPEAK")) desc = "Não posso falar! Veja se tenho as permissões corretas!"
          let errorembed = new MessageEmbed()
          .setAuthor("Erro", "https://cdn.discordapp.com/attachments/904534225552830505/990328595140452372/error.png")
          .setDescription(desc)
          .setColor('#A616CD')
          .setFooter('Se o erro persistir, abra um ticket!')
          if(desc != "") return pc.send({embeds: [errorembed]}).then(msg => { setTimeout(() => msg.delete(), 5000)})
            // Tocar //
            if(x.customId == "pm") {
              
        client.distube.voices.join(x.member.voice.channel)
        let mesg = await mc.send(`<:questionmark:990326809319067698> <@${x.user.id}>. Qual música deseja ouvir? Use links ou nome da música!`)
        const filter2 = collected => collected.author.id === x.user.id;
        	mesg.channel.awaitMessages({ filter: filter2, max: 1, time: 60000, errors: ['time'] })
          .then(async collected =>  {
            console.log(x.member)
            const response = collected.first().content
            let string = response
            if(string.toLowerCase().content == "cancelar") return mc.send("<:error:990306604035481690> Comando cancelado com sucesso!")
            collected.first().delete()
            try {
                client.distube.play(x.member.voice.channel, string, {
                  member: x.member,
                  textChannel: mesg,
                  msg
                })
                mesg.delete()
            } catch (e) {
                mc.send(`:x: Error\`${e}\``)
            }
            })
            }

            // Parar //
            if(x.customId == "sm") {
              let msg = await mc.send(`<:stop:990306597702082630> Música encerrada com sucesso!`)
              client.distube.stop(msg)
            }

            // Pausar/Resumir //
            if(x.customId == "pause") {
              let pause = new MessageButton().setStyle("PRIMARY").setLabel("⏸️ Pausar").setCustomId("ps")
              let res = new MessageButton().setStyle("PRIMARY").setLabel("▶️ Resumir").setCustomId("rs")
              let row = new MessageActionRow().addComponents(pause, res)
              mc.send({content: "<:questionmark:990326809319067698> Você deseja pausar ou resumir a música?", components: [row]}).then(msg => {
                const queue = client.distube.getQueue(msg)
               const filter = i => i.user.id === i.user.id;
    

          const collector = msg.createMessageComponentCollector(
                    {componentType:"BUTTON", filter: filter, max: 9}
                ) 
                
                collector.on('collect', async(x) => {
                  x.deferUpdate()
                  if(x.customId == "ps") {
                    client.distube.pause(msg)
                    mc.send("⏸️ Música pausada com sucesso!")
                  } else {
                    client.distube.resume(msg)
                    mc.send("▶️ Música resumida com sucesso!")
                  }
                })
            })
          }

          // Ajustar Volume //
          if(x.customId == "vol") {
            let mesg = await mc.send(`<:questionmark:990326809319067698> <@${x.user.id}>. Use um número de 0 a 100 para setar o volume!`)
          const filter2 = collected => collected.author.id === x.user.id;
        	mesg.channel.awaitMessages({ filter: filter2, max: 1, time: 60000, errors: ['time'] })
          .then(async collected =>  {
            console.log(x.member)
            const response = collected.first().content
            let volume = response
            collected.first().delete()
            if(volume.toLowerCase().content == "cancelar") return mc.send("<:error:990306604035481690> Comando cancelado com sucesso!")
            volume = Number(volume)
            if (isNaN(volume) || volume > 100) return mc.send("<:error:990306604035481690> Use um número de 0 a 100, o padrão é `50%`")
        try {
            client.distube.setVolume(msg, volume)
            mc.send("🔉 Volume ajustado para `" + volume + "%`" )
          } catch (e) {
            mc.send(`Error\`${e}\``)
        }
          })
        
          }

          // Filtro/Autoplay //
          if(x.customId == "filter") {
            let pause = new MessageButton().setStyle("PRIMARY").setLabel("⏩ Autoplay").setCustomId("ps")
            let res = new MessageButton().setStyle("PRIMARY").setLabel("🎙️ Filtro").setCustomId("rs")
            let row = new MessageActionRow().addComponents(pause, res)
            mc.send({content: "<:questionmark:990326809319067698> Você ativar o autoplay ou alterar o filtro da música?", components: [row]}).then(msg => {
              const queue = client.distube.getQueue(msg)
             const filter = i => i.user.id === i.user.id;
  

        const collector = msg.createMessageComponentCollector(
                  {componentType:"BUTTON", filter: filter, max: 1}
              ) 
              
              collector.on('collect', async(x) => {
                x.deferUpdate()
                
                if(x.customId == "ps") {
                  const mode = client.distube.toggleAutoplay(msg)
                  mc.send(`<:musical:990306602387140689> Autoplay ${(mode ? "ligado" : "desligado")} com sucesso!`)
                } else {
                  let mesg = await mc.send(`<:questionmark:990326809319067698> <@${x.user.id}>. Qual filtro deseja usar?! Use desligar para tirar o filtro atual.`)
          const filter2 = collected => collected.author.id === x.user.id;
        	mesg.channel.awaitMessages({ filter: filter2, max: 1, time: 60000, errors: ['time'] })
          .then(async collected =>  {
            console.log(x.member)
            const response = collected.first().content
            let volume = response
            collected.first().delete()
            if(volume.toLowerCase().content == "cancelar") return mc.send("<:error:990306604035481690> Comando cancelado com sucesso!")
            if(volume.toLowerCase().content == "desligar") {
              client.distube.setFilter(msg, queue.filter)
              return  mc.send(`<:filter:990306599329484820> Filtros desligados com sucesso!`)
            }
            else if(Object.keys(client.distube.filters).includes(volume)) client.distube.setFilter(msg, volume)
            mc.send(`<:filter:990306599329484820> Filtros trocados com sucesso! (Filtros: \`${queue.filters.join(", ")}\`)`)
          })
        
                }
                msg.delete()
              })
          })
        }

        // Skip //
         if(x.customId == "skip") {
          skip = skip + 1
          let bl = []
          let msg = await mc.send("Voto contabilizado com sucesso!")
          let queue = client.distube.getQueue(msg)
          let name = queue.songs[0].name

          let voiceMembers = bot.voice.channel.members.size - 2;
          if(bot.voice.channel.members.size == 3) {
          voiceMembers = bot.voice.channel.members.size - 1;
          }
          if(bot.voice.channel.members.size == 2) {
            client.distube.skip(msg)
           return mc.send(`⏩ Skipped!`)
          }
          msg.edit(`<:questionmark:990326809319067698> Skip? (${skip}/${voiceMembers})`)
          if(skip >= voiceMembers) {
            client.distube.skip(msg)
            skip = 0
           return mc.send(`⏩ Skipped!`)
          }
          setInterval(function() {
            const nqueue = client.distube.getQueue(msg)
            const nsong = nqueue.songs[0]
           const nname = nsong.name
           if(nname != name) return song = 0
          }, 1000)
        }

        // Queue //
        if(x.customId == "queue") {
          let msg = await mc.send("Carregando...")
          const queue = client.distube.getQueue(msg)
          if (!queue) return mc.send("<:error:990306604035481690> Não há músicas na fila!")
          let money = queue.songs
      money.length = 10;
      var finalLb = ""; 
      var i = 0;
      let indexnum = 0;
      for (i in money) {
  
      let song = queue.songs[0]
      finalLb += `${++indexnum}. ${money[i].name} [${money[i].formattedDuration}]\n\n`;
      }
          msg.edit(`\`\`\`css
Server Queue
  
⬐⬐⬐⬐⬐
Now playing: ${queue.songs[0].name} [${queue.songs[0].formattedDuration}]
Queue total duration: ${queue.formattedDuration}
⬑⬑⬑⬑⬑
  
${finalLb}\`\`\``,)
        }
          })
         })
        )
}


module.exports = {
  startPanel
}