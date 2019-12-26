import { Message, Client } from "discord.js";
import config from "../config";
import ClientEvent from "../data/ClientEvent";
import AbstractMessageHandler from "./MessageHandler/AbstractMessageHandler";
import Radio2StreamContext from "./StreamContext/Radio2Context";
import AbstractContext from "./StreamContext/AbstractContext";

type BotOptions = {
  messageStrategies: typeof AbstractMessageHandler[];
};

class Bot {
  public readonly client: Client;
  public context?: AbstractContext;

  private readonly messageHandlers: AbstractMessageHandler[];

  constructor(options: BotOptions) {
    this.client = new Client();

    this.init();

    // Create message handlers instances
    this.messageHandlers = options.messageStrategies.map(
      // @ts-ignore
      Strategy => new Strategy(this)
    );
  }

  private init = async () => {
    // Setup client
    await this.client.login(config.bot.botToken);

    this.client.on(ClientEvent.Message, this.handleMessage);
    this.client.on(ClientEvent.MessageUpdate, this.handleMessage);
  };

  private handleMessage = async (message: Message) => {
    // Voice only works in guilds, if the message does not come from a guild,
    // we ignore it
    if (message == null || !message.guild) return;

    // Get message handlers that match the message content
    const matches = this.messageHandlers.reduce<AbstractMessageHandler[]>(
      (accumulator, strategy) => {
        if (
          // Matches regex pattern
          (strategy.pattern instanceof RegExp &&
            strategy.pattern.test(message.content)) ||
          // Exactly matches the message content
          strategy.pattern === message.content ||
          // No pattern defined
          strategy.pattern == null
        ) {
          accumulator.push(strategy);
        }

        return accumulator;
      },
      []
    );

    // Invoke message handler function on all matches
    matches.forEach(match => {
      match.onMessage(message);
    });
  };
}

export default Bot;
