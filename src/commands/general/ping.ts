import {SlashCommandBuilder, CommandInteraction} from "discord.js";
import {Client} from "../../lib/client";


module.exports = {
    data: new SlashCommandBuilder().setName('ping').setDescription('Replies with Pong!'),
    async execute(client: Client, interaction: CommandInteraction){
        const delay = Date.now() - interaction.createdTimestamp;
        await interaction.reply({content: `Pong! ${delay}ms`, ephemeral: true});
    },
};
