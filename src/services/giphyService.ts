
import { GiphyResponse } from "../types/gif";

const GIPHY_API_KEY = "vf7nDm11F3X2Pe63jIGjWWPiFCFCZXM8";
const GIPHY_API_URL = "https://api.giphy.com/v1/gifs";

export const searchGifs = async (query: string, limit = 20, offset = 0): Promise<GiphyResponse> => {
  const url = `${GIPHY_API_URL}/search?api_key=${GIPHY_API_KEY}&q=${encodeURIComponent(query)}&limit=${limit}&offset=${offset}`;
  
  try {
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`GIPHY API error: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error("Error searching gifs:", error);
    throw error;
  }
};

export const getTrendingGifs = async (limit = 20, offset = 0): Promise<GiphyResponse> => {
  const url = `${GIPHY_API_URL}/trending?api_key=${GIPHY_API_KEY}&limit=${limit}&offset=${offset}`;
  
  try {
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`GIPHY API error: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error("Error fetching trending gifs:", error);
    throw error;
  }
};
