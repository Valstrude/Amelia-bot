const { EmbedBuilder } = require('discord.js');

async function jokenpoCommand(interaction) {
    const user_escolha = interaction.options.getString('opções');
    let emoji_enemy;
    let emoji_user;
    let bot_escolha;

    const random_num = Math.floor(Math.random() * 3); // gera aleatorio entre 0 e 2

    switch (user_escolha) { // para atribuir emoji no emoji_user
        case 'Pedra':
            emoji_user = '🧱';
            break;
        case 'Papel':
            emoji_user = '📄';
            break;
        case 'Tesoura':
            emoji_user = '✂️';
            break;
    }

    switch (random_num) { // para atribuir valor no bot_escolha e emoji_enemy
        case 0:
            bot_escolha = "Pedra"; // Pedra
            emoji_enemy = '🧱';
            break;
        case 1:
            bot_escolha = "Papel"; // Papel
            emoji_enemy = '📄';
            break;
        case 2:
            bot_escolha = "Tesoura"; // Tesoura
            emoji_enemy = '✂️';
            break;
        default:
            bot_escolha = "X";
            break;
    }
    
    await interaction.channel.sendTyping();
    // da empate
    if (user_escolha == bot_escolha) {
        setTimeout(async () => {
            await interaction.reply(`Eu escolhi: ${emoji_enemy}, e você escolheu: ${emoji_user}, Deu empate! ${interaction.user} 😐 vamos de novo?`);
        }, 2000);
    }
    // voce ganha
    if (bot_escolha == "Tesoura" && user_escolha == "Pedra" || bot_escolha == "Pedra" && user_escolha == "Papel" || bot_escolha == "Papel" && user_escolha == "Tesoura") {
        setTimeout(async () => {
            await interaction.reply(`Eu escolhi: ${emoji_enemy}, e você escolheu: ${emoji_user}, Você ganhou! ${interaction.user} 😞 Na próxima eu ganho!`)
        }, 2000);
    }
    // voce perde
    if (bot_escolha == "Tesoura" && user_escolha == "Papel" || bot_escolha == "Pedra" && user_escolha == "Tesoura" || bot_escolha == "Papel" && user_escolha == "Pedra") {
        setTimeout(async () => {
            await interaction.reply(`Eu escolhi: ${emoji_enemy}, e você escolheu: ${emoji_user}, Você perdeu! ${interaction.user} 😀 Mais sorte na próxima.`)
        }, 2000);
    }
}

module.exports = { jokenpoCommand };