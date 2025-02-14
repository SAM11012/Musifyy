
export interface Profile {
  id: string;
  username: string;
  avatar_url: string | null;
  created_at: string;
}

export interface Playlist {
  id: string;
  name: string;
  description: string | null;
  user_id: string;
  created_at: string;
  updated_at: string;
}

export interface PlaylistSong {
  id: string;
  playlist_id: string;
  video_id: string;
  title: string;
  thumbnail: string;
  channel_title: string;
  added_at: string;
}
