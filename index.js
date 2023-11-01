const Discord = require("discord.js")
const config = require("./config.json")
const ms = require('ms')
const moment = require('moment')
const { QuickDB } = require("quick.db");
const mercadopago = require("mercadopago");
const db = new QuickDB();



const client = new Discord.Client({ 
  intents: [ 
Discord.GatewayIntentBits.Guilds
       ]
    });

module.exports = client

const { joinVoiceChannel } = require('@discordjs/voice');

client.on('interactionCreate', (interaction) => {

  if(interaction.type === Discord.InteractionType.ApplicationCommand){

      const cmd = client.slashCommands.get(interaction.commandName);

      if (!cmd) return interaction.reply(`Error`);

      interaction["member"] = interaction.guild.members.cache.get(interaction.user.id);

      cmd.run(client, interaction)

   }
})

client.on('ready', () => {
  console.log(`🔥 Estou online em ${client.user.username}!`)
})


client.slashCommands = new Discord.Collection()

require('./handler')(client)

client.login(config.token)

process.on('multipleResolutions', (type, reason, promise) => {
  console.log(`🚫 Erro Detectado\n\n` + type, promise, reason)
});

process.on('unhandledRejection', (reason, promise) => {
  console.log(`🚫 Erro Detectado:\n\n` + reason, promise)
});

process.on('uncaughtException', (error, origin) => {
  console.log(`🚫 Erro Detectado:\n\n` + error, origin)
});

process.on('uncaughtExceptionMonitor', (error, origin) => {
  console.log(`🚫 Erro Detectado:\n\n` + error, origin)
});

client.on("interactionCreate", async (interaction) => {
    if (interaction.isButton()) {
      if (interaction.customId === "tickets_basico") {
        let nome_canal = `彡・${interaction.user.tag}`;
        let canal = interaction.guild.channels.cache.find(c => c.name === nome_canal);
  
        if (canal) {
          interaction.reply({ content: `Ops... **${interaction.user.username}**, voce ja tem um ticket aberto aqui -> ${canal}.`, ephemeral: true})
        } else {
  
          let categoria = interaction.channel.parent;
          if (!categoria) categoria = null;
  
          interaction.guild.channels.create({
  
            name: nome_canal,
            parent: '1121138702224211998',
            type: Discord.ChannelType.GuildText,
            permissionOverwrites: [
              {
                id: interaction.guild.id,
                deny: [ Discord.PermissionFlagsBits.ViewChannel ]
              },
              {
                id: `1118644011704516778`,
                allow: [
                  Discord.PermissionFlagsBits.ViewChannel,
                  Discord.PermissionFlagsBits.SendMessages
                ]
              },
              {
                id: interaction.user.id,
                allow: [
                  Discord.PermissionFlagsBits.ViewChannel,
                  Discord.PermissionFlagsBits.AddReactions,
                  Discord.PermissionFlagsBits.SendMessages,
                  Discord.PermissionFlagsBits.AttachFiles,
                  Discord.PermissionFlagsBits.EmbedLinks
                ]
              },
            ]
  
          }).then( (chat) => {
  
            interaction.reply({ content: `Olá **${interaction.user.username}**, seu ticket foi aberto em ${chat}.`, ephemeral: true })
  
            let embed = new Discord.EmbedBuilder()
            .setColor("#2B2C30")
            .setAuthor({ name: `Suporte`, iconURL: interaction.guild.iconURL({ dynamic: true}) })
            .setDescription(`> 👥・Só enviar sua duvida aqui !`)
  
            let botao_close = new Discord.ActionRowBuilder().addComponents(
              new Discord.ButtonBuilder()
              .setCustomId("close_ticket")
              .setEmoji("🔒")
              .setLabel("Fechar Ticket")
              .setStyle(Discord.ButtonStyle.Danger)
            );
  
            chat.send({ embeds: [embed], components: [botao_close] }).then(m => {
              m.pin()
            })
  
          })
        }
      } else if (interaction.customId === "close_ticket") {
        interaction.reply(`Olá ${interaction.user}, este ticket será excluído em 5 segundos.`)
        try {
          setTimeout( () => {
            interaction.channel.delete().catch( e => { return; } )
          }, 5000)
        } catch (e) {
          return;
        }
        
      }
    }
  })

  client.on("interactionCreate", async (interaction) => {
    if (interaction.isButton()) {
      if (interaction.customId === "outro_botao") {
        let nome_canal = `彡・${interaction.user.tag}`;
        let canal = interaction.guild.channels.cache.find(c => c.name === nome_canal);
  
        if (canal) {
          interaction.reply({ content: `Ops... **${interaction.user.username}**, voce ja tem um ticket aberto aqui -> ${canal}.`, ephemeral: true})
        } else {
  
          let categoria = interaction.channel.parent;
          if (!categoria) categoria = null;
  
          interaction.guild.channels.create({
  
            name: nome_canal,
            parent: '1121138702224211998',
            type: Discord.ChannelType.GuildText,
            permissionOverwrites: [
              {
                id: interaction.guild.id,
                deny: [ Discord.PermissionFlagsBits.ViewChannel ]
              },
              {
                id: `1118644011704516778`,
                allow: [
                  Discord.PermissionFlagsBits.ViewChannel,
                  Discord.PermissionFlagsBits.SendMessages
                ]
              },
              {
                id: interaction.user.id,
                allow: [
                  Discord.PermissionFlagsBits.ViewChannel,
                  Discord.PermissionFlagsBits.AddReactions,
                  Discord.PermissionFlagsBits.SendMessages,
                  Discord.PermissionFlagsBits.AttachFiles,
                  Discord.PermissionFlagsBits.EmbedLinks
                ]
              },
            ]
  
          }).then( (chat) => {
  
            interaction.reply({ content: `Olá **${interaction.user.username}**, seu ticket foi aberto em ${chat}.`, ephemeral: true })
  
            let embed = new Discord.EmbedBuilder()
            .setColor("#2B2C30")
            .setAuthor({ name: `Parceria`, iconURL: interaction.guild.iconURL({ dynamic: true}) })
            .setDescription(`> 🤝・So mandar seu servidor com as letras separadas, e sua proposta !`)
            
            let botao_close = new Discord.ActionRowBuilder().addComponents(
              new Discord.ButtonBuilder()
              .setCustomId("close_ticket2")
              .setEmoji("🔒")
              .setLabel(`Fechar Ticket`)
              .setStyle(Discord.ButtonStyle.Danger)
            );
  
            chat.send({ embeds: [embed], components: [botao_close] }).then(m => {
              m.pin()
            })
  
          })
        }
      } else if (interaction.customId === "close_ticket2") {
        interaction.reply(`Olá ${interaction.user}, este ticket será excluído em 5 segundos.`)
        try {
          setTimeout( () => {
            interaction.channel.delete().catch( e => { return; } )
          }, 5000)
        } catch (e) {
          return;
        }
      }
    }
  })






