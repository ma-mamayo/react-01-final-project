import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import VideoDetailsPage from './pages/VideoDetailsPage';
import PlaylistPage from './pages/PlaylistPage';
import CreatePlaylistPage from './pages/CreatePlaylistPage';
import PlaylistsPage from './pages/PlaylistsPage'; // Import the new page

const App = () => (
  <>
    <Header />
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/videos/:videoId" element={<VideoDetailsPage />} />
      <Route path="/playlists/:playlistId" element={<PlaylistPage />} />
      <Route path="/create-playlist" element={<CreatePlaylistPage />} />
      <Route path="/playlists" element={<PlaylistsPage />} /> {/* New route */}
    </Routes>
  </>
);

export default App;
