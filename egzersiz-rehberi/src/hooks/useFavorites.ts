import { useEffect, useState } from 'react';

export const useFavorites = () => {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [version, setVersion] = useState(0); // Değişiklik için tetikleyici

  useEffect(() => {
    const stored = localStorage.getItem('favorites');
    if (stored) {
      setFavorites(JSON.parse(stored));
    }
  }, [version]); // her değişiklikte yeniden okur

  const toggleFavorite = (id: string) => {
    const updated = favorites.includes(id)
      ? favorites.filter((fav) => fav !== id)
      : [...favorites, id];

    localStorage.setItem('favorites', JSON.stringify(updated));
    setVersion((v) => v + 1); // versiyonu artır, hook tetiklensin
  };

  const isFavorite = (id: string) => favorites.includes(id);

  return { favorites, toggleFavorite, isFavorite };
};
