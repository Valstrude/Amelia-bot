const { config } = require('dotenv');
const { Client, ActivityType } = require('discord.js');
const { OpenAI } = require('openai');
const { registerCommands } = require('./registerCommands.js');
const { olaCommand } = require('./olaCommand.js'); // put ./commands/olaCommand for debug in visual code
const { jokenpoCommand } = require('./jokenpoCommand.js'); // put ./commands/jokenpoCommand for debug in visual code
const { abraçarCommand } = require('./abraçarCommand.js'); // put ./commands/abraçarCommand for debug in visual code
const { climaCommand } = require('./climaCommand.js'); // put ./commands/climaCommand for debug in visual code

config();

const client = new Client({
    intents: ['Guilds', 'GuildMembers', 'GuildMessages', 'MessageContent']
});

function reconnectbot() {
    console.log("Estou tentando voltar...");
    client.login(process.env.TOKEN).then(() => {
        console.log("Estou de volta!!!");
    }).catch(error => {
        console.error("Não consegui entrar novamente.", error);
        setTimeout(reconnectbot, 5000); // tenta reconectar apos um certo tempo
    });
}

// evento quando o bot liga
client.on("ready", async () => {
    const guild_count = await client.guilds.fetch(); // Busca todos os servidores
    const total_guilds = guild_count.size;

    console.log(`${client.user.displayName} chegou!`)
    // define o status do bot
    client.user.setStatus('online')
    client.user.setActivity(`${total_guilds -1} servidores!`, { // -1 porque 1 é servidor meu que eu exclui
        type: ActivityType.Watching
    });
    registerCommands(client);
})

client.on('shardDisconnect', (event, shardId) => {
    console.log(`Cai do server... (shard ${shardId}. Tentando me reconectar...`);
    reconnectbot();
})

client.on('interactionCreate', async interaction => {
    // Verifica se a mensagem foi enviada pelo próprio bot para evitar loops infinitos
    if (!interaction.isCommand()) return;

    // Chama a função correspondente ao comando
    switch (interaction.commandName) {
        case 'olá':
            await olaCommand(interaction);
            break;
        case 'jokenpo':
            await jokenpoCommand(interaction);
            break;
        case 'abraçar':
            await abraçarCommand(interaction);
            break;
        case 'clima':
            await climaCommand(interaction);
            break;
        default: // Caso o comando não seja reconhecido
            console.error('Comando não reconhecido:', interaction.commandName);
            break;
    }
});

const PREFIXO = "/";
const CANAIS = ['1168710991689830470', '1226324903096094840', '1226761935924760637']

// openai constante e constante de disabilitação da api

const api_break = true
const openai = new OpenAI({
    maxRetries: 1,
    apiKey: process.env.OPENAI_KEY,
})

client.on("messageCreate", async (message) => {
    if (message.author.bot) return;
    if (message.content.startsWith(PREFIXO)) return;
    if (!CANAIS.includes(message.channelId)) return;

    if (api_break == false) {
        const response = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo', // text babbage-002 // model gpt-3.5-turbo
        temperature: 1,
        max_tokens: 5,
        messages: [
            {
                //name:
                role: 'system',
                content: 'Mensagens da Amelia'
            },
            {
                //name:
                role: 'user',
                content: message.content,
            }
        ]
    }).catch((error) => console.error('Openai Error:\n', error));

    message.reply(response.choices[0].message.content);
    }
});

client.login(process.env.TOKEN).catch(error => {
    console.log('Não consegui entrar no discord, por causa disso:', error);
    reconnectbot(); // tenta reconectar se nao funfar
})
