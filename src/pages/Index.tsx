
import { useState, useRef, useEffect } from "react";
import ReactPlayer from "react-player";
import { Controls } from "@/components/MusicPlayer/Controls";
import { ProgressBar } from "@/components/MusicPlayer/ProgressBar";
import { SearchBar } from "@/components/MusicPlayer/SearchBar";
import { NowPlaying } from "@/components/MusicPlayer/NowPlaying";
import { toast } from "sonner";
import { searchYouTubeVideos, type YouTubeVideo } from "@/services/youtube";
import { Input } from "@/components/ui/input";

const Index = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [searchResults, setSearchResults] = useState<YouTubeVideo[]>([]);
  const [currentTrack, setCurrentTrack] = useState<YouTubeVideo | null>(null);
  const [apiKey, setApiKey] = useState("");
  const playerRef = useRef<ReactPlayer | null>(null);

  const handleApiKeySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (apiKey.trim()) {
      toast.success("API key set successfully");
    }
  };

  const handleSearch = async (query: string) => {
    try {
      if (!apiKey) {
        toast.error("Please set up your YouTube API key first");
        return;
      }

      const videos = await searchYouTubeVideos(query, apiKey);
      setSearchResults(videos);
    } catch (error) {
      toast.error("Error searching for videos");
    }
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleNext = () => {
    if (searchResults.length === 0) return;
    
    const currentIndex = currentTrack
      ? searchResults.findIndex((track) => track.id === currentTrack.id)
      : -1;
    
    const nextIndex = (currentIndex + 1) % searchResults.length;
    setCurrentTrack(searchResults[nextIndex]);
    setIsPlaying(true);
  };

  const handlePrevious = () => {
    if (searchResults.length === 0) return;
    
    const currentIndex = currentTrack
      ? searchResults.findIndex((track) => track.id === currentTrack.id)
      : -1;
    
    const prevIndex = currentIndex <= 0 ? searchResults.length - 1 : currentIndex - 1;
    setCurrentTrack(searchResults[prevIndex]);
    setIsPlaying(true);
  };

  const handleSeek = (time: number) => {
    playerRef.current?.seekTo(time);
    setCurrentTime(time);
  };

  const handleVolumeChange = (value: number) => {
    setVolume(value);
  };

  const handleVideoSelect = (video: YouTubeVideo) => {
    setCurrentTrack(video);
    setIsPlaying(true);
  };

  return (
    <div className="min-h-screen p-6 flex flex-col space-y-8">
      <div className="flex-1 flex flex-col items-center space-y-8 max-w-4xl mx-auto w-full">
        {!apiKey && (
          <form onSubmit={handleApiKeySubmit} className="w-full max-w-md">
            <div className="space-y-4 p-6 music-glass rounded-xl">
              <h2 className="text-lg font-semibold">Enter YouTube API Key</h2>
              <Input
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="Your YouTube API Key"
                className="bg-music-card border-music-border"
              />
              <button
                type="submit"
                className="w-full px-4 py-2 bg-primary hover:bg-primary-hover rounded-lg transition-colors"
              >
                Set API Key
              </button>
            </div>
          </form>
        )}

        <SearchBar onSearch={handleSearch} />
        
        <div className="w-full flex-1 rounded-xl music-glass p-6 overflow-y-auto">
          {searchResults.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {searchResults.map((video) => (
                <div
                  key={video.id}
                  onClick={() => handleVideoSelect(video)}
                  className="p-4 rounded-xl bg-music-card hover:bg-music-hover cursor-pointer transition-colors"
                >
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full aspect-video rounded-lg object-cover mb-3"
                  />
                  <h3 className="font-medium text-sm line-clamp-2">{video.title}</h3>
                  <p className="text-xs text-music-textSecondary mt-1">
                    {video.channelTitle}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-center h-full text-music-textSecondary">
              {apiKey ? "Search for your favorite music to start playing" : "Please set your YouTube API key to start"}
            </div>
          )}
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 p-6 music-glass border-t border-music-border">
        <div className="max-w-4xl mx-auto space-y-4">
          {currentTrack && (
            <>
              <ReactPlayer
                ref={playerRef}
                url={`https://www.youtube.com/watch?v=${currentTrack.id}`}
                playing={isPlaying}
                volume={volume}
                height={0}
                width={0}
                onProgress={({ playedSeconds }) => setCurrentTime(playedSeconds)}
                onDuration={setDuration}
                onEnded={handleNext}
                config={{
                  youtube: {
                    playerVars: { controls: 0 }
                  }
                }}
              />
              
              <NowPlaying
                title={currentTrack.title}
                artist={currentTrack.channelTitle}
                thumbnail={currentTrack.thumbnail}
              />
            </>
          )}
          
          <ProgressBar
            currentTime={currentTime}
            duration={duration}
            onSeek={handleSeek}
          />
          
          <Controls
            isPlaying={isPlaying}
            onPlayPause={handlePlayPause}
            onNext={handleNext}
            onPrevious={handlePrevious}
            volume={volume}
            onVolumeChange={handleVolumeChange}
          />
        </div>
      </div>
    </div>
  );
};

export default Index;
