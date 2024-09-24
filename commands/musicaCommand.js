const { PermissionsBitField } = require('discord.js');
const { joinVoiceChannel, createAudioPlayer, createAudioResource, AudioPlayerStatus } = require('@discordjs/voice');
const ytdl = require('@distube/ytdl-core');

async function musicaCommand(interaction) {
    const url = interaction.options.getString('url');

    if (!ytdl.validateURL(url)) {
        await interaction.reply('URL inválido. Por favor, forneça uma URL válida do YouTube.');
        return;
    }

    const player = createAudioPlayer();
    let connection;
    const channel = interaction.member.voice.channel;

    if (!channel) {
        await interaction.reply('Você precisa estar em um canal de voz para tocar músicas!');
        return;
    }

    const permissions = channel.permissionsFor(interaction.client.user);
    if (!permissions.has(PermissionsBitField.Flags.Connect) || !permissions.has(PermissionsBitField.Flags.Speak)) {
        await interaction.reply('Eu preciso das permissões "Connect" e "Speak" para tocar música!');
        return;
    }

    await interaction.channel.sendTyping();

    connection = joinVoiceChannel({
        channelId: channel.id,
        guildId: channel.guild.id,
        adapterCreator: channel.guild.voiceAdapterCreator,
    });

    const stream = ytdl(url, {
        filter: 'audioonly',
        highWaterMark: 1 << 25,
        quality: 'highestaudio',
    });

    const resource = createAudioResource(stream);

    player.play(resource);
    connection.subscribe(player);

    await interaction.reply(`Tocando música: ${url}`);

    player.on(AudioPlayerStatus.Idle, () => {
        connection.destroy();
    });
}

module.exports = { musicaCommand };
