import AbstractStreamContext from "./AbstractContext";
import httpsGetJsonPromise from "../../util/httpsGetJsonPromise";
import config from "../../config";
import { TextChannel } from "discord.js";

type Track = {
  spotify: string;
  title: string;
  artist: string;
};

class Radio2StreamContext extends AbstractStreamContext {
  private readonly history: Track[] = [];
  private interval: NodeJS.Timeout | undefined;

  onStreamStart() {
    this.refreshNowPlayingTrack();
    this.interval = setInterval(this.refreshNowPlayingTrack, 30 * 1000);
  }

  onStreamStop() {
    if (this.interval == null) {
      return;
    }

    clearInterval(this.interval);
  }

  onStreamPause() {
    if (this.interval == null) {
      return;
    }

    clearInterval(this.interval);
  }

  private refreshNowPlayingTrack = async () => {
    const json = await httpsGetJsonPromise<{ data: Track[] }>(
      "https://www.nporadio2.nl/api/tracks",
      {
        headers: {
          accept: "application/json, text/plain, */*"
        }
      }
    );

    // Add new tracks to track history
    const [firstTrackInHistory = { spotify: undefined }] = this.history || [];

    // Find out how many new tracks are fetched from the api
    const newTrackCount = json.data.findIndex(
      track => track.spotify === firstTrackInHistory.spotify
    );

    if (newTrackCount !== -1 && newTrackCount < 1) {
      return;
    }

    // Get the new tracks from the response
    const newTracks = json.data.slice(
      0,
      newTrackCount === 0 ? undefined : newTrackCount
    );

    this.history.unshift(...newTracks);

    // Get track that is now playing
    const [nowPlayingTrack] = newTracks;

    // Send message to update members of guild of song that is currently playing
    this.bot.client.guilds.forEach(guild => {
      const channel = guild.channels.get("531603947492999168") as TextChannel;

      if (channel == null || channel.type !== "text") {
        return;
      }

      // Send message about current track
      channel.send(
        `Deze liedje speelt nu: ${nowPlayingTrack.title} - ${nowPlayingTrack.artist}`
      );
    });
  };
}

export default Radio2StreamContext;
