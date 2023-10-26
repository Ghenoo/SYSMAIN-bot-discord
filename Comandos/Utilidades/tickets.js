const Discord = require("discord.js")

module.exports = {
  name: "tickets", // Coloque o nome do comando
  description: "Ative o sistema de ticket no servidor.", // Coloque a descrição do comando
  type: Discord.ApplicationCommandType.ChatInput,
  options: [
    {
        name: "canal",
        description: "Mencione um canal de texto.",
        type: Discord.ApplicationCommandOptionType.Channel,
        required: false,
    }
],

  run: async (client, interaction) => {

    if (!interaction.member.permissions.has(Discord.PermissionFlagsBits.ManageGuild)) {
        interaction.reply(`Olá ${interaction.user}, você não possui permissão para utilizar este comando.`)
    } else {
        let canal = interaction.options.getChannel("canal");
        if (!canal) canal = interaction.channel;

        let embed_ephemeral = new Discord.EmbedBuilder()
        .setColor("Grey")
        .setDescription(`Opa ${interaction.user}, deu certo ! Ele foi criado aqui -> ${canal} `);

        let emebd_tickets = new Discord.EmbedBuilder()
        .setColor("#2B2C30")
        .setAuthor({ name: `Sys Ticket`, iconURL: interaction.guild.iconURL({ dynamic: true}) })
        .setDescription(`Basta clicar no que você está precisando.`)

        let botao = new Discord.ActionRowBuilder().addComponents(
          new Discord.ButtonBuilder()
            .setCustomId("tickets_basico")
            .setEmoji("👥")
            .setLabel("Suporte")
            .setStyle(Discord.ButtonStyle.Primary),
          new Discord.ButtonBuilder()
            .setCustomId("outro_botao")
            .setEmoji("🤝")
            .setLabel("Parcerias")
            .setStyle(Discord.ButtonStyle.Primary)
        );

            
        interaction.reply({ embeds: [embed_ephemeral], ephemeral: true }).then( () => {
            canal.send({ embeds: [emebd_tickets], components: [botao] })
        })
    }


    
  }
}