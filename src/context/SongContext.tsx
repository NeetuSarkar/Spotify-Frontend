import axios from "axios";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import Album from "../pages/Album";

const server = "http://3.90.226.150:8000";

// Song and Album interfaces
export interface Song {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  audio: string;
  album: string;
}

export interface Album {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
}

// Context type definition
interface SongContextType {
  songs: Song[];
  song: Song | null;
  loading: boolean;
  selectedSong: string | null;
  setSelectedSong: (id: string) => void;
  isPlaying: boolean;
  setIsPlaying: (value: boolean) => void;
  albums: Album[];
  fetchSingleSong: () => Promise<void>;
  nextSong: () => void;
  prevSong: () => void;
  albumSong: Song[];
  albumData: Album | null;
  fetchAlbumSongs: (id: string) => Promise<void>;
  fetchSongs: () => Promise<void>;
  fetchAlbums: () => Promise<void>;
}

const SongContext = createContext<SongContextType | undefined>(undefined);

// Provider Props
interface SongProviderProps {
  children: ReactNode;
}

export const SongProvider: React.FC<SongProviderProps> = ({ children }) => {
  const [songs, setSongs] = useState<Song[]>([]);
  const [song, setSong] = useState<Song | null>(null);
  const [albums, setAlbums] = useState<Album[]>([]);
  const [selectedSong, setSelectedSong] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [index, setIndex] = useState<number>(0);

  // Fetch all songs
  const fetchSongs = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await axios.get<Song[]>(`${server}/api/v1/song/all`);
      setSongs(data);
      if (data.length > 0) {
        setSelectedSong(data[0].id.toString());
        setIndex(0);
      }
      setIsPlaying(false);
    } catch (error) {
      console.log("Error fetching songs:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch all albums
  const fetchAlbums = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await axios.get<Album[]>(`${server}/api/v1/album/all`);
      setAlbums(data);
    } catch (error) {
      console.log("Error fetching albums:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch single song details
  const fetchSingleSong = useCallback(async () => {
    if (!selectedSong) return;
    try {
      const { data } = await axios.get<Song>(
        `${server}/api/v1/song/${selectedSong}`
      );
      setSong(data);
    } catch (error) {
      console.log("Error fetching single song:", error);
    }
  }, [selectedSong]);

  // Move to next song
  const nextSong = useCallback(() => {
    if (songs.length === 0) return;
    const newIndex = index === songs.length - 1 ? 0 : index + 1;
    setIndex(newIndex);
    setSelectedSong(songs[newIndex]?.id.toString());
  }, [index, songs]);

  // Move to previous song
  const prevSong = useCallback(() => {
    if (songs.length === 0) return;
    if (index === 0) return;
    const newIndex = index - 1;
    setIndex(newIndex);
    setSelectedSong(songs[newIndex]?.id.toString());
  }, [index, songs]);

  const [albumSong, setAlbumSong] = useState<Song[]>([]);
  const [albumData, setAlbumData] = useState<Album | null>(null);

  const fetchAlbumSongs = useCallback(async (id: string) => {
    setLoading(true);
    try {
      const { data } = await axios.get<{ songs: Song[]; album: Album }>(
        `${server}/api/v1/album/${id}`
      );

      setAlbumData(data.album);
      setAlbumSong(data.songs);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch songs & albums when provider mounts
  useEffect(() => {
    fetchSongs();
    fetchAlbums();
  }, [fetchSongs, fetchAlbums]);

  return (
    <SongContext.Provider
      value={{
        songs,
        song,
        loading,
        selectedSong,
        setSelectedSong,
        isPlaying,
        setIsPlaying,
        albums,
        fetchSingleSong,
        nextSong,
        prevSong,
        albumSong,
        albumData,
        fetchAlbumSongs,
        fetchAlbums,
        fetchSongs,
      }}
    >
      {children}
    </SongContext.Provider>
  );
};

// Custom hook for easy access
export const useSongData = (): SongContextType => {
  const context = useContext(SongContext);
  if (!context) {
    throw new Error("useSongData must be used within a SongProvider");
  }
  return context;
};
