import https from "https";
import http from "http";
import { Message, VoiceConnection, TextChannel } from "discord.js";
import { IncomingMessage } from "http";

import Bot from "../Bot";
import Radio2StreamContext from "../StreamContext/Radio2Context";
import AbstractMessageHandler from "./AbstractMessageHandler";

// 3FM https://icecast.omroep.nl/3fm-bb-mp3
// Radio 2 https://icecast.omroep.nl/radio2-bb-mp3
// Offshore Music Radio http://bitsmitter.com:8006/omr.ogg

class StreamMessageHandler extends AbstractMessageHandler {
  readonly pattern = /\/stream( .+)?/i;

  constructor(bot: Bot) {
    super(bot);

    bot.client.voiceConnections.forEach(voiceConnection =>
      this.initStream(voiceConnection)
    );
  }

  async onMessage(message: Message) {
    if (message.member == null || message.member.voiceChannel == null) {
      message.reply("You need to join a voice channel first!");
      return;
    }

    const url = message.content.replace(/\/stream(\s+)?/i, "");

    this.initStream(await message.member.voiceChannel.join(), url);
  }

  initStream(connection: VoiceConnection, url?: string) {
    const realUrl =
      url === "" || url == null
        ? "https://icecast.omroep.nl/radio2-bb-mp3"
        : url;

    const httpClient = realUrl.startsWith("https") ? https : http;

    httpClient.get(realUrl, (res: IncomingMessage) => {
      connection.playStream(res);

      this.bot.context?.onStreamStop();
      this.bot.context = new Radio2StreamContext(this.bot);
      this.bot.context.onStreamStart();
    });

    // Send message
    const channel = connection.channel.guild.channels.get(
      "531603947492999168"
    ) as TextChannel;

    if (channel == null || channel.type !== "text") {
      return;
    }

    // Send message about current track
    channel.send(`Playing from ${realUrl}`);
  }
}

export default StreamMessageHandler;
