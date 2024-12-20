import React from 'react';
import styled from 'styled-components';

const QueueContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
`;

const VideoItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  &:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  }
`;

const VideoDetails = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Thumbnail = styled.img`
  width: 100px;
  height: 60px;
  object-fit: cover;
  border-radius: 4px;
`;

const Title = styled.div`
  font-size: 16px;
  font-weight: bold;
  color: #333;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  max-width: 300px;
`;

const RemoveButton = styled.button`
  background-color: #dc3545;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 5px 10px;
  font-size: 14px;

  &:hover {
    background-color: #b02a37;
  }
`;

const VideoQueue = ({ videos, onRemoveVideo, onVideoClick }) => {
    console.log('Videos in queue:', videos); // Debug the videos array
    return (
      <QueueContainer>
        {videos.map((video) => (
          <VideoItem key={video.videoId}>
            <VideoDetails onClick={() => onVideoClick(video.videoId)}>
              <Thumbnail src={video.thumbnailUrl} alt={video.title} />
              <Title>{video.title}</Title>
            </VideoDetails>
            <RemoveButton onClick={() => onRemoveVideo(video.videoId)}>
              Remove
            </RemoveButton>
          </VideoItem>
        ))}
      </QueueContainer>
    );
  };
  
  export default VideoQueue;
  