
import React, { useState } from 'react';
import { Heart } from 'lucide-react';
import { Gif } from '../types/gif';
import { useFavoritesStore } from '../store/useFavoritesStore';
import { cn } from '@/lib/utils';

interface GifCardProps {
  gif: Gif;
}

const GifCard: React.FC<GifCardProps> = ({ gif }) => {
  const { addFavorite, removeFavorite, isFavorite } = useFavoritesStore();
  const [isLoading, setIsLoading] = useState(true);
  const favorite = isFavorite(gif.id);

  const handleFavoriteToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    
    if (favorite) {
      removeFavorite(gif.id);
    } else {
      addFavorite(gif);
    }
  };
  
  return (
    <div className="gif-card">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-muted">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
        </div>
      )}
      <img
        src={gif.images.fixed_height.url}
        alt={gif.title}
        className={cn(isLoading ? 'opacity-0' : 'opacity-100 animate-fade-in')}
        onLoad={() => setIsLoading(false)}
      />
      <button
        className={cn(
          'favorite-btn',
          favorite ? 'text-red-500' : 'text-white'
        )}
        onClick={handleFavoriteToggle}
        aria-label={favorite ? "Remove from favorites" : "Add to favorites"}
      >
        <Heart
          className={cn(favorite && "animate-heart-beat fill-current")}
          size={20}
        />
      </button>
    </div>
  );
};

export default GifCard;
