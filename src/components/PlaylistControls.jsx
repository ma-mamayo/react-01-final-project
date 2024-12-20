import React from 'react';
import styled from 'styled-components';

const ControlsContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 15px;
  margin: 20px 0;
`;

const Button = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 10px 15px;
  font-size: 14px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const PlaylistControls = ({ onPlayAll, onShuffle, onClear }) => {
  return (
    <ControlsContainer>
      <Button onClick={onPlayAll}>Play All</Button>
      <Button onClick={onShuffle}>Shuffle</Button>
      <Button onClick={onClear}>Clear Playlist</Button>
    </ControlsContainer>
  );
};

export default PlaylistControls;
