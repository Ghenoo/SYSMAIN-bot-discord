const Discord = require("discord.js")


module.exports = {
  name: "vendasauto", // Coloque o nome do comando
  description: "Vendas Semi Automaticas", // Coloque a descrição do comando
  type: Discord.ApplicationCommandType.ChatInput,
  options: [
    {
        name: "canal",
        description: "selecione um canal",
        type: Discord.ApplicationCommandOptionType.Channel,
        required: true,
    },
    {
        name: "preco",
        description: "selecione o preço do produto",
        type: Discord.ApplicationCommandOptionType.String,
        required: true,
    },
    {
        name: "estoque",
        description: "selecione o estoque",
        type: Discord.ApplicationCommandOptionType.String,
        required: true,
    },
    {
        name: "produto",
        description: "selecione um produto",
        type: Discord.ApplicationCommandOptionType.String,
        required: true,
    }
  ],

  run: async (client, interaction) => {

    if (!interaction.member.permissions.has(Discord.PermissionFlagsBits.Administrator)){
        interaction.reply({ content: `Você não possui permissão para usar este comando! ${interaction.user}`, ephemeral: true })
    } else {

       

        let canal = interaction.options.getChannel("canal")
        let preco = interaction.options.getString("preco")
        let estoque = interaction.options.getString("estoque")
        let produto = interaction.options.getString("produto")

        

        if (canal.type !== Discord.ChannelType.GuildText){
            interaction.reply({ content: `Selecione um canal de texto!`, ephemeral: true })
        } else {

           let emb = new Discord.EmbedBuilder()
           .setColor("#e41313")
           .setDescription(`Sistema ativado com sucesso!\n\nCanal selecionado: ${canal}\nProduto selecionado: \`${produto}\`\nPreço escolhido: \`${preco}\`\nEstoque selecionado: \`${estoque}\` \n`)
           .setFooter({ text: `Frz Community` })

           interaction.reply({ embeds: [emb], ephemeral: true })
           
                const emb3 = new Discord.EmbedBuilder()
                .setTitle('Sales | Frz')
                .setColor("#e41313")
                .setTitle(`Frz Produtos`)
                .setDescription(`**🛒 | Produto: \`${produto}\`** \n **💵 | Preço:** \`${preco}\`\n **📦 | Estoque:** \`${estoque}\``)
                .setThumbnail(`https://media.discordapp.net/attachments/1161430933715550208/1167177361578524693/F82gtNmWwAA7UmX.jpeg`)
                .setImage('https://media.discordapp.net/attachments/1121019816170504244/1149752767724929125/acessobooster.png')
                .setFooter({ text: `Sysmain Community | Gheno System` })

                const ticket = new Discord.ActionRowBuilder()
                .addComponents([
                    new Discord.ButtonBuilder()
                    .setCustomId('ticket1')
                    .setLabel('Comprar')
                    .setEmoji('🛒')
                    .setStyle(Discord.ButtonStyle.Success)
                ])

                canal.send({ embeds: [emb3], components: [ticket] })

        }  

    }


  }
}