import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

const app = express();
app.use(cors());

const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
const REFRESH_TOKEN = process.env.SPOTIFY_REFRESH_TOKEN;

const BASIC_AUTH = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64');
const TOKEN_ENDPOINT = 'https://accounts.spotify.com/api/token';
const NOW_PLAYING_ENDPOINT = 'https://api.spotify.com/v1/me/player/currently-playing';
const RECENTLY_PLAYED_ENDPOINT = 'https://api.spotify.com/v1/me/player/recently-played?limit=1';

async function getAccessToken() {
  const response = await fetch(TOKEN_ENDPOINT, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${BASIC_AUTH}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: REFRESH_TOKEN,
    }),
  });

  return response.json();
}

app.get('/api/spotify', async (req, res) => {
  try {
    const { access_token } = await getAccessToken();

    // 1. Check currently playing
    const nowPlayingRes = await fetch(NOW_PLAYING_ENDPOINT, {
      headers: { Authorization: `Bearer ${access_token}` },
    });

    if (nowPlayingRes.status === 200) {
      const song = await nowPlayingRes.json();
      if (song && song.item) {
        return res.json({
          isPlaying: song.is_playing,
          title: song.item.name,
          artist: song.item.artists.map((a) => a.name).join(', '),
          album: song.item.album.name,
          albumImageUrl: song.item.album.images[0]?.url,
          songUrl: song.item.external_urls.spotify,
        });
      }
    }

    // 2. Fallback to recently played
    const recentRes = await fetch(RECENTLY_PLAYED_ENDPOINT, {
      headers: { Authorization: `Bearer ${access_token}` },
    });

    if (recentRes.status === 200) {
      const recent = await recentRes.json();
      const lastTrack = recent.items[0]?.track;

      if (lastTrack) {
        return res.json({
          isPlaying: false,
          title: lastTrack.name,
          artist: lastTrack.artists.map((a) => a.name).join(', '),
          album: lastTrack.album.name,
          albumImageUrl: lastTrack.album.images[0]?.url,
          songUrl: lastTrack.external_urls.spotify,
        });
      }
    }

    return res.json({ isPlaying: false });
  } catch (error) {
    console.error('Spotify API Error:', error);
    return res.status(500).json({ error: 'Failed to fetch Spotify track' });
  }
});

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log(`Spotify server running on port ${PORT}`);
});