import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchPlaylist, addVideoToPlaylist } from '../components/api';
import SearchBar from '../components/SearchBar';
import VideoList from '../components/VideoList';
import VideoQueue from '../components/VideoQueue';
import VideoPlayer from '../components/VideoPlayer';
import PlaylistControls from '../components/PlaylistControls';
import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const PageContainer = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  animation: ${fadeIn} 0.5s ease-in-out;
`;

const PlaylistTitle = styled.h1`
  font-size: 36px;
  font-weight: bold;
  text-align: center;
  color: #333;
`;

const ShareContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const ShareUrl = styled.input`
  width: 80%;
  max-width: 600px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
`;

const ShareButton = styled.button`
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

const VideoDescription = styled.div`
  margin-top: 10px;
  background-color: #f9f9f9;
  padding: 10px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  max-height: ${({ isOpen }) => (isOpen ? '200px' : '0')};
  overflow: hidden;
  transition: max-height 0.3s ease-out;
`;

const ToggleDescriptionButton = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 5px 10px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3;
  }
`;

const NavigationButtons = styled.div`
  display: flex;
  justify-content: space-between;
  width: 200px;
  margin: 20px 0;
`;

const NavButton = styled.button`
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

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

const PlaylistPage = () => {
  const { playlistId } = useParams();
  const [playlist, setPlaylist] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [isDescriptionOpen, setIsDescriptionOpen] = useState(false);

  useEffect(() => {
    fetchPlaylist(playlistId)
      .then((data) => {
        const formattedVideos = data.videos.map((video) => ({
          videoId: video.videoId || video.id,
          title: video.title,
          description: video.description || 'No description available.',
          thumbnailUrl: video.thumbnailUrl || video.snippet?.thumbnails?.default?.url,
        }));
        setPlaylist({ ...data, videos: formattedVideos });
      })
      .catch((err) => console.error('Failed to fetch playlist:', err));
  }, [playlistId]);

  const toggleDescription = () => {
    setIsDescriptionOpen((prev) => !prev);
  };

  const handleCopyUrl = () => {
    const playlistUrl = `${window.location.origin}/playlists/${playlistId}`;
    navigator.clipboard.writeText(playlistUrl)
      .then(() => alert('Playlist URL copied to clipboard!'))
      .catch((err) => console.error('Failed to copy URL:', err));
  };

  if (!playlist) {
    return <p>Loading playlist...</p>;
  }

  const currentVideo = playlist.videos[currentVideoIndex];

  return (
    <PageContainer>
      <PlaylistTitle>{playlist.name}</PlaylistTitle>
      <ShareContainer>
        <ShareUrl type="text" value={`${window.location.origin}/playlists/${playlistId}`} readOnly />
        <ShareButton onClick={handleCopyUrl}>Copy URL</ShareButton>
      </ShareContainer>
      {currentVideo && (
        <>
          <VideoPlayer
            video={currentVideo}
            onVideoEnd={() => {
              if (currentVideoIndex < playlist.videos.length - 1) {
                setCurrentVideoIndex(currentVideoIndex + 1);
              }
            }}
          />
          <ToggleDescriptionButton onClick={toggleDescription}>
            {isDescriptionOpen ? 'Hide Description' : 'Show Description'}
          </ToggleDescriptionButton>
          <VideoDescription isOpen={isDescriptionOpen}>
            {currentVideo.description}
          </VideoDescription>
          <NavigationButtons>
            <NavButton
              onClick={() => setCurrentVideoIndex((prev) => Math.max(prev - 1, 0))}
              disabled={currentVideoIndex === 0}
            >
              Previous
            </NavButton>
            <NavButton
              onClick={() => setCurrentVideoIndex((prev) => Math.min(prev + 1, playlist.videos.length - 1))}
              disabled={currentVideoIndex === playlist.videos.length - 1}
            >
              Next
            </NavButton>
          </NavigationButtons>
        </>
      )}
      <PlaylistControls
        onPlayAll={() => setCurrentVideoIndex(0)}
        onShuffle={() => {
          const shuffledVideos = [...playlist.videos].sort(() => Math.random() - 0.5);
          setPlaylist((prev) => ({ ...prev, videos: shuffledVideos }));
          setCurrentVideoIndex(0);
        }}
        onClear={() => setPlaylist((prev) => ({ ...prev, videos: [] }))}
      />
      <SearchBar setSearchResults={setSearchResults} />
      {searchResults.length > 0 && (
        <VideoList
          results={searchResults}
          onAddVideo={(video) => {
            addVideoToPlaylist(playlistId, video)
              .then(() => {
                setPlaylist((prev) => ({
                  ...prev,
                  videos: [...prev.videos, video],
                }));
              })
              .catch((err) => console.error('Failed to add video:', err));
          }}
          onVideoClick={(videoId) => {
            const index = playlist.videos.findIndex((video) => video.videoId === videoId);
            setCurrentVideoIndex(index);
          }}
        />
      )}
      <VideoQueue
        videos={playlist.videos}
        onVideoClick={(videoId) => {
          const index = playlist.videos.findIndex((video) => video.videoId === videoId);
          setCurrentVideoIndex(index);
        }}
        onRemoveVideo={(videoId) => {
          setPlaylist((prev) => ({
            ...prev,
            videos: prev.videos.filter((video) => video.videoId !== videoId),
          }));
        }}
      />
    </PageContainer>
  );
};

export default PlaylistPage;
