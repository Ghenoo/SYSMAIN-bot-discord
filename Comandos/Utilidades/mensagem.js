const { Client, GatewayIntentBits, Intents, MessageActionRow, MessageButton } = require('discord.js');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages],
});

const token = 'MTE2MTQzMTQ4NjEzNDc1NTM1OA.G60TWb.KWqRMlKqHr519AoOgxtb85hL_PBxv_lhncoigQ'; // Coloque seu token aqui
const guildId = '1161082513758896188'; // Coloque o ID do seu servidor aqui

client.once('ready', () => {
  console.log(`Logged in as ${client.user.tag}`);
});

client.on('interactionCreate', async (interaction) => {
  if (!interaction.isButton()) return;

  const user = interaction.user;

  if (interaction.customId === 'enviarMensagem') {
    const dmChannel = await user.createDM();
    await dmChannel.send('Sua mensagem aqui.');
    await interaction.reply('Mensagem enviada com sucesso!');
  }
});

// Registre o slash command e o botão no servidor
const commands = [
  {
    name: 'mensagem',
    description: 'Envie uma mensagem no PV da pessoa que você marcar.',
    type: 1, // Sub-command
    options: [
      {
        name: 'usuário',
        description: 'O usuário a ser marcado.',
        type: 6, // User type
        required: true,
      },
    ],
  },
];

(async () => {
  const rest = new REST({ version: '9' }).setToken(token);

  try {
    console.log('Started refreshing application (/) commands.');

    await rest.put(Routes.applicationGuildCommands(client.user.id, guildId), {
      body: commands,
    });

    console.log('Successfully reloaded application (/) commands.');
  } catch (error) {
    console.error(error);
  }
})();

// Crie um botão para enviar a mensagem
const button = new MessageButton()
  .setCustomId('enviarMensagem')
  .setLabel('Enviar Mensagem')
  .setStyle('PRIMARY');

const row = new MessageActionRow().add
