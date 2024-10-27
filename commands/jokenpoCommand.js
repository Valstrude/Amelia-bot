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
        default:
            await interaction.reply("Você não me respondeu...");
            return;
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
    // variaveis do embed
    let title;
    let description;
    let color;

    // da empate
    if (user_escolha === bot_escolha) {
        title = "Empate!";
        description = `Eu escolhi: ${emoji_enemy}\nVocê escolheu: ${emoji_user}\n 😐 Vamos de novo?`;
        color = 0xFFFF00; // amarelo
    } else if (bot_escolha === "Tesoura" && user_escolha === "Pedra" || bot_escolha === "Pedra" && user_escolha === "Papel" || bot_escolha === "Papel" && user_escolha === "Tesoura") {
        title = "Você Ganhou!";
        description = `Eu escolhi: ${emoji_enemy}\nVocê escolheu: ${emoji_user}\nHá poxa 😞`;
        color = 0x00FF00; // verde
    } else { // voce perde
        title = "Você Perdeu!";
        description = `Eu escolhi: ${emoji_enemy}\nVocê escolheu: ${emoji_user}\nMais sorte na próxima! 😀`;
        color = 0xFF0000; // vermelho
    }

    // embed para ficar bonitinho
    const embed = new EmbedBuilder()
        .setTitle(title)
        .setDescription(description)
        .setColor(color)
        .setFooter({ text: interaction.user.username, iconURL: interaction.user.displayAvatarURL()})
        .setTimestamp();

        if (title && description) { // verifica se o title e desc tem valor
            await interaction.reply({ embeds: [embed] });
        } else {
            await interaction.reply("Algo deu errado...");
        }
}

module.exports = { jokenpoCommand };