//SISTEMA ENTRAR NA CALL

client.on("ready", () => {
  let canal = client.channels.cache.get("1161101561280344125") // coloque o ID do canal de voz
  if (!canal) return console.log("❌ Não foi possível entrar no canal de voz.")
  if (canal.type !== Discord.ChannelType.GuildVoice) return console.log(`❌ Não foi possível entrar no canal [ ${canal.name} ].`)

  try {

    joinVoiceChannel({
      channelId: canal.id, // ID do canal de voz
      guildId: canal.guild.id, // ID do servidor
      adapterCreator: canal.guild.voiceAdapterCreator,
    })
    console.log(`✅ Entrei no canal de voz [ ${canal.name} ] com sucesso!`)

  } catch(e) {
    console.log(`❌ Não foi possível entrar no canal [ ${canal.name} ].`)
  }

})



client.on("interactionCreate", async(interaction) => {
  if (interaction.isButton()) {
    if (interaction.customId === "formulario") {
      if (!interaction.guild.channels.cache.get(await db.get(`canal_logs_${interaction.guild.id}`))) return interaction.reply({ content: `O sistema está desativado.`, ephemeral: true })
      const modal = new Discord.ModalBuilder()
      .setCustomId("modal")
      .setTitle("Formulário");

      const pergunta1 = new Discord.TextInputBuilder()
      .setCustomId("pergunta1") // Coloque o ID da pergunta
      .setLabel("Nome completo?") // Coloque a pergunta
      .setMaxLength(20) // Máximo de caracteres para a resposta
      .setPlaceholder("Coloque seu Nome Completo:") // Mensagem que fica antes de escrever a resposta
      .setRequired(true) // Deixar para responder obrigatório (true | false)
      .setStyle(Discord.TextInputStyle.Short) // Tipo de resposta (Short | Paragraph)

      const pergunta2 = new Discord.TextInputBuilder()
      .setCustomId("pergunta2") // Coloque o ID da pergunta
      .setLabel("Qual e sua idade?") // Coloque a pergunta
      .setMaxLength(2) // Máximo de caracteres para a resposta
      .setPlaceholder("Coloque sua idade:") // Mensagem que fica antes de escrever a resposta
      .setStyle(Discord.TextInputStyle.Short) // Tipo de resposta (Short | Paragraph)
      .setRequired(true)

      const pergunta3 = new Discord.TextInputBuilder()
      .setCustomId("pergunta3") // Coloque o ID da pergunta
      .setLabel("Qual e seu número do Whatsapp?") // Coloque a pergunta
      .setMaxLength(12) // Máximo de caracteres para a resposta
      .setPlaceholder("Coloque seu número do seu whatsapp:") // Mensagem que fica antes de escrever a resposta
      .setStyle(Discord.TextInputStyle.Short) // Tipo de resposta (Short | Paragraph)
      .setRequired(false)

      const pergunta4 = new Discord.TextInputBuilder()
      .setCustomId("pergunta4") // Coloque o ID da pergunta
      .setLabel("Porque você quer fazer parte da equipe?") // Coloque a pergunta
      .setMaxLength(500)
      .setPlaceholder("Descreva porque você quer fazer parte da Equipe Sysmain?:") // Mensagem que fica antes de escrever a resposta
      .setStyle(Discord.TextInputStyle.Paragraph) // Tipo de resposta (Short | Paragraph)
      .setRequired(true)

      const pergunta5 = new Discord.TextInputBuilder()
      .setCustomId("pergunta5") // Coloque o ID da pergunta
      .setLabel("Quanto tempo você tem livre?") // Coloque a pergunta
      .setMaxLength(70)
      .setPlaceholder("Escreva quanto tempo você tem livre:") // Mensagem que fica antes de escrever a resposta
      .setStyle(Discord.TextInputStyle.Paragraph) // Tipo de resposta (Short | Paragraph)
      .setRequired(true)


      modal.addComponents(
        new Discord.ActionRowBuilder().addComponents(pergunta1),
        new Discord.ActionRowBuilder().addComponents(pergunta2),
        new Discord.ActionRowBuilder().addComponents(pergunta3),
        new Discord.ActionRowBuilder().addComponents(pergunta4),
        new Discord.ActionRowBuilder().addComponents(pergunta5)

      )

      await interaction.showModal(modal)
    }
  } else if (interaction.isModalSubmit()) {
    if (interaction.customId === "modal") {
      let resposta1 = interaction.fields.getTextInputValue("pergunta1")
      let resposta2 = interaction.fields.getTextInputValue("pergunta2")
      let resposta3 = interaction.fields.getTextInputValue("pergunta3")
      let resposta4 = interaction.fields.getTextInputValue("pergunta4")
      let resposta5 = interaction.fields.getTextInputValue("pergunta5")


      if (!resposta1) resposta1 = "Não informado."
      if (!resposta2) resposta2 = "Não informado."
      if (!resposta3) resposta3 = "Não informado."
      if (!resposta4) resposta4 = "Não informado."
      if (!resposta5) resposta5 = "Não informado."


      let embed = new Discord.EmbedBuilder()
      .setColor("303136")
      .setAuthor({ name: interaction.guild.name, iconURL: interaction.guild.iconURL({ dynamic: true }) })
      .setThumbnail(interaction.user.displayAvatarURL({ dynamic: true }))
      .setDescription(`**Usuario:** ${interaction.user}\n**ID:** \`${interaction.user.id}\``)
      .addFields(
        {
          name: `Nome Completo`,
          value: `\`\`\`${resposta1}\`\`\``,
          inline: true
        },
        {
          name: `Idade`,
          value: `\`\`\`${resposta2}\`\`\``,
          inline: true
        },
        {
          name: `Numero Do Whatsapp`,
          value: `\`\`\`${resposta3}\`\`\``,
          inline: true
        },
        {
          name: `Porque voce quer fazer parte da equipe ?`,
          value: `\`\`\`${resposta4}\`\`\``,
          inline: false
        },
        {
          name: `Quanto Tempo voce tem livre ?`,
          value: `\`\`\`${resposta5}\`\`\``,
          inline: true
        }
      );

      interaction.reply({ embeds: [ new Discord.EmbedBuilder().setDescription(`**${interaction.user},** Seu formulário foi enviado com sucesso. Aguarde a resposta no seu privado!`)
                .setColor("303136")
        ],
        ephemeral: true,
    })
      await interaction.guild.channels.cache.get(await db.get(`canal_logs_${interaction.guild.id}`)).send({ embeds: [embed] })
    }
  }
})




client.on("interactionCreate", async(interaction) => {
  if (interaction.isButton()) {
    if (interaction.customId === "formulariopostador") {
      if (!interaction.guild.channels.cache.get(await db.get(`canal_logs_${interaction.guild.id}`))) return interaction.reply({ content: `O sistema está desativado.`, ephemeral: true })
      const modal = new Discord.ModalBuilder()
      .setCustomId("modal1")
      .setTitle("Formulário");

      const pergunta1 = new Discord.TextInputBuilder()
      .setCustomId("pergunta1") // Coloque o ID da pergunta
      .setLabel("Por que voce quer ser postador ?") // Coloque a pergunta
      .setMaxLength(200) // Máximo de caracteres para a resposta
      .setPlaceholder("Escreva Aqui !") // Mensagem que fica antes de escrever a resposta
      .setRequired(true) // Deixar para responder obrigatório (true | false)
      .setStyle(Discord.TextInputStyle.Paragraph) // Tipo de resposta (Short | Paragraph)

      const pergunta2 = new Discord.TextInputBuilder()
      .setCustomId("pergunta2") // Coloque o ID da pergunta
      .setLabel("O que voce ira postar ?") // Coloque a pergunta
      .setMaxLength(200) // Máximo de caracteres para a resposta
      .setPlaceholder("Escreve Aqui !") // Mensagem que fica antes de escrever a resposta
      .setStyle(Discord.TextInputStyle.Paragraph) // Tipo de resposta (Short | Paragraph)
      .setRequired(true)



      modal.addComponents(
        new Discord.ActionRowBuilder().addComponents(pergunta1),
        new Discord.ActionRowBuilder().addComponents(pergunta2)

      )

      await interaction.showModal(modal)
    }
  } else if (interaction.isModalSubmit()) {
    if (interaction.customId === "modal1") {   
      let resposta1 = interaction.fields.getTextInputValue("pergunta1")
      let resposta2 = interaction.fields.getTextInputValue("pergunta2")



      if (!resposta1) resposta1 = "Não informado."
      if (!resposta2) resposta2 = "Não informado."


      let embed = new Discord.EmbedBuilder()
      .setColor("303136")
      .setAuthor({ name: interaction.guild.name, iconURL: interaction.guild.iconURL({ dynamic: true }) })
      .setThumbnail(interaction.user.displayAvatarURL({ dynamic: true }))
      .setDescription(`**Usuario:** ${interaction.user}\n**ID:** \`${interaction.user.id}\``)
      .addFields(
        {
          name: `Motivo`,
          value: `\`\`\`${resposta1}\`\`\``,
          inline: true
        },
        {
          name: `Motpostar`,
          value: `\`\`\`${resposta2}\`\`\``,
          inline: true
        }
      );

      interaction.reply({ embeds: [ new Discord.EmbedBuilder().setDescription(`**${interaction.user},** Seu formulário foi enviado com sucesso. Aguarde a resposta no seu privado!`)
                .setColor("303136")
        ],
        ephemeral: true,
    })
      await interaction.guild.channels.cache.get(await db.get(`canal_logs_${interaction.guild.id}`)).send({ embeds: [embed] })
    }
  }
})




