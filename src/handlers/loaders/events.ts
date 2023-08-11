import {Collection, Events} from "discord.js";
import {Client} from "../../lib/client";
import path from "path";
import fs from "fs";

module.exports = (client: Client) => {
    const eventsPath = path.join(__dirname,"../../", "events");
    const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith(".js"));
    for(const file of eventFiles){
        const filePath = path.join(eventsPath, file);
        const event = require(filePath);

        const eventName = file.split(".")[0];
        const capEventName = eventName.charAt(0).toUpperCase() + eventName.slice(1);

        const clientEvents: string[] = Object.keys(Events).filter(x => x == capEventName);

        if(!clientEvents.includes(capEventName)){
            client.on(eventName, event.bind(null, client)).setMaxListeners(0);
            // console.log(`Registered event: ${eventName}`);
        }else{
            // @ts-ignore
            client.on(Events[capEventName], event.bind(null, client)).setMaxListeners(0);
            // console.log(`Registered event: ${capEventName}`);
        }
    }
}