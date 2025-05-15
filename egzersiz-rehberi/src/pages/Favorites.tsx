import { useFavorites } from '../hooks/useFavorites';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import type { Exercise } from '../types/exercise';
import SkeletonLoader from '../components/SkeletonLoader';

const API_HEADERS = {
  'X-RapidAPI-Key': '96aacc3f77msh31524feef2483edp1b4320jsnf1c51623af03',
  'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com',
};

const fetchAllExercises = async (): Promise<Exercise[]> => {
  const res = await axios.get('https://exercisedb.p.rapidapi.com/exercises?limit=1000', {
    headers: API_HEADERS,
  });

  // Her egzersizin id'sini string olarak normalize ediyoruz
  return res.data.map((ex: Exercise) => ({
    ...ex,
    id: ex.id?.toString?.() ?? '',
  }));
};

const Favorites = () => {
  const { favorites } = useFavorites();

  const { data, isLoading, error } = useQuery({
    queryKey: ['allExercises'],
    queryFn: fetchAllExercises,
  });

  // Debug amaçlı log
  console.log('favorites in localStorage:', favorites);
  console.log('egzersiz verisi:', data?.length);

  const favExercises = data?.filter((ex) =>
    ex.id && favorites.includes(ex.id.toString())
  );

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Favori Egzersizler</h1>

      {isLoading ? (
        <SkeletonLoader />
      ) : error ? (
        <p>Bir hata oluştu.</p>
      ) : favExercises && favExercises.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {favExercises.map((ex) => (
            <div key={ex.id} className="border p-3 rounded shadow hover:scale-[1.02] transition">
              <img src={ex.gifUrl} alt={ex.name} className="h-40 w-full object-cover" />
              <h3 className="mt-2 font-bold text-sm">{ex.name}</h3>
              <p className="text-xs text-gray-600">Hedef: {ex.target}</p>
              <p className="text-xs text-gray-600">Ekipman: {ex.equipment}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>Henüz favori eklenmedi.</p>
      )}
    </div>
  );
};

export default Favorites;
