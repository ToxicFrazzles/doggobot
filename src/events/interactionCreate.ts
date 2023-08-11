import {Interaction} from "discord.js";
import {Client} from "../lib/client"


module.exports = async (client: Client, interaction: Interaction) => {
    if(interaction.isCommand() || interaction.isUserContextMenuCommand()){
        const cmd = client.commands.get(interaction.commandName);
        if(cmd) cmd.execute(client, interaction).catch((err: Error) => {
            client.emit("errorCreate", err, interaction.commandName, interaction)
        })
    }
};