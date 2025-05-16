import { useState, useEffect } from 'react';
import type { Exercise } from '../types/exercise';

export const useFavorites = () => {
  // String listesi yerine Exercise listesi saklayacağız
  const [favorites, setFavorites] = useState<Exercise[]>([]);

  // Sayfa yüklendiğinde localStorage'dan favori egzersizleri çek
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

  // Favorilere egzersiz ekle/çıkar
  const toggleFavorite = (exercise: Exercise) => {
    setFavorites(prevFavorites => {
      // Egzersizin zaten favorilerde olup olmadığını kontrol et
      const isExistingFavorite = prevFavorites.some(fav => fav.id === exercise.id);
      
      let newFavorites;
      if (isExistingFavorite) {
        // Eğer zaten favorilerdeyse çıkar
        newFavorites = prevFavorites.filter(fav => fav.id !== exercise.id);
      } else {
        // Değilse ekle
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
