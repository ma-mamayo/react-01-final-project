import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchVideoDetails } from '../components/api';

const VideoDetailsPage = () => {
  const { videoId } = useParams();
  const [videoDetails, setVideoDetails] = useState(null);

  useEffect(() => {
    fetchVideoDetails(videoId)
      .then(setVideoDetails)
      .catch((err) => console.error('Failed to fetch video details:', err));
  }, [videoId]);

  if (!videoDetails) {
    return <p>Loading video details...</p>;
  }

  return (
    <div>
      <h1>{videoDetails.title}</h1>
      <iframe
        src={`https://www.youtube.com/embed/${videoId}`}
        title={videoDetails.title}
        allowFullScreen
      />
      <p>{videoDetails.description}</p>
    </div>
  );
};

export default VideoDetailsPage;
