
import React from 'react';
import { cn } from '@/lib/utils';

interface TabsProps {
  activeTab: 'search' | 'favorites';
  onTabChange: (tab: 'search' | 'favorites') => void;
  favoritesCount: number;
}

const Tabs: React.FC<TabsProps> = ({ activeTab, onTabChange, favoritesCount }) => {
  return (
    <div className="flex border-b border-border mb-6">
      <button
        onClick={() => onTabChange('search')}
        className={cn(
          "py-3 px-5 font-medium transition-colors",
          activeTab === 'search'
            ? "border-b-2 border-primary text-primary"
            : "text-muted-foreground hover:text-foreground"
        )}
      >
        Search Results
      </button>
      <button
        onClick={() => onTabChange('favorites')}
        className={cn(
          "py-3 px-5 font-medium transition-colors flex items-center gap-2",
          activeTab === 'favorites'
            ? "border-b-2 border-primary text-primary"
            : "text-muted-foreground hover:text-foreground"
        )}
      >
        Favorites
        {favoritesCount > 0 && (
          <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs">
            {favoritesCount}
          </span>
        )}
      </button>
    </div>
  );
};

export default Tabs;
