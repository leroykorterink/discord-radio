import { Message } from "discord.js";
import AbstractMessageHandler from "./AbstractMessageHandler";

class StopStreamMessageHandler extends AbstractMessageHandler {
  readonly pattern = /\/stopstream/i;

  async onMessage(message: Message) {
    if (message.member == null || message.member.voiceChannel == null) {
      message.reply("You need to join a voice channel first!");
      return;
    }

    this.bot.context?.onStreamStop();

    message.member.voiceChannel.leave();
  }
}

export default StopStreamMessageHandler;
