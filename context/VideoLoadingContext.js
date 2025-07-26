"use client";

import React, { createContext, useContext, useState, useCallback } from 'react';

const VideoLoadingContext = createContext();

export const useVideoLoading = () => {
  const context = useContext(VideoLoadingContext);
  if (!context) {
    throw new Error('useVideoLoading must be used within VideoLoadingProvider');
  }
  return context;
};

export const VideoLoadingProvider = ({ children }) => {
  // Define all videos that need to be loaded
  const videoIds = [
    'hero-vimeo',
    
  ];

  const [loadedVideos, setLoadedVideos] = useState(new Set());
  const [allVideosLoaded, setAllVideosLoaded] = useState(false);

  const markVideoAsLoaded = useCallback((videoId) => {
    setLoadedVideos(prevLoaded => {
      const newLoaded = new Set(prevLoaded);
      newLoaded.add(videoId);
      
      // Check if all videos are now loaded
      const allLoaded = videoIds.every(id => newLoaded.has(id));
      setAllVideosLoaded(allLoaded);
      
      return newLoaded;
    });
  }, [videoIds]);

  const isVideoLoaded = useCallback((videoId) => {
    return loadedVideos.has(videoId);
  }, [loadedVideos]);

  const getLoadingProgress = useCallback(() => {
    return (loadedVideos.size / videoIds.length) * 100;
  }, [loadedVideos, videoIds.length]);

  const value = {
    markVideoAsLoaded,
    isVideoLoaded,
    allVideosLoaded,
    getLoadingProgress,
    totalVideos: videoIds.length,
    loadedCount: loadedVideos.size
  };

  return (
    <VideoLoadingContext.Provider value={value}>
      {children}
    </VideoLoadingContext.Provider>
  );
}; 