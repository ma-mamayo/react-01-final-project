import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';

const VideoContainer = styled.div`
  position: relative;
  padding-top: 56.25%; /* 16:9 aspect ratio */
  width: 100%;
`;

const Iframe = styled.iframe`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: none;
`;

const VideoPlayer = ({ video, onVideoEnd }) => {
  const iframeRef = useRef(null);

  useEffect(() => {
    if (iframeRef.current && video?.videoId) {
      iframeRef.current.src = `https://www.youtube.com/embed/${video.videoId}?autoplay=1&rel=0&enablejsapi=1`;
    }
  }, [video]);

  useEffect(() => {
    const handlePlayerStateChange = (event) => {
      if (event.data === 0 && typeof onVideoEnd === 'function') {
        // Video ended (YouTube event 0)
        onVideoEnd();
      }
    };

    const onYouTubeIframeAPIReady = () => {
      const player = new window.YT.Player(iframeRef.current, {
        events: {
          onStateChange: handlePlayerStateChange,
        },
      });
    };

    if (window.YT) {
      onYouTubeIframeAPIReady();
    } else {
      // Load YouTube iframe API if not already loaded
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

      window.onYouTubeIframeAPIReady = onYouTubeIframeAPIReady;
    }

    return () => {
      // Cleanup if needed
    };
  }, [onVideoEnd]);

  return (
    <VideoContainer>
      {video?.videoId ? (
        <Iframe
          ref={iframeRef}
          title={video.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      ) : (
        <p>No video selected.</p>
      )}
    </VideoContainer>
  );
};

export default VideoPlayer;
