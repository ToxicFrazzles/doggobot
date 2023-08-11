import * as fs from "fs";
import * as path from "path";
import {Client} from "./lib/client"

const client = new Client({
    intents: ["Guilds", "GuildMessages"]
});

const handlersPath = path.join(__dirname, "handlers");
fs.readdirSync(handlersPath).forEach(dirs => {
    const handlersDir = path.join(handlersPath, dirs);
    const handlers = fs.readdirSync(handlersDir).filter(files => files.endsWith(".js"));
    for(const file of handlers){
        require(path.join(handlersDir, file))(client);
    }
});



const mainConfig = JSON.parse(fs.readFileSync("configs/main.json", "utf8"));


client.login(mainConfig.token);

