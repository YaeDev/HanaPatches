//UPTIME CALLBACK

let { MessageEmbed, MessageButton, MessageActionRow } = require('discord.js')

const http = require('http');
const DisTube = require('distube')
const fs = require('fs')
const express = require('express');
const app = express();
var server = http.createServer(app);
const Discord = require("discord.js")
const { Intents, Collection, Client } = require("discord.js")
const mongoose = require('mongoose')
    mongoose.connect(`mongodb+srv://ver:dtt2001@cluster0.ie9yy.mongodb.net/NightEmpire?retryWrites=true&w=majority`, {useNewUrlParser: true, useUnifiedTopology: true });
  
    var dbs = mongoose.connection;
  
    dbs.on("error", console.error.bind(console, "connection error:"));
  
    dbs.once("open", function() {
      console.log("Connection To MongoDB Atlas Successful!");
    });
const Command = require("./structures/Command.js");
      const intents = new Discord.Intents(643);
const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
    Intents.FLAGS.GUILD_WEBHOOKS,
    Intents.FLAGS.GUILD_VOICE_STATES,
    Intents.FLAGS.GUILD_INVITES,
    Intents.FLAGS.GUILD_BANS,
    Intents.FLAGS.GUILD_VOICE_STATES
]});
const db = require('quick.db')
const moment = require('moment')
const { prefix, token, YTCK } = require('./config.json');
let ms = require("parse-ms")
app.get("/", (request, response) => {
const ping = new Date();
ping.setHours(ping.getHours() - 3);
console.log(`Ping foi entregue ás ${ping.getUTCHours()}:${ping.getUTCMinutes()}:${ping.getUTCSeconds()}`);
response.sendStatus(200);
});
app.listen(process.env.PORT);
const { Structures } = require('discord.js');
const path = require('path');
const { loadSlashCommands } = require("./handler/handler")
const { startPanel } = require("./events/panel")
client.commands = new Collection();
client.slash = new Collection();


let pc;
let mc;



//CHAGELOG//
client.on("ready", async() => { 
  const user = await client.users.fetch("700805591094001692")
  client.user.setActivity("Criado por " + user.tag)
  pc = client.guilds.cache.get(`991129159701114981`).channels.cache.get("991903403242438696")
  mc = client.guilds.cache.get(`991129159701114981`).channels.cache.get("991134359853740063")
  startPanel(client)
})
  

const filters = require("./filters.json")

client.distube = new DisTube.default(client, {
    searchSongs: 10,
    leaveOnEmpty: true,
    customFilters: filters,
})

const status = (queue) => `Volume: \`${queue.volume}%\` Filter: \`${queue.filter || "Off"}\` | Loop: \`${queue.repeatMode ? queue.repeatMode === 2 ? "Queue" : "Song" : "Off"}\` | Autoplay: \`${queue.autoplay ? "On" : "Off"}\``

client.distube
  .on("disconnect", (queue, message) => {
  let embed = new MessageEmbed()
  .setAuthor("Painel Hana", client.user.displayAvatarURL())
  .setDescription("O painel facilita tudo né? Use os botões abaixo para controlar sua música!")
  .setColor("#A616CD")
  let endembed = new MessageEmbed()
  .setAuthor(`Música finalizada`, "https://cdn.discordapp.com/attachments/904534225552830505/990328518426656829/stop.png")
  .setDescription("Todas as músicas adicionadas foram tocadas com sucesso!")
  let pm = new MessageButton().setStyle("SUCCESS").setLabel("▶️ Tocar/Adicionar música").setCustomId("pm")
  let sm = new MessageButton().setStyle("DANGER").setLabel("🛑 Parar música").setCustomId("sm")
  let pause = new MessageButton().setStyle("PRIMARY").setLabel("⏯️ Pausar/Resumir").setCustomId("pause")
  let vol = new MessageButton().setStyle("PRIMARY").setLabel("🔉 Ajustar volume").setCustomId("vol")
  let filter = new MessageButton().setStyle("PRIMARY").setLabel("🎙️ Filtro/Autoplay").setCustomId("filter")
  let skm = new MessageButton().setStyle("PRIMARY").setLabel("⏩ Pular música").setCustomId("skip")
  let qy = new MessageButton().setStyle("PRIMARY").setLabel("🧾 Fila").setCustomId("queue")
  let rows = new MessageActionRow().addComponents(pm, sm, pause, qy)
  let rows2 = new MessageActionRow().addComponents(vol, filter, skm)
 pc.messages.fetch('991906349925535744').then(mesg => mesg.edit({content:'⠀',embeds: [embed], components:[rows, rows2]}))
 mc.send({embeds: [endembed]})
})
  .on("finish", (queue, message) => {
   let embed = new MessageEmbed()
   .setAuthor("Painel Hana", client.user.displayAvatarURL())
   .setDescription("O painel facilita tudo né? Use os botões abaixo para controlar sua música!")
   .setColor("#A616CD")
   let endembed = new MessageEmbed()
   .setAuthor(`Música finalizada`, "https://cdn.discordapp.com/attachments/904534225552830505/990328518426656829/stop.png")
   .setDescription("Todas as músicas adicionadas foram tocadas com sucesso!")
   let pm = new MessageButton().setStyle("SUCCESS").setLabel("▶️ Tocar/Adicionar música").setCustomId("pm")
   let sm = new MessageButton().setStyle("DANGER").setLabel("🛑 Parar música").setCustomId("sm")
   let pause = new MessageButton().setStyle("PRIMARY").setLabel("⏯️ Pausar/Resumir").setCustomId("pause")
   let vol = new MessageButton().setStyle("PRIMARY").setLabel("🔉 Ajustar volume").setCustomId("vol")
   let filter = new MessageButton().setStyle("PRIMARY").setLabel("🎙️ Filtro/Autoplay").setCustomId("filter")
   let skm = new MessageButton().setStyle("PRIMARY").setLabel("⏩ Pular música").setCustomId("skip")
   let qy = new MessageButton().setStyle("PRIMARY").setLabel("🧾 Fila").setCustomId("queue")
   let rows = new MessageActionRow().addComponents(pm, sm, pause, qy)
   let rows2 = new MessageActionRow().addComponents(vol, filter, skm)
  pc.messages.fetch('990300246808625203').then(mesg => mesg.edit({content:'⠀',embeds: [embed], components:[rows, rows2]}))
  mc.send({embeds: [endembed]})
})
.on("addSong", (queue, song) => {
  mc.send("<:musical:990306602387140689> Adicionei `" + song.name + "` na fila")
})
 .on("playSong", (queue, song) => {
     let embed = new MessageEmbed()
   .setAuthor("Painel Hana", client.user.displayAvatarURL())
   .setDescription("Há uma música sendo tocada no momento.")
   .addField(`<:musical:990306602387140689> Música`, `[\`${song.name}\`](${song.url})`)
   .addField(`<:filter:990306599329484820> Filtro`, `\`${queue.filters.join(", ") || "❌"}\``, true)
   .addField(`<:filter:990306599329484820> Autoplay`, `\`${queue.autoplay ? 'Ligado' : 'Desligado'}\``, true)
   .addField(`<:time:988587946494005318> Duração`, `\`${song.formattedDuration}\``, true)
   .addField(`<:CL_aUser:788180621196656700> Pedido por`, `\`${song.user.tag}\`` ,true)
   .setColor("#A616CD")
   .setImage(queue.songs[0].thumbnail)
   let pm = new MessageButton().setStyle("SUCCESS").setLabel("▶️ Tocar/Adicionar música").setCustomId("pm")
   let sm = new MessageButton().setStyle("DANGER").setLabel("🛑 Parar música").setCustomId("sm")
   let pause = new MessageButton().setStyle("PRIMARY").setLabel("⏯️ Pausar/Resumir").setCustomId("pause")
   let vol = new MessageButton().setStyle("PRIMARY").setLabel("🔉 Ajustar volume").setCustomId("vol")
   let filter = new MessageButton().setStyle("PRIMARY").setLabel("🎙️ Filtro/Autoplay").setCustomId("filter")
   let skm = new MessageButton().setStyle("PRIMARY").setLabel("⏩ Pular música").setCustomId("skip")
   let qy = new MessageButton().setStyle("PRIMARY").setLabel("🧾 Fila").setCustomId("queue")
   let rows = new MessageActionRow().addComponents(pm, sm, pause, qy)
   let rows2 = new MessageActionRow().addComponents(vol, filter, skm)
  pc.messages.fetch('991906349925535744').then(mesg => mesg.edit({content:'⠀',embeds: [embed], components:[rows, rows2]}))
  mc.send("<:musical:990306602387140689> Tocando `" + song.name + "`")
  })
    .on("error", (message, err) => console.log(`Fatal: ${err}`))
    .on("noRelated", channel => channel.send("Erro 404: Video não encontrado"))
    .on("searchNoResult", () => {})
    .on("searchInvalidAnswer", () => {})
    .on("searchDone", () => {})
//

client.login(token);