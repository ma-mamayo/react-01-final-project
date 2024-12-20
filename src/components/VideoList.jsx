import React from 'react';
import styled from 'styled-components';

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  width: 100%;
`;
const AddButton = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 5px 10px;
  font-size: 14px;
  margin-top: 10px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;


const Card = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s, box-shadow 0.2s;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
`;

const Thumbnail = styled.img`
  width: 100%;
  height: 150px;
  object-fit: cover;
  border-radius: 8px;
`;

const Title = styled.h3`
  margin-top: 10px;
  font-size: 14px;
  font-weight: bold;
`;



const VideoList = ({ results, onAddVideo, onVideoClick = () => {} }) => {
  return (
    <Grid>
      {results.map((video) => {
        const videoId = video?.id?.videoId;
        const title = video?.snippet?.title || 'Unknown Title';
        const thumbnailUrl = video?.snippet?.thumbnails?.default?.url || '';

        return videoId ? (
          <Card key={videoId} onClick={() => onVideoClick(videoId)}>
            {thumbnailUrl && <Thumbnail src={thumbnailUrl} alt={title} />}
            <Title>{title}</Title>
            <AddButton
              onClick={(e) => {
                e.stopPropagation(); // Prevent triggering onVideoClick
                onAddVideo({
                  videoId,
                  title,
                  thumbnailUrl,
                });
              }}
            >
              Add to Playlist
            </AddButton>
          </Card>
        ) : (
          <Card key={Math.random()}>
            <Title>Invalid Video Data</Title>
          </Card>
        );
      })}
    </Grid>
  );
};

export default VideoList;

