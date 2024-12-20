import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const DetailsContainer = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const Title = styled.h1`
  font-size: 24px;
  color: ${({ theme }) => theme.text};
`;

const Description = styled.p`
  font-size: 16px;
  color: ${({ theme }) => theme.text};
  line-height: 1.6;
`;

const VideoFrame = styled.iframe`
  width: 100%;
  height: 400px;
  border: none;
`;

const VideoDetails = ({ videoId }) => {
  const [video, setVideo] = useState(null);

  useEffect(() => {
    fetch(`https://harbour.dev.is/api/videos/${videoId}`)
      .then((res) => res.json())
      .then((data) => setVideo(data));
  }, [videoId]);

  if (!video) return <p>Loading video details...</p>;

  return (
    <DetailsContainer>
      <VideoFrame
        src={`https://www.youtube.com/embed/${video.videoId}`}
        title={video.title}
        allowFullScreen
      />
      <Title>{video.title}</Title>
      <Description>{video.description}</Description>
    </DetailsContainer>
  );
};

export default VideoDetails;