client.on('interactionCreate', async (interaction) => {
  if (interaction.isButton()){
    if (interaction.customId === 'ticket1'){
      let nome_canal = `彡・${interaction.user.username}`
      let canal = interaction.guild.channels.cache.find(c => c.name === nome_canal)

      if (canal) {
        interaction.reply({ content: `Você já possui um ticket aberto em ${canal}.`, ephemeral: true })
      } else {
        let categoriaId = '1126354580515594300'; // ID da categoria específica para os tickets

        let categoria = interaction.guild.channels.cache.get(categoriaId);
        if (!categoria) categoria = null;
        
        interaction.guild.channels.create({
          name: nome_canal,
          parent: categoria,
          type: Discord.ChannelType.GuildText,
          permissionOverwrites: [
            {
              id: interaction.user.id,
              allow: [
                Discord.PermissionFlagsBits.ViewChannel, // Permitir a visualização do canal
                Discord.PermissionFlagsBits.AddReactions,
                Discord.PermissionFlagsBits.AttachFiles,
                Discord.PermissionFlagsBits.EmbedLinks
              ],
              deny: [
                Discord.PermissionFlagsBits.SendMessages // Negar a permissão para enviar mensagens
              ]
            },
            {
              id: interaction.guild.id, // ID do servidor para negar acesso a todos
              deny: [
                Discord.PermissionFlagsBits.ViewChannel // Negar a permissão para visualizar o canal
              ]
            }
          ]
      

          
          

        }).then( (chat) => {

          interaction.reply({ content: `Seu ticket foi aberto com sucesso em: ${chat}`, ephemeral: true })

          let emb10 = new Discord.EmbedBuilder()
          .setColor("#2A2C31")

          .setTitle(`Pague e receba seu produto.`)
        
          .setDescription('Aguardando pagamento... \n \n **ID do pagamento: \n `0365347328725324234` **')

          .setImage(`https://media.discordapp.net/attachments/1105220480610357370/1152006363195658291/image0.jpg?width=678&height=671`)

          .setFooter({ text: `⚠️ Finalize o pagamento ・ Direitos Reservados®` })

          let fechar10 = new Discord.ActionRowBuilder()
          .addComponents([
            new Discord.ButtonBuilder()
          .setCustomId('sobre_10')
          .setLabel('Chave Aleatoria')
          .setStyle(Discord.ButtonStyle.Secondary)
          ])
          .addComponents([
            new Discord.ButtonBuilder()
            .setCustomId('close_10')
            .setLabel('Cancelar')

            .setStyle(Discord.ButtonStyle.Danger)
          ])

          chat.send({ embeds: [emb10], components: [fechar10] }).then(m => {
            m.pin()
          })
        })
      }
    } else if  (interaction.customId === 'close_10') {

      const member = interaction.member;
      const roleId = '1161082513758896194'; //id do cargo que tem permissão para fechar o ticket
  
      if (member.roles.cache.has(roleId)) {
        
         setTimeout(()=>{
          interaction.reply({
            ephemeral: true,
            embeds: [
              new Discord.EmbedBuilder()
              .setColor("#2A2C31")
              .setDescription(`**✅ Fechando Compra...**`)
            ]
          })
        }, 1000)
          

        
          
          
         
          try {
            setTimeout( () => {
              interaction.channel.delete().catch(e => {return} )
            }, 5000)
          } catch (e) {
            return;
          }


      } else {
        // O usuário não tem o cargo necessário
        interaction.reply({ content: 'Você não tem permissão para usar este botão!', ephemeral: true });
      }
    } else if (interaction.customId ==='sobre_10'){

      let emb_sobre = new Discord.EmbedBuilder()
      .setColor("#e41313")
      .setDescription(`**852c8347-d020-43bd-b550-1dce39590d38**`)//caso queira escrever, fique a vontade!

      interaction.reply({ embeds: [emb_sobre], ephemeral: true })
    
    
    }

    
      if (interaction.customId === 'close_10'){

      const topic = interaction.channel.topic

      const channel = interaction.channel

      const discordTranscripts = require("discord-html-transcripts")

      const attachment = await discordTranscripts.createTranscript(channel);

     

      let embed = new Discord.EmbedBuilder()
      .setDescription(`**❱ Ticket de:**\n↳ <@${topic}>\`(${topic})\`\n\n**❱ Deletado pelo staff:**\n↳ ${interaction.user}\`(${interaction.user.id})\``)
      .setColor("#e41313")
      .setTimestamp()
      .setFooter({
        iconURL: interaction.guild.iconURL({ dynamic: true }),
        text: ("© Todos os diretos reservados")
    });

      interaction.guild.channels.cache.get('1161430933715550208').send({ //ID DO CANAL PARA ENVIAR AS LOGS
        embeds: [embed],
        files: [attachment],
        
      })

    }
    
    }
  }

)