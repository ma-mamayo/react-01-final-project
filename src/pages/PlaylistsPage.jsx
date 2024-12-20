import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchAllPlaylists, createPlaylist } from '../components/api';
import styled from 'styled-components';

const PageContainer = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: bold;
`;

const PlaylistsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  width: 100%;
  max-width: 800px;
`;

const PlaylistCard = styled.div`
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  text-align: center;
  cursor: pointer;
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
`;

const CreatePlaylistSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  margin-top: 20px;
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  width: 200px;
`;

const Button = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 10px 15px;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3;
  }
`;

const PlaylistsPage = () => {
  const navigate = useNavigate();
  const [playlists, setPlaylists] = useState([]);
  const [newPlaylistName, setNewPlaylistName] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    fetchAllPlaylists()
      .then((data) => {
        console.log('Fetched Playlists:', data); // Debug fetched playlists
        setPlaylists(data);
      })
      .catch((err) => {
        console.error('Failed to fetch playlists:', err);
        setError('Failed to load playlists. Please try again later.');
      });
  }, []);

  const handleCreatePlaylist = () => {
    if (!newPlaylistName.trim()) {
      alert('Please enter a playlist name.');
      return;
    }

    createPlaylist(newPlaylistName)
      .then((newPlaylist) => {
        console.log('New Playlist:', newPlaylist); // Debug the new playlist
        setPlaylists((prev) => [...prev, newPlaylist]); // Add new playlist to the list
        setNewPlaylistName('');
      })
      .catch((err) => {
        console.error('Failed to create playlist:', err);
        setError('Failed to create playlist. Please try again.');
      });
  };

  return (
    <PageContainer>
      <Title>Your Playlists</Title>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <PlaylistsContainer>
        {playlists.map((playlist) => (
          <PlaylistCard
            key={playlist.id}
            onClick={() => navigate(`/playlists/${playlist.id}`)}
          >
            {playlist.name}
          </PlaylistCard>
        ))}
      </PlaylistsContainer>

      <CreatePlaylistSection>
        <Title>Create New Playlist</Title>
        <Input
          type="text"
          placeholder="Enter playlist name"
          value={newPlaylistName}
          onChange={(e) => setNewPlaylistName(e.target.value)}
        />
        <Button onClick={handleCreatePlaylist}>Create Playlist</Button>
      </CreatePlaylistSection>
    </PageContainer>
  );
};

export default PlaylistsPage;
