
import { useState } from "react";
import { Controls } from "@/components/MusicPlayer/Controls";
import { ProgressBar } from "@/components/MusicPlayer/ProgressBar";
import { SearchBar } from "@/components/MusicPlayer/SearchBar";
import { NowPlaying } from "@/components/MusicPlayer/NowPlaying";
import { toast } from "sonner";

const Index = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  // Placeholder data - will be replaced with YouTube API integration
  const currentTrack = {
    title: "Welcome to VibeOcean",
    artist: "Start searching for your favorite music",
    thumbnail: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
  };

  const handleSearch = (query: string) => {
    toast.info(`Searching for: ${query}`);
    // Will implement YouTube API search here
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
    // Will implement actual playback control here
  };

  const handleNext = () => {
    toast.info("Next track");
    // Will implement next track logic here
  };

  const handlePrevious = () => {
    toast.info("Previous track");
    // Will implement previous track logic here
  };

  const handleSeek = (time: number) => {
    setCurrentTime(time);
    // Will implement seeking logic here
  };

  const handleVolumeChange = (value: number) => {
    setVolume(value);
    // Will implement volume control here
  };

  return (
    <div className="min-h-screen p-6 flex flex-col space-y-8">
      <div className="flex-1 flex flex-col items-center space-y-8 max-w-4xl mx-auto w-full">
        <SearchBar onSearch={handleSearch} />
        
        <div className="w-full flex-1 rounded-xl music-glass p-6">
          {/* This will be replaced with search results */}
          <div className="flex items-center justify-center h-full text-music-textSecondary">
            Search for your favorite music to start playing
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 p-6 music-glass border-t border-music-border">
        <div className="max-w-4xl mx-auto space-y-4">
          <NowPlaying {...currentTrack} />
          
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
