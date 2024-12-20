import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPlaylist } from '../components/api';

const CreatePlaylistPage = () => {
  const [playlistName, setPlaylistName] = useState('');
  const navigate = useNavigate();

  const handleCreatePlaylist = () => {
    createPlaylist(playlistName)
      .then((data) => navigate(`/playlists/${data.id}`))
      .catch((err) => console.error('Failed to create playlist:', err));
  };

  return (
    <div>
      <h1>Create a New Playlist</h1>
      <input
        type="text"
        placeholder="Enter playlist name"
        value={playlistName}
        onChange={(e) => setPlaylistName(e.target.value)}
      />
      <button onClick={handleCreatePlaylist}>Create Playlist</button>
    </div>
  );
};

export default CreatePlaylistPage;
