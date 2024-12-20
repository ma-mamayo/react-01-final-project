const API_BASE_URL = 'https://harbour.dev.is/api';

// Utility to handle API requests
const apiRequest = async (url, method = 'GET', body = null) => {
  try {
    const response = await fetch(`${API_BASE_URL}${url}`, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: body ? JSON.stringify(body) : null,
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'API request failed');
    }

    return await response.json();
  } catch (error) {
    console.error('API Error:', error.message);
    throw error;
  }
};

// Fetch all playlists
export const fetchAllPlaylists = async () => {
  const response = await apiRequest('/playlists');
  return response.playlists || []; // Ensure playlists is always an array
};

// Fetch a specific playlist by ID
export const fetchPlaylist = async (playlistId) => {
  return apiRequest(`/playlists/${playlistId}`);
};

// Create a new playlist
export const createPlaylist = async (name) => {
    const newPlaylist = await apiRequest('/playlists', 'POST', { name });
    console.log('Created Playlist:', newPlaylist); // Debug the response
    return newPlaylist;
  };
  

// Add a video to a playlist
export const addVideoToPlaylist = async (playlistId, video) => {
  return apiRequest(`/playlists/${playlistId}/videos`, 'POST', video);
};

// Remove a video from a playlist
export const removeVideoFromPlaylist = async (playlistId, videoId) => {
  return apiRequest(`/playlists/${playlistId}/videos/${videoId}`, 'DELETE');
};

// Update a playlist (e.g., rename or modify properties)
export const updatePlaylist = async (playlistId, updatedData) => {
  return apiRequest(`/playlists/${playlistId}`, 'PUT', updatedData);
};

// Fetch search results for videos
export const fetchSearchResults = async (query) => {
  return apiRequest(`/search?q=${query}`);
};

// Fetch video details by video ID
export const fetchVideoDetails = async (videoId) => {
  return apiRequest(`/videos/${videoId}`);
};
