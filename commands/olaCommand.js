const { EmbedBuilder } = require('discord.js');

async function olaCommand(interaction) {
    // Mostra que Amelia está digitando
    await interaction.channel.sendTyping();
    // Faz Amelia esperar um pouco
    setTimeout(async () => {
        await interaction.reply({content: `olá... ${interaction.user.toString()}!`});
    }, 2000); // Responde com "olá... [seu nome] depois de um certo tempo"
}

module.exports = { olaCommand };