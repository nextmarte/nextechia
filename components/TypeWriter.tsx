'use client';

import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface TypeWriterProps {
  text: string;
  className?: string;
  speed?: number;
  cursorBlink?: boolean;
}

export function TypeWriter({ 
  text, 
  className = '', 
  speed = 50,
  cursorBlink = true 
}: TypeWriterProps) {
  const [displayedText, setDisplayedText] = useState('');
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (displayedText.length < text.length) {
      const timer = setTimeout(() => {
        setDisplayedText(text.slice(0, displayedText.length + 1));
      }, speed);
      return () => clearTimeout(timer);
    } else if (displayedText.length === text.length) {
      setIsComplete(true);
    }
  }, [displayedText, text, speed]);

  return (
    <span className={className}>
      {displayedText}
      {!isComplete && <span className="animate-pulse">|</span>}
      {isComplete && cursorBlink && (
        <span className="animate-pulse">.</span>
      )}
    </span>
  );
}
