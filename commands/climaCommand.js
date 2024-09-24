const { EmbedBuilder } = require('discord.js');
const axios = require('axios');

async function climaCommand(interaction) {
    const city = interaction.options.getString('local');
    const degreeType = interaction.options.getString('temperatura');

    await interaction.channel.sendTyping();

    try {
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${process.env.WEATHER_KEY}&units=${degreeType === 'f' ? 'imperial' : 'metric'}&lang=pt_br`);
        const data = response.data;

        const iconCode = data.weather[0].icon; // código do ícone
        const iconUrl = `http://openweathermap.org/img/wn/${iconCode}.png`; // URL do ícone

        const embed = new EmbedBuilder()
            .setTitle(`Clima em ${data.name}`)
            .setDescription(`Pedido por: ${interaction.user}`)
            .setThumbnail(iconUrl)
            .addFields(
                { name: 'Clima:', value: data.weather[0].description, inline: true },
                { name: 'Temp min:', value: `${data.main.temp_min}°${degreeType.toUpperCase()}`, inline: true },
                { name: 'Temp Máx:', value: `${data.main.temp_max}°${degreeType.toUpperCase()}`, inline: false },
                { name: 'Humidade:', value: `${data.main.humidity}%`, inline: true },
                { name: 'Vento:', value: `${data.wind.speed} m/s`, inline: true },
                { name: 'Sigla do País:', value: `${data.sys.country}`, inline: false },
            )
            .setColor(0x1E90FF) // nao ponha ;
            .setTimestamp();

            await interaction.reply({ embeds: [embed] });

    } catch (error) {
        console.error(error);

        if (error.response && error.response.status === 404) {
            await interaction.reply('Cidade não encontrada. Verifique se o nome está correto.');
        } else {
            await interaction.reply('Desculpe, não consegui obter as informações do clima. Tente novamente mais tarde.');
        }
    }
}

module.exports = { climaCommand };
