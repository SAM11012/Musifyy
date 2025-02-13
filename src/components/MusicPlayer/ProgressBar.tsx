
interface ProgressBarProps {
  currentTime: number;
  duration: number;
  onSeek: (time: number) => void;
}

export const ProgressBar = ({ currentTime, duration, onSeek }: ProgressBarProps) => {
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="w-full space-y-2">
      <input
        type="range"
        min="0"
        max={duration || 100}
        value={currentTime}
        onChange={(e) => onSeek(parseFloat(e.target.value))}
        className="w-full h-1 bg-music-border rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary"
      />
      <div className="flex justify-between text-sm text-music-textSecondary">
        <span>{formatTime(currentTime)}</span>
        <span>{formatTime(duration)}</span>
      </div>
    </div>
  );
};
