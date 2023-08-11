import {SlashCommandBuilder, CommandInteraction} from "discord.js";
import {joinVoiceChannel, VoiceConnectionStatus} from "@discordjs/voice";
import {Client} from "../../lib/client";


module.exports = {
    data: new SlashCommandBuilder().setName('play').setDescription('Plays the requested audio in your voice channel'),
    async execute(client: Client, interaction: CommandInteraction){
        await interaction.reply({content: `Not yet implemented. Don't expect too much to happen`, ephemeral: true});

        const guild = interaction.guild
        if(!guild) return;


        const channel = await guild.channels.fetch().then((channels) => {
            for(const c of channels.values()) {
                // if(c.)
                if(!c?.isVoiceBased()) continue;
                // console.log("Voice Channel:", c.name);
                // console.log(c.members.keys())
                // console.log(interaction.user.id)
                if(c.members.filter(x => x.id == interaction.user.id).first()) return c;
            }
        })
        if(!channel || !channel.joinable) return;
        console.log("Channel: ", channel.name)

        const vc = joinVoiceChannel({
            channelId: channel.id,
            guildId: channel.guild.id,
            adapterCreator: channel.guild.voiceAdapterCreator,
        });
        console.log(vc)

        vc.on(VoiceConnectionStatus.Ready, () => {
            console.log("Voice connection ready!");
        });

    },
};
