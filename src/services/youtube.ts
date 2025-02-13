
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
  "Bollywood Hits"
];

export const getRandomBollywoodSongs = async (
  apiKey: string
): Promise<YouTubeVideo[]> => {
  const randomQuery = BOLLYWOOD_SONGS_QUERIES[Math.floor(Math.random() * BOLLYWOOD_SONGS_QUERIES.length)];
  return searchYouTubeVideos(randomQuery, apiKey);
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
