import React, { useState } from 'react';
import styled from 'styled-components';
import SearchBar from '../components/SearchBar';
import VideoList from '../components/VideoList';

const PageContainer = styled.div`
  padding: 20px;
  background-color: #f9f9f9;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 20px;
`;

const Title = styled.h1`
  font-size: 36px;
  font-weight: bold;
  color: #333;
  margin-bottom: 10px;
`;

const Subtitle = styled.h2`
  font-size: 18px;
  font-weight: normal;
  color: #555;
`;

const SearchBarWrapper = styled.div`
  width: 100%;
  max-width: 600px;
`;

const VideoListWrapper = styled.div`
  width: 100%;
  max-width: 1200px;
`;

const HomePage = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [searchPerformed, setSearchPerformed] = useState(false);

  const handleSearchResults = (results) => {
    setSearchResults(results);
    setSearchPerformed(true); // Set the flag to true after the first search
  };

  return (
    <PageContainer>
      {/* Header Section */}
      <Header>
        <Title>Welcome to My YouTube App</Title>
        <Subtitle>Search and watch videos without leaving the app</Subtitle>
      </Header>

      {/* Search Bar */}
      <SearchBarWrapper>
        <SearchBar setSearchResults={handleSearchResults} />
      </SearchBarWrapper>

      {/* Video List */}
      <VideoListWrapper>
        <VideoList results={searchResults} searchPerformed={searchPerformed} />
      </VideoListWrapper>
    </PageContainer>
  );
};

export default HomePage;
