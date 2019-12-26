import Bot from "../Bot";

abstract class AbstractStreamContext {
  readonly bot: Bot;

  constructor(bot: Bot) {
    this.bot = bot;
  }

  abstract onStreamStart(): void;
  abstract onStreamStop(): void;
}

export default AbstractStreamContext;
