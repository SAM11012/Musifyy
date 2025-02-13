
import { useEffect, useState } from "react";
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX } from "lucide-react";

interface ControlsProps {
  isPlaying: boolean;
  onPlayPause: () => void;
  onNext: () => void;
  onPrevious: () => void;
  volume: number;
  onVolumeChange: (value: number) => void;
}

export const Controls = ({
  isPlaying,
  onPlayPause,
  onNext,
  onPrevious,
  volume,
  onVolumeChange,
}: ControlsProps) => {
  const [isMuted, setIsMuted] = useState(false);
  const [previousVolume, setPreviousVolume] = useState(1);

  const handleVolumeClick = () => {
    if (isMuted) {
      onVolumeChange(previousVolume);
      setIsMuted(false);
    } else {
      setPreviousVolume(volume);
      onVolumeChange(0);
      setIsMuted(true);
    }
  };

  useEffect(() => {
    if (volume === 0) {
      setIsMuted(true);
    } else {
      setIsMuted(false);
    }
  }, [volume]);

  return (
    <div className="flex items-center justify-center space-x-6">
      <button
        onClick={onPrevious}
        className="p-2 rounded-full hover:bg-music-hover button-transition"
      >
        <SkipBack className="w-5 h-5" />
      </button>
      
      <button
        onClick={onPlayPause}
        className="p-4 rounded-full bg-primary hover:bg-primary-hover button-transition"
      >
        {isPlaying ? (
          <Pause className="w-6 h-6" fill="currentColor" />
        ) : (
          <Play className="w-6 h-6" fill="currentColor" />
        )}
      </button>
      
      <button
        onClick={onNext}
        className="p-2 rounded-full hover:bg-music-hover button-transition"
      >
        <SkipForward className="w-5 h-5" />
      </button>

      <div className="flex items-center space-x-2">
        <button
          onClick={handleVolumeClick}
          className="p-2 rounded-full hover:bg-music-hover button-transition"
        >
          {isMuted ? (
            <VolumeX className="w-5 h-5" />
          ) : (
            <Volume2 className="w-5 h-5" />
          )}
        </button>
        
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={(e) => onVolumeChange(parseFloat(e.target.value))}
          className="w-24 h-1 bg-music-border rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary"
        />
      </div>
    </div>
  );
};
