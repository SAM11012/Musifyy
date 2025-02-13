
const YOUTUBE_API_URL = 'https://www.googleapis.com/youtube/v3';

export interface YouTubeVideo {
  id: string;
  title: string;
  thumbnail: string;
  channelTitle: string;
}

const BOLLYWOOD_SONGS_QUERIES = [
  "Latest Bollywood Songs",
  "Best Hindi Songs",
  "Popular Bollywood Music",
  "New Hindi Songs",
  "Bollywood Hits",
  "Old Bollywood Songs",
  "Romantic Hindi Songs",
  "Party Hindi Songs",
  "Arijit Singh Songs",
  "Atif Aslam Songs",
  "Neha Kakkar Songs",
  "Jubin Nautiyal Songs",
  "A.R. Rahman Songs",
  "Pritam Songs",
  "Bollywood Dance Songs",
  "Bollywood Sad Songs",
  "90s Bollywood Songs",
  "Bollywood Wedding Songs",
  "Kumar Sanu Songs",
  "Lata Mangeshkar Songs"
];

export const getRandomBollywoodSongs = async (
  apiKey: string
): Promise<YouTubeVideo[]> => {
  // Get multiple random queries to increase variety
  const shuffledQueries = [...BOLLYWOOD_SONGS_QUERIES]
    .sort(() => Math.random() - 0.5)
    .slice(0, 3);
  
  try {
    // Fetch songs for each random query
    const songsPromises = shuffledQueries.map(query => 
      searchYouTubeVideos(query, apiKey)
    );
    
    const songsArrays = await Promise.all(songsPromises);
    
    // Combine and shuffle all songs
    const allSongs = songsArrays
      .flat()
      .sort(() => Math.random() - 0.5);
    
    // Return unique songs based on ID
    const uniqueSongs = Array.from(
      new Map(allSongs.map(song => [song.id, song])).values()
    );
    
    return uniqueSongs;
  } catch (error) {
    console.error('Error fetching random Bollywood songs:', error);
    throw error;
  }
};

export const searchYouTubeVideos = async (
  query: string,
  apiKey: string
): Promise<YouTubeVideo[]> => {
  try {
    const response = await fetch(
      `${YOUTUBE_API_URL}/search?part=snippet&maxResults=10&q=${encodeURIComponent(
        query
      )}&type=video&key=${apiKey}`
    );

    if (!response.ok) {
      throw new Error('YouTube API request failed');
    }

    const data = await response.json();
    
    return data.items.map((item: any) => ({
      id: item.id.videoId,
      title: item.snippet.title,
      thumbnail: item.snippet.thumbnails.medium.url,
      channelTitle: item.snippet.channelTitle,
    }));
  } catch (error) {
    console.error('Error searching YouTube videos:', error);
    throw error;
  }
};
