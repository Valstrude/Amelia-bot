const { EmbedBuilder } = require('discord.js');

// gifs hug
const gifs_hugs = [
    'https://files.catbox.moe/p1p6je.gif',
    'https://files.catbox.moe/82jgk9.gif',
    'https://files.catbox.moe/rxx80g.gif',
    'https://files.catbox.moe/b3yoyg.gif',
];

async function abraçarCommand(interaction) {
    const user = interaction.options.getUser('usuário');
    const sender = interaction.user.toString();

    const randomIndex = Math.floor(Math.random() * gifs_hugs.length);
    const selectedGif = gifs_hugs[randomIndex];

    await interaction.channel.sendTyping();

    try {
        const embed = new EmbedBuilder()
            .setDescription(`${sender} deu um abraço em ${user}!`)
            .setImage(selectedGif)
            .setColor("Random")
            .setTimestamp();

        await interaction.reply({ embeds: [embed] });
        
    } catch (error) {
        console.log(error);
    }
}

module.exports = { abraçarCommand };
