
import React from 'react';
import Masonry from 'react-masonry-css';
import GifCard from './GifCard';
import { Gif } from '../types/gif';

interface GifGridProps {
  gifs: Gif[];
  isLoading?: boolean;
}

const GifGrid: React.FC<GifGridProps> = ({ gifs, isLoading = false }) => {
  const breakpointColumns = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-16">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
      </div>
    );
  }

  if (gifs.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="text-6xl mb-4">🔍</div>
        <h3 className="text-xl font-semibold mb-2">No GIFs found</h3>
        <p className="text-muted-foreground">
          Try searching for something else or check your internet connection.
        </p>
      </div>
    );
  }

  return (
    <Masonry
      breakpointCols={breakpointColumns}
      className="masonry-grid"
      columnClassName="masonry-grid_column"
    >
      {gifs.map((gif) => (
        <GifCard key={gif.id} gif={gif} />
      ))}
    </Masonry>
  );
};

export default GifGrid;
