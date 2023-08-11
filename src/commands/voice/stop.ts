import {SlashCommandBuilder, CommandInteraction} from "discord.js";
import {getVoiceConnection, VoiceConnectionStatus} from "@discordjs/voice";
import {Client} from "../../lib/client";


module.exports = {
    data: new SlashCommandBuilder().setName('stop').setDescription('Stops playing audio and leaves the voice channel'),
    async execute(client: Client, interaction: CommandInteraction){
        await interaction.reply({content: `Not yet implemented. Don't expect too much to happen`, ephemeral: true});

        const guild = interaction.guild
        if(!guild) return;


        const channel = await guild.channels.fetch().then((channels) => {
            for(const c of channels.values()) {
                if(!c?.isVoiceBased()) continue;
                if(c.members.filter(x => x.id == interaction.user.id).first()) return c;
            }
        })
        if(!channel || !channel.joinable) return;

        const vc = getVoiceConnection(guild.id);
        if(!vc) return;
        console.log("Disconnecting...")
        vc.destroy();

    },
};
