
interface NowPlayingProps {
  title: string;
  artist: string;
  thumbnail: string;
}

export const NowPlaying = ({ title, artist, thumbnail }: NowPlayingProps) => {
  return (
    <div className="flex items-center space-x-4 p-4 bg-zinc-800/50 backdrop-blur-xl border border-purple-500/20 rounded-xl animate-fade-in">
      <img
        src={thumbnail}
        alt={title}
        className="w-16 h-16 rounded-lg object-cover"
      />
      <div className="flex-1 min-w-0">
        <h3 className="text-lg font-semibold truncate text-white/90">{title}</h3>
        <p className="text-sm text-purple-300/60 truncate">{artist}</p>
      </div>
      <div className="flex space-x-1">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="w-1 bg-purple-500 rounded-full animate-music-bar"
            style={{
              animationDelay: `${i * 0.2}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
};
