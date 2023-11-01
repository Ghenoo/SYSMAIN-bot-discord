const Discord = require("discord.js")
module.exports = {
    name: "limpardm",
    description: `Limpe todas as minhas mensagens no seu privado do BOT`,
    type: Discord.ApplicationCommandType.ChatInput,

    run: async (client, interaction) => {

        const dm = await interaction.member.createDM();
        await interaction.reply({ embeds: [ new Discord.EmbedBuilder()
            .setDescription(`<:red_circle:1167185440521064500> Estou limpando a nossa DM, ${interaction.user} aguarde um pouco em quanto eu á limpo.`)
            .setColor(`ffff00`)]})
            
            setTimeout(() => {
                interaction.editReply({embeds: [
                    new Discord.EmbedBuilder()
                    .setColor("#4D4DFF")
                    .setDescription(`<:hourglass_flowing_sand:s:1167185188179161189> **Limpando nossa DM..**`)
                ]})
            }, 1000)
            setTimeout(() => {
                interaction.editReply({embeds: [
                    new Discord.EmbedBuilder()
                    .setColor("#ffd700")
                    .setDescription(`<:hourglass_flowing_sand:s:1167185188179161189> **Limpando nossa DM...**`)
                ]})
            }, 2000)
            setTimeout(() => {
                interaction.editReply({embeds: [
                    new Discord.EmbedBuilder()
                    .setColor("#000000")
                    .setDescription(`<:hourglass_flowing_sand:s:1167185188179161189> **Limpando nossa DM..**`)
                ]})
            }, 3000)
            setTimeout(() => {
              interaction.editReply({embeds: [
                new Discord.EmbedBuilder()
                  .setColor("#9400d3")
                  .setDescription(`<:hourglass_flowing_sand:s:1167185188179161189> **Limpando nossa DM...**`)
              ]})
          }, 4000)
          setTimeout(() => {
            interaction.editReply({embeds: [
                new Discord.EmbedBuilder()
                .setColor("#ffd700")
                .setDescription(`<:hourglass_flowing_sand:s:1167185188179161189> **Limpando nossa DM..**`)
            ]})
        }, 5000)
        setTimeout(() => {
          interaction.editReply({embeds: [
            new Discord.EmbedBuilder()
              .setColor("#000000")
              .setDescription(`<:hourglass_flowing_sand:s:1167185188179161189> **Limpando nossa DM...**`)
          ]})
      }, 6000)
        setTimeout(() => {
            interaction.editReply({embeds: [ new Discord.EmbedBuilder()
                .setDescription(`<:white_check_mark:1167191738633420871> Prontinho, ${interaction.user} nossa DM foi limpada com sucesso!`)
                .setColor(`f0f00f`)]
            })}, 8000)
        const deleteMessages = await client.channels.cache
            .get(dm.id)
            .messages.fetch({ limit: 100 });
        await deleteMessages.map((msg) => {
            if (msg.author.bot) {
                msg.delete();
            }
        });
    }
}