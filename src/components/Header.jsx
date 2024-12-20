import React from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';

const HeaderContainer = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px 20px;
  background-color: #f8f9fa;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 1000;
`;

const Logo = styled(Link)`
  font-size: 24px;
  font-weight: bold;
  text-decoration: none;
  color: #333;
  transition: color 0.3s;

  &:hover {
    color: #007bff;
  }
`;

const Button = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 10px 15px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3;
  }
`;

const Header = () => {
  const navigate = useNavigate();

  return (
    <HeaderContainer>
      <Logo to="/">YouTube Player</Logo>
      <Button onClick={() => navigate('/create-playlist')}>Create Playlist</Button>
      <Button onClick={() => navigate('/playlists')}>Playlists</Button> {/* Link to playlists */}
    </HeaderContainer>
  );
};

export default Header;
