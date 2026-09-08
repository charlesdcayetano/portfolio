import React, { useState, useEffect } from 'react';
import { ExternalLink, Disc } from 'lucide-react';

interface SpotifyData {
  isPlaying: boolean;
  title: string;
  artist: string;
  album: string;
  albumImageUrl: string;
  songUrl: string;
}

declare global {
  interface ImportMeta {
    readonly env: {
      readonly VITE_SPOTIFY_API_URL?: string;
    };
  }
}

export const SpotifyWidget: React.FC = () => {
  const [data, setData] = useState<SpotifyData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const apiUrl =
    import.meta.env.VITE_SPOTIFY_API_URL || 'http://localhost:3001/api/spotify';

  useEffect(() => {
    const fetchSpotifyStatus = async () => {
      try {
        const res = await fetch(apiUrl);
        if (res.ok) {
          const json = await res.json();
          setData(json);
        }
      } catch (err) {
        console.error('Failed to fetch Spotify status:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchSpotifyStatus();
    const interval = setInterval(fetchSpotifyStatus, 15000);
    return () => clearInterval(interval);
  }, [apiUrl]);

  return (
    <div className="rounded-xl border border-g200 bg-bg p-2.5 my-3 select-none">
      <div className="flex items-center justify-between mb-2 pb-1.5 border-b border-g100 font-mono text-[9.5px] text-g400">
        <div className="flex items-center gap-1.5">
          <svg
            className={`h-3.5 w-3.5 shrink-0 ${
              data?.isPlaying ? 'text-[#1DB954]' : 'text-g400'
            }`}
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M12 0C5.376 0 0 5.376 0 12s5.376 12 12 12 12-5.376 12-12S18.624 0 12 0zm5.521 17.341c-.218.358-.684.471-1.042.253-2.859-1.748-6.457-2.143-10.697-1.173-.404.093-.811-.161-.904-.565-.093-.404.161-.811.565-.904 4.639-1.06 8.604-.613 11.825 1.353.358.218.471.684.253 1.036zm1.472-3.277c-.274.446-.857.587-1.303.313-3.272-2.009-8.259-2.592-12.128-1.417-.5.152-1.028-.13-1.18-.631-.152-.5.13-1.028.631-1.18 4.417-1.341 9.914-.693 13.667 1.611.446.274.587.857.313 1.304zm.154-3.411c-3.923-2.329-10.399-2.544-14.154-1.399-.613.187-1.258-.163-1.445-.776-.187-.613.163-1.258.776-1.445 4.312-1.309 11.457-1.054 15.968 1.623.551.327.734 1.04.407 1.591-.327.551-1.04.734-1.552.406z" />
          </svg>
          <span className="uppercase tracking-wider font-semibold">
            {data?.isPlaying ? 'Now Playing' : 'Spotify'}
          </span>
        </div>

        {data?.isPlaying ? (
          <div className="flex items-center gap-0.5 h-2.5">
            <span className="w-0.5 h-full bg-[#1DB954] animate-pulse" />
            <span className="w-0.5 h-2/3 bg-[#1DB954] animate-pulse delay-75" />
            <span className="w-0.5 h-full bg-[#1DB954] animate-pulse delay-150" />
          </div>
        ) : (
          <span className="text-[9px] text-g400">OFFLINE</span>
        )}
      </div>

      {loading ? (
        <div className="flex items-center gap-2 animate-pulse">
          <div className="h-8 w-8 rounded bg-g200 shrink-0" />
          <div className="space-y-1 flex-1">
            <div className="h-2.5 w-3/4 rounded bg-g200" />
            <div className="h-2 w-1/2 rounded bg-g200" />
          </div>
        </div>
      ) : data && data.title ? (
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 min-w-0">
            <img
              src={data.albumImageUrl}
              alt={data.album}
              className="h-8 w-8 rounded object-cover border border-g200 shrink-0"
            />
            <div className="min-w-0">
              <a
                href={data.songUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-sans text-[11.5px] font-bold text-ink hover:underline block truncate leading-tight"
              >
                {data.title}
              </a>
              <p className="font-mono text-[9.5px] text-g500 truncate mt-0.5">
                {data.artist}
              </p>
            </div>
          </div>

          <a
            href={data.songUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Listen on Spotify"
            className="rounded border border-g200 p-1 text-g400 transition-colors hover:border-ink hover:bg-ink hover:text-bg shrink-0"
          >
            <ExternalLink className="h-3 w-3" />
          </a>
        </div>
      ) : (
        <div className="flex items-center gap-2 text-g400 font-mono text-[10.5px]">
          <Disc className="h-3.5 w-3.5 shrink-0" />
          <span>No track played</span>
        </div>
      )}
    </div>
  );
};