import React from 'react';
import './LoadingSpinner.css';

export const LoadingSpinner = ({ size = 'medium', fullScreen = false }) => {
  const sizeClass = `spinner-${size}`;
  
  const spinner = (
    <div className={`spinner ${sizeClass}`}>
      <div className="spinner-ring"></div>
      <div className="spinner-ring"></div>
      <div className="spinner-ring"></div>
    </div>
  );

  if (fullScreen) {
    return (
      <div className="spinner-fullscreen">
        {spinner}
      </div>
    );
  }

  return spinner;
};

export const SkeletonLoader = ({ width = '100%', height = '20px', className = '' }) => {
  return (
    <div 
      className={`skeleton-loader ${className}`}
      style={{ width, height }}
    ></div>
  );
};

export const VideoSkeleton = () => {
  return (
    <div className="video-skeleton">
      <SkeletonLoader height="100vh" className="skeleton-video" />
    </div>
  );
};

