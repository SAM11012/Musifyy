
const YOUTUBE_API_URL = 'https://www.googleapis.com/youtube/v3';

export interface YouTubeVideo {
  id: string;
  title: string;
  thumbnail: string;
  channelTitle: string;
}

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
