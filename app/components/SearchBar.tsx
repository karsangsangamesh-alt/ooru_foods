"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
  className?: string;
}

export default function SearchBar({ 
  onSearch, 
  placeholder = "Search for products...",
  className = ""
}: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [displayPlaceholder, setDisplayPlaceholder] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  // Array of chutney-related search terms
  const searchTerms = [
    "shenga chutneypudi",
    "coconut chutney",
    "coriander chutney", 
    "garlic chutney",
    "mint chutney",
    "tomato chutney",
    "red chili chutney",
    "onion chutney",
    "sesame chutney",
    "pudina chutney"
  ];

  const currentTerm = searchTerms[currentIndex];
  const typingSpeed = 150; // ms per character (increased for better visibility)
  const deletingSpeed = 75; // ms per character (increased for better visibility)
  const pauseDuration = 3000; // pause before deleting (increased for better visibility)

  useEffect(() => {
    if (!query) {
      let timeout: NodeJS.Timeout;
      
      if (!isDeleting && displayPlaceholder === currentTerm) {
        // Pause at full text
        timeout = setTimeout(() => {
          setIsDeleting(true);
        }, pauseDuration);
      } else if (!isDeleting && displayPlaceholder.length < currentTerm.length) {
        // Type next character
        timeout = setTimeout(() => {
          setDisplayPlaceholder(currentTerm.slice(0, displayPlaceholder.length + 1));
        }, typingSpeed);
      } else if (isDeleting && displayPlaceholder.length > 0) {
        // Delete character
        timeout = setTimeout(() => {
          setDisplayPlaceholder(displayPlaceholder.slice(0, -1));
        }, deletingSpeed);
      } else if (isDeleting && displayPlaceholder.length === 0) {
        // Move to next term
        timeout = setTimeout(() => {
          setCurrentIndex((prev: number) => (prev + 1) % searchTerms.length);
        }, 500); // Increased delay before starting next term
        setTimeout(() => {
          setIsDeleting(false);
        }, 500);
      }
      
      return () => clearTimeout(timeout);
    }
  }, [displayPlaceholder, isDeleting, currentTerm, currentIndex, query, searchTerms.length]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    
    // Stop typing animation when user starts typing
    if (value && displayPlaceholder) {
      setDisplayPlaceholder('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      onSearch(query);
    }
  };

  const handleFocus = () => {
    // Pause typing animation when input is focused
    if (!query) {
      setDisplayPlaceholder('');
    }
  };

  const handleBlur = () => {
    // Resume typing animation when input loses focus (only if no text)
    if (!query) {
      setTimeout(() => {
        setCurrentIndex(0);
        setDisplayPlaceholder('');
        setIsDeleting(false);
      }, 100);
    }
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ width: 0, opacity: 0 }}
      animate={{ width: 'auto', opacity: 1 }}
      className={`relative ${className}`}
    >
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={handleChange}
          onKeyPress={handleKeyPress}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder={query ? placeholder : displayPlaceholder}
          className="w-48 sm:w-56 md:w-64 lg:w-72 xl:w-80 pl-10 sm:pl-11 md:pl-12 pr-4 sm:pr-5 md:pr-6 py-2.5 sm:py-3 md:py-3.5 lg:py-4 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 text-sm sm:text-base lg:text-lg placeholder:text-xs sm:placeholder:text-sm lg:placeholder:text-base"
        />
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg
            className="h-4 w-4 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
        
        {/* Typewriter cursor */}
        {!query && displayPlaceholder && (
          <span className="absolute left-10 sm:left-11 md:left-12 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none">
            |
          </span>
        )}
      </div>
    </motion.form>
  );
}
