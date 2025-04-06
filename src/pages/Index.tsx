
import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { searchGifs, getTrendingGifs } from '../services/giphyService';
import { useFavoritesStore } from '../store/useFavoritesStore';
import SearchBar from '../components/SearchBar';
import GifGrid from '../components/GifGrid';
import Tabs from '../components/Tabs';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'search' | 'favorites'>('search');
  const { favorites } = useFavoritesStore();
  const { toast } = useToast();

  const { data: searchResults, isLoading, isError } = useQuery({
    queryKey: ['gifs', searchQuery],
    queryFn: () => searchQuery 
      ? searchGifs(searchQuery) 
      : getTrendingGifs(),
    enabled: activeTab === 'search',
  });

  useEffect(() => {
    if (isError) {
      toast({
        title: 'Error',
        description: 'Failed to fetch GIFs. Please try again later.',
        variant: 'destructive',
      });
    }
  }, [isError, toast]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setActiveTab('search');
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-brand-purple to-brand-teal bg-clip-text text-transparent mb-2">
          GIF Gallery
        </h1>
        <p className="text-muted-foreground mb-6">
          Search for GIFs and save your favorites
        </p>
        <div className="max-w-2xl mx-auto">
          <SearchBar onSearch={handleSearch} initialQuery={searchQuery} />
        </div>
      </header>

      <Tabs 
        activeTab={activeTab} 
        onTabChange={setActiveTab} 
        favoritesCount={favorites.length} 
      />

      <div className="min-h-[50vh]">
        {activeTab === 'search' ? (
          <div className="animate-fade-in">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-medium">
                {searchQuery 
                  ? `Results for "${searchQuery}"` 
                  : 'Trending GIFs'}
              </h2>
              {searchQuery && (
                <Button 
                  variant="ghost" 
                  onClick={() => setSearchQuery('')}
                >
                  Show Trending
                </Button>
              )}
            </div>
            <GifGrid 
              gifs={searchResults?.data || []} 
              isLoading={isLoading} 
            />
          </div>
        ) : (
          <div className="animate-fade-in">
            <h2 className="text-xl font-medium mb-4">Your Favorites</h2>
            <GifGrid gifs={favorites} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
