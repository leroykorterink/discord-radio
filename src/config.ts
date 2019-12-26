import BotPermissions from "./data/Permissions";

const config = {
  environment: process.env.NODE_ENV,
  bot: {
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    botToken: process.env.BOT_TOKEN,
    permissionBit: BotPermissions.Connect
  }
};

if (config.bot.clientId == null) {
  throw new Error("CLIENT_ID environment variable is missing");
}

if (config.bot.clientSecret == null) {
  throw new Error("CLIENT_ID environment variable is missing");
}

if (config.bot.botToken == null) {
  throw new Error("CLIENT_ID environment variable is missing");
}

export default config;
