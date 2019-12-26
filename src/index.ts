import "dotenv/config";

import { URL } from "url";
import config from "./config";

import Bot from "./lib/Bot";

import StreamMessageHandler from "./lib/MessageHandler/StreamMessageHandler";
import StopStreamMessageHandler from "./lib/MessageHandler/StopStreamMessageHandler";

const url = new URL(
  `https://discordapp.com/oauth2/authorize?client_id=${config.bot.clientId}&scope=bot&permissions=${config.bot.permissionBit}`
);

console.log(`Running application as in the ${config.environment} environment`);
console.log(`Add the bot via ${url.href}`);

// Create new bot instance
new Bot({
  messageStrategies: [StreamMessageHandler, StopStreamMessageHandler]
});
