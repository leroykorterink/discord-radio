import { Message } from "discord.js";
import Bot from "../Bot";

abstract class AbstractMessageHandler {
  readonly bot: Bot;
  abstract readonly pattern: RegExp | string | undefined;

  constructor(bot: Bot) {
    this.bot = bot;
  }

  abstract onMessage(message: Message): void;
}

export default AbstractMessageHandler;
