const Discord = require("discord.js");

module.exports = {
  name: "staff-log",//nome do comando
  description: "Sistema de staff log.",//descrição do comando
  type: Discord.ApplicationCommandType.ChatInput,
  options: [
    {
      name: 'staff',
      description: 'mencione o staff para o changelog.',
      type: Discord.ApplicationCommandOptionType.User,
      required: true,
    },
    {
      name: 'oque-ocorreu',
      description: 'Oque aconteceu com esse staff.',
      type: Discord.ApplicationCommandOptionType.String,
      required: true,
      choices: [
        {
          name: "saiu",
          value: 'sair',
        },
        {
          name: "promovido",
          value: 'promovido',
        },
        {
          name: "rebaixado",
          value: 'rebaixado',
        },
        {
          name: "entrou",
          value: 'entrou'
        }
      ]
    },
    {
      name: 'cargo',
      description: 'escolha o cargo que ele ganhou ou perdeu.',
      type: Discord.ApplicationCommandOptionType.Role,
      required: true
    }
  ],

  run: async (client, interaction) => {
    if (!interaction.member.permissions.has(Discord.PermissionFlagsBits.Administrator)) {
      interaction.reply({ content: `Você não possui permissão para utilizar este comando!`, ephemeral: true });
      return;
    }

    let staff = interaction.options.getUser("staff");
    let ac = interaction.options.getString("oque-ocorreu");
    let cargo = interaction.options.getRole("cargo");
    let canal = interaction.guild.channels.cache.get("1169205224800526376");//Coloque o id do canal onde vai ser enviado o staff-log


    if(ac === "sair"){
        const embed = new Discord.EmbedBuilder()
        .setTitle("👥・Staff-log")
        .setColor("Red")
        .setDescription(`O staff: ${staff} acaba de sair da equipe, e deixou o cargo: ${cargo}`)//recomendo não mexer na parte onde tem ${x}, apenas no resto
        .setFooter({ text: `© ${client.user.username} ${new Date().getFullYear()}`, iconURL: client.user.displayAvatarURL({ dynamic: true }) })
        
        canal.send({ embeds: [embed] }).catch((e) =>{
            interaction.reply({
                content: `Ocorreu um erro ao enviar a mensagem`,
                ephemeral: true
              });
        });
    }else if(ac === "promovido"){
        const embed = new Discord.EmbedBuilder()
        .setTitle("👥・Staff-log")
        .setColor("Red")
        .setDescription(`O staff: ${staff} foi promovido para o cargo: ${cargo}`)//recomendo não mexer na parte onde tem ${x}, apenas no resto
        .setFooter({ text: `© ${client.user.username} ${new Date().getFullYear()}`, iconURL: client.user.displayAvatarURL({ dynamic: true }) })
        
        canal.send({ embeds: [embed] }).catch((e) =>{
            interaction.reply({
                content: `Ocorreu um erro ao enviar a mensagem`,
                ephemeral: true
              });
        });
    }else if(ac === "rebaixado"){
        const embed = new Discord.EmbedBuilder()
        .setTitle("👥・Staff-log")
        .setColor("Red")
        .setDescription(`O staff: ${staff} foi rebaixado para o cargo: ${cargo}`)//recomendo não mexer na parte onde tem ${x}, apenas no resto
        .setFooter({ text: `© ${client.user.username} ${new Date().getFullYear()}`, iconURL: client.user.displayAvatarURL({ dynamic: true }) })
        
        canal.send({ embeds: [embed] }).catch((e) =>{
            interaction.reply({
                content: `Ocorreu um erro ao enviar a mensagem`,
                ephemeral: true
              });
        });
    }else if(ac === "entrou"){
        const embed = new Discord.EmbedBuilder()
        .setTitle("👥・Staff-log")
        .setColor("Red")
        .setDescription(`${staff} Acaba de ser aprovado em nossa equipe como: ${cargo}`)//recomendo não mexer na parte onde tem ${x}, apenas no resto
        .setFooter({ text: `© ${client.user.username} ${new Date().getFullYear()}`, iconURL: client.user.displayAvatarURL({ dynamic: true }) })
        
        canal.send({ embeds: [embed] }).catch((e) =>{
            interaction.reply({
                content: `Ocorreu um erro ao enviar a mensagem`,
                ephemeral: true
              });
        });
        
    }
    interaction.reply({
        content: `**✅ | A mensagem será enviada em instantes.**`,
        ephemeral: true
      });
      

 }
};
