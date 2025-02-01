"use client"

import React, { useState, useEffect } from 'react';

type Position = 'top-left' | 'top-right';

type PositionChange = {
  position: Position;
};

const TopCornerButton = ({
  startPosition = 'top-left',
  onClick,
  onPositionChange,
}: {
  startPosition?: Position;
  onClick?: () => void;
  onPositionChange?: (position: PositionChange) => void;
}) => {
  const [display, setDisplay] = useState<boolean>(false);
  const [position, setPosition] = useState<Position>('top-left'); // Initial position

  useEffect(() => {
    setPosition(startPosition);
    setDisplay(true);
  }, []);

  const handleDoubleClick = () => {
    setPosition(prevPosition => (prevPosition === 'top-left' ? 'top-right' : 'top-left'));
    onPositionChange && onPositionChange({ position });
  };

  const handleClick = () => {
    onClick && onClick();
  };

  const buttonStyles = { 
    display: display ? 'block' : 'none',
    position: 'fixed' as const,
    top: '0px',
    left: position === 'top-left' ? '0px' : 'auto',
    right: position === 'top-right' ? '0px' : 'auto',
    padding: '10px 10px',
    backgroundColor: 'rgba(200, 200, 200, 0.1)',
    color: '#fff',
    border: 'none',
    cursor: 'pointer',
    zIndex: 1000,
    fontSize: '20px',
  };

  return (
    <button
      style={buttonStyles}
      onDoubleClick={handleDoubleClick}
      onClick={handleClick}
    >
      🛠️
    </button>
  );
};

export default TopCornerButton;
export type {
  Position,
  PositionChange,
};