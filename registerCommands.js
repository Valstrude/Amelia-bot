const { EmbedBuilder } = require('discord.js');

async function registerCommands(client) {
    const commands = [
        {
            name: 'olá',
            description: 'eu vou retornar seu olá',
        },
        {
            name: 'jokenpo',
            description: 'Jogue Jokenpo comigo',
            options: [
                {
                    name: 'opções',
                    description: 'Escolha: Pedra, Papel ou Tesoura',
                    type: 3,
                    required: true,
                    choices: [
                        {
                            name: '🧱',
                            value: "Pedra"
                        },
                        {
                            name: '📄',
                            value: "Papel"
                        },
                        {
                            name: '✂️',
                            value: "Tesoura"
                        }
                    ]
                }
            ]
        },
        {
            name: 'abraçar',
            description: 'Ajudo você a abraçar alguém.',
            options: [
                {
                    name: 'usuário',
                    description: 'Quem você quer abraçar?',
                    type: 6, // user type, 3 string
                    required: true,
                }
            ]
        },
        {
            name: 'clima',
            description: 'quer saber a previsão do tempo de algum lugar?',
            options: [
                {
                    name: 'local',
                    description: 'local que deseja saber a previsão do tempo.',
                    value: 'location',
                    type: 3, // 3 string
                    required: true,
                },
                {
                    name: 'temperatura',
                    description: 'Fahrenheit ou Celsius',
                    value: 'degreeType',
                    type: 3, // 3 string
                    required: true,
                    choices: [
                        {
                            name: 'Fahrenheit',
                            value: 'f',
                        },
                        {
                            name: 'Celsius',
                            value: 'c',
                        }
                    ]
                }
            ]
        },
    ];

    // registra os slashcommands globalmente
    try {
        await client.application.commands.set(commands);
        console.log('comandos registrados com sucesso!');
    } catch (error) {
        console.log('erro ao registrar comando: ', error);
    }
}

module.exports = { registerCommands };
