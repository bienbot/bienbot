const wait = require('util').promisify(setTimeout);
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Replies with Pong!')
        .addSubcommand((subcommand) =>
            subcommand
                .setName('user')
                .setDescription('info about user')
                .addUserOption((option) =>
                    option.setName('target').setDescription('the user')
                )
        )
        .addSubcommand((subcommand) =>
            subcommand.setName('server').setDescription('Info about the server')
        ),
    async execute(interaction) {
        await interaction.reply({ content: 'Pong', ephemeral: true });
        if (interaction.options.getSubcommand() === 'user') {
            console.log('subcommand:)');
            const user = interaction.options.getUser('target');
            console.log(user);
        } else if (interaction.options.getSubcommand() === 'server') {
            console.log('server');
        }
    },
};
