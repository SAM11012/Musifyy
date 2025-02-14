
import { useState, useRef, useEffect } from "react";
import ReactPlayer from "react-player";
import { Controls } from "@/components/MusicPlayer/Controls";
import { ProgressBar } from "@/components/MusicPlayer/ProgressBar";
import { SearchBar } from "@/components/MusicPlayer/SearchBar";
import { NowPlaying } from "@/components/MusicPlayer/NowPlaying";
import { toast } from "sonner";
import { searchYouTubeVideos, getRandomBollywoodSongs, type YouTubeVideo } from "@/services/youtube";
import { Input } from "@/components/ui/input";

const Index = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [searchResults, setSearchResults] = useState<YouTubeVideo[]>([]);
  const [currentTrack, setCurrentTrack] = useState<YouTubeVideo | null>(null);
  const [apiKey, setApiKey] = useState("");
  const [bollywoodSongs, setBollywoodSongs] = useState<YouTubeVideo[]>([]);
  const [isLoadingBollywood, setIsLoadingBollywood] = useState(false);
  const playerRef = useRef<ReactPlayer | null>(null);

  const loadBollywoodSongs = async () => {
    if (!apiKey || isLoadingBollywood) return;
    
    try {
      setIsLoadingBollywood(true);
      const songs = await getRandomBollywoodSongs(apiKey);
      setBollywoodSongs(songs);
    } catch (error) {
      console.error("Error loading Bollywood songs:", error);
    } finally {
      setIsLoadingBollywood(false);
    }
  };

  const handleApiKeySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (apiKey.trim()) {
      toast.success("API key set successfully");
      loadBollywoodSongs();
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
    if (searchResults.length === 0 && bollywoodSongs.length === 0) return;
    
    const currentIndex = currentTrack
      ? searchResults.findIndex((track) => track.id === currentTrack.id)
      : -1;
    
    if (currentIndex === searchResults.length - 1) {
      // If we're at the end of search results, switch to Bollywood songs
      if (bollywoodSongs.length > 0) {
        setCurrentTrack(bollywoodSongs[0]);
        toast.success("Now playing Bollywood songs!");
      }
    } else if (currentIndex === -1 && bollywoodSongs.includes(currentTrack!)) {
      // If we're in Bollywood songs
      const bollywoodIndex = bollywoodSongs.findIndex((track) => track.id === currentTrack!.id);
      const nextBollywoodIndex = (bollywoodIndex + 1) % bollywoodSongs.length;
      setCurrentTrack(bollywoodSongs[nextBollywoodIndex]);
    } else {
      // Continue with search results
      const nextIndex = (currentIndex + 1) % searchResults.length;
      setCurrentTrack(searchResults[nextIndex]);
    }
    setIsPlaying(true);
  };

  const handlePrevious = () => {
    if (searchResults.length === 0 && bollywoodSongs.length === 0) return;
    
    const currentIndex = currentTrack
      ? searchResults.findIndex((track) => track.id === currentTrack.id)
      : -1;
    
    if (bollywoodSongs.includes(currentTrack!)) {
      // If we're in Bollywood songs
      const bollywoodIndex = bollywoodSongs.findIndex((track) => track.id === currentTrack!.id);
      const prevBollywoodIndex = bollywoodIndex <= 0 ? bollywoodSongs.length - 1 : bollywoodIndex - 1;
      setCurrentTrack(bollywoodSongs[prevBollywoodIndex]);
    } else {
      // Handle search results
      const prevIndex = currentIndex <= 0 ? searchResults.length - 1 : currentIndex - 1;
      setCurrentTrack(searchResults[prevIndex]);
    }
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

  const handleTrackEnd = () => {
    handleNext();
    if (currentTrack && searchResults.indexOf(currentTrack) === searchResults.length - 1) {
      loadBollywoodSongs(); // Load new Bollywood songs when current playlist ends
    }
  };

  return (
    <div 
      className="min-h-screen bg-black p-6 flex flex-col space-y-8"
      style={{
        backgroundImage: 'url(/images/photo-1506744038136-46273834b3fb)', // High resolution landscape image
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      <div className="flex-1 flex flex-col items-center space-y-8 max-w-4xl mx-auto w-full">
        {!apiKey && (
          <form onSubmit={handleApiKeySubmit} className="w-full max-w-md">
            <div className="space-y-4 p-6 bg-zinc-900/90 backdrop-blur-xl border border-purple-500/20 rounded-xl">
              <h2 className="text-lg font-semibold bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">Enter YouTube API Key</h2>
              <Input
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="Your YouTube API Key"
                className="bg-zinc-800/50 border-purple-500/20 focus:border-purple-500/50 transition-colors"
              />
              <button
                type="submit"
                className="w-full px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg transition-all duration-300 ease-out hover:scale-[1.02] active:scale-[0.98]"
              >
                Set API Key
              </button>
            </div>
          </form>
        )}

        <SearchBar onSearch={handleSearch} />
        
        <div className="w-full flex-1 rounded-xl bg-zinc-900/90 backdrop-blur-xl border border-purple-500/20 p-6 overflow-y-auto">
          {searchResults.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {searchResults.map((video) => (
                <div
                  key={video.id}
                  onClick={() => handleVideoSelect(video)}
                  className="group p-4 rounded-xl bg-zinc-800/80 hover:bg-zinc-800/90 cursor-pointer transition-all duration-300 hover:scale-[1.02] border border-purple-500/10 hover:border-purple-500/30"
                >
                  <div className="relative overflow-hidden rounded-lg">
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className="w-full aspect-video object-cover transform transition-transform group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <h3 className="font-medium text-sm line-clamp-2 mt-3 text-white/90">{video.title}</h3>
                  <p className="text-xs text-purple-300/60 mt-1">
                    {video.channelTitle}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-center h-full text-purple-300/60">
              {apiKey ? "Search for your favorite music to start playing" : "Please set your YouTube API key to start"}
            </div>
          )}
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 p-6 bg-zinc-900/95 backdrop-blur-xl border-t border-purple-500/20">
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
                onEnded={handleTrackEnd}
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
