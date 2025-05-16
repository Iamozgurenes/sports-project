import { useState, useEffect } from 'react';
import type { Exercise } from '../types/exercise';

export const useFavorites = () => {

  const [favorites, setFavorites] = useState<Exercise[]>([]);

  
  useEffect(() => {
    const storedFavorites = localStorage.getItem('favorites');
    if (storedFavorites) {
      try {
        setFavorites(JSON.parse(storedFavorites));
      } catch (e) {
        console.error('Favoriler yüklenirken hata oluştu:', e);
        setFavorites([]);
      }
    }
  }, []);

  
  const toggleFavorite = (exercise: Exercise) => {
    setFavorites(prevFavorites => {
      
      const isExistingFavorite = prevFavorites.some(fav => fav.id === exercise.id);
      
      let newFavorites;
      if (isExistingFavorite) {
        
        newFavorites = prevFavorites.filter(fav => fav.id !== exercise.id);
      } else {
        
        newFavorites = [...prevFavorites, exercise];
      }
      
      // Yeni favori listesini localStorage'a kaydet
      localStorage.setItem('favorites', JSON.stringify(newFavorites));
      return newFavorites;
    });
  };

  // Bir egzersizin favorilerde olup olmadığını kontrol et
  const isFavorite = (id: string): boolean => {
    return favorites.some(fav => fav.id === id);
  };

  return {
    favorites,
    toggleFavorite,
    isFavorite
  };
};
