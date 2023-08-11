import Discord from "discord.js"

type CommandCallback = (client: Client, interaction: Discord.CommandInteraction) => Promise<void>;

export class Client extends Discord.Client {
    commands: Discord.Collection<string,{data: Discord.SlashCommandBuilder, execute: CommandCallback}> = new Discord.Collection();
}