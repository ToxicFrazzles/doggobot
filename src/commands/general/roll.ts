import {SlashCommandBuilder, CommandInteraction, Client} from "discord.js";


module.exports = {
    data: new SlashCommandBuilder()
        .setName('roll')
        .setDescription('Rolls a dice')
        .addIntegerOption(option =>
            option
                .setName("sides")
                .setDescription("Number of sides on the dice")
                .setRequired(true)
                .setMinValue(2)
        ).addBooleanOption(option =>
            option.setName("show")
                .setDescription("Show the roll to everyone?")
                .setRequired(false)
        ).addIntegerOption(option =>
            option.setName("quantity")
                .setDescription("Number of dice to roll")
                .setRequired(false)
                .setMinValue(1)
        ),
    async execute(client: Client, interaction: CommandInteraction){
        // @ts-ignore
        const sides = interaction.options.get("sides")?.value;
        const show = interaction.options.get("show", false)?.value ?? false;
        const qty = interaction.options.get("quantity",false)?.value ?? 1;

        const results: number[] = [];
        let total = 0;
        // @ts-ignore
        for(let i=0; i<qty; ++i){
            // @ts-ignore
            const r = Math.floor(Math.random() * sides  + 1);
            total += r;
            results.push(r);
        }
        await interaction.reply({content: `Rolled ${qty}d${sides}\nScored: ${total}`, ephemeral: !show})
    },
};
