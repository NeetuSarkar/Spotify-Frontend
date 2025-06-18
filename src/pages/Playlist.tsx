import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { useSongData } from "../context/SongContext";
import { useUserData } from "../context/UserContext";
import { FaBookmark, FaPlay } from "react-icons/fa";
import Loading from "../components/Loading";
import type { Song } from "../context/SongContext";

const Playlist = () => {
  const { songs, setIsPlaying, setSelectedSong, loading } = useSongData();
  const { user, addToPlaylist } = useUserData();
  const [myPlayList, setMyPlayList] = useState<Song[]>([]);

  useEffect(() => {
    if (songs && user?.playlist) {
      const filteredSongs = songs.filter((song) =>
        user.playlist.includes(song.id.toString())
      );
      setMyPlayList(filteredSongs);
    }
  }, [songs, user]);

  const handlePlay = (songId: string) => {
    setSelectedSong(songId);
    setIsPlaying(true);
  };

  return (
    <div>
      <Layout>
        {myPlayList && (
          <>
            {loading ? (
              <Loading />
            ) : (
              <>
                <div className="mt-10 flex gap-8 flex-col md:flex-row md:items-center">
                  <img
                    src="/dummy.jpg"
                    className="w-48 rounded"
                    alt="Playlist cover"
                  />

                  <div className="flex flex-col">
                    <p>PlayList</p>
                    <h2 className="text-3xl font-bold mb-4 md:text-5xl">
                      {user?.name} PlayList
                    </h2>
                    <h4>Your Favourite Songs</h4>
                    <p className="mt-1">
                      <img
                        src="/logo (1).png"
                        className="inline-block w-6"
                        alt="Logo"
                      />
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-3 sm:grid-cols-4 mt-10 mb-4 pl-2 text-[#a7a7a7a]">
                  <p>
                    <b className="mr-4">#</b>
                  </p>
                  <p className="hidden sm:block">Description</p>
                  <p className="text-center">Actions</p>
                </div>

                <hr />

                {myPlayList.length > 0 ? (
                  myPlayList.map((song, index) => (
                    <div
                      className="grid grid-cols-3 sm:grid-cols-4 mt-10 mb-4 pl-2 text-[#a7a7a7a] hover:bg-[#ffffff2b] cursor-pointer"
                      key={song.id}
                    >
                      <p className="text-white">
                        <b className="mr-4 text-[#a7a7a7]">{index + 1}</b>
                        <img
                          src={song.thumbnail || "/dummy.jpg"}
                          className="inline w-10 mr-5"
                          alt={song.title}
                        />
                        {song.title}
                      </p>
                      <p className="text-[15px] hidden sm:block">
                        {song.description.slice(0, 30)}...
                      </p>
                      <p className="flex justify-center items-center gap-5">
                        <button
                          className="text-[15px] text-center"
                          onClick={() => addToPlaylist(song.id)}
                          aria-label="Add to playlist"
                        >
                          <FaBookmark />
                        </button>

                        <button
                          className="text-[15px] text-center"
                          onClick={() => handlePlay(song.id)}
                          aria-label="Play song"
                        >
                          <FaPlay />
                        </button>
                      </p>
                    </div>
                  ))
                ) : (
                  <div className="mt-10 text-center text-gray-400">
                    Your playlist is empty. Add some songs!
                  </div>
                )}
              </>
            )}
          </>
        )}
      </Layout>
    </div>
  );
};

export default Playlist;
