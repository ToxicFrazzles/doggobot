import {Client} from "../../lib/client"
import path from "path";
import fs from "fs";

module.exports = (client: Client) => {
    const commandsPath = path.join(__dirname,"../../", "commands");
    fs.readdirSync(commandsPath).forEach(dir => {
        dir = path.join(commandsPath, dir);
        const commandFiles = fs.readdirSync(dir).filter(file => file.endsWith(".js"));
        for(const file of commandFiles){
            const filePath = path.join(dir, file);
            const command = require(filePath);
            if('data' in command && 'execute' in command){
                client.commands.set(command.data.name, command);
            }else{
                console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
            }
        }
    });

}