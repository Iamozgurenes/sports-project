import { useFavorites } from '../hooks/useFavorites';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
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

  return res.data.map((ex: Exercise) => ({
    ...ex,
    id: ex.id?.toString?.() ?? '',
  }));
};

const Favorites = () => {
  const { favorites, toggleFavorite } = useFavorites();
  const navigate = useNavigate();

  const { data, isLoading, error } = useQuery({
    queryKey: ['allExercises'],
    queryFn: fetchAllExercises,
  });
  
  const favExercises = data?.filter((ex) =>
    ex.id && favorites.includes(ex.id.toString())
  );

  return (
    <div className="max-w-7xl px-4 sm:px-6 py-8 mx-auto">
      <div className="pb-10 ">
        <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-700 to-pink-600 leading-relaxed pb-1">
          Favori Egzersizler
        </h1>
        <p className="pt-3 text-lg text-gray-600">
          Kaydettiğiniz egzersizlere buradan ulaşabilir ve detaylarını inceleyebilirsiniz
        </p>
      </div>

      {isLoading ? (
        <SkeletonLoader />
      ) : error ? (
        <div className="p-8 bg-red-50 border border-red-200 rounded-xl text-center">
          <div className="inline-flex justify-center items-center w-14 h-14 rounded-full bg-red-100 text-red-600 mb-4">
            <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-red-800">Bir hata oluştu</h3>
          <p className="mt-2 text-red-700">Egzersiz verileri yüklenirken bir sorunla karşılaşıldı.</p>
          <button 
            onClick={() => window.location.reload()}
            className="mt-4 px-6 py-2.5 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-colors"
          >
            Yeniden Dene
          </button>
        </div>
      ) : favExercises && favExercises.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {favExercises.map((ex) => (
            <div 
              key={ex.id} 
              onClick={() => navigate(`/exercise/${ex.id}`)}
              className="overflow-hidden bg-white rounded-2xl shadow-sm border border-gray-100 transition-all duration-300 hover:shadow-xl hover:scale-[1.02] group"
            >
              <div className="relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <img 
                  src={ex.gifUrl} 
                  alt={ex.name} 
                  className="w-full h-52 object-cover transition-transform duration-500 group-hover:scale-110" 
                  loading="lazy" 
                />
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite(ex.id);
                  }}
                  className="absolute z-20 p-2.5 bg-white/90 backdrop-blur-sm rounded-full shadow-lg top-4 right-4 
                    transition-all duration-300 hover:bg-white group-hover:scale-110"
                  aria-label="Favorilerden çıkar"
                >
                  <span className="text-xl">❤️</span>
                </button>
              </div>
              <div className="p-5">
                <h3 className="text-base font-bold text-gray-800 mb-3 truncate">{ex.name}</h3>
                <div className="flex flex-wrap gap-2">
                  <span className="px-2.5 py-1 text-xs font-medium text-blue-700 bg-blue-50 rounded-full border border-blue-100">
                    {ex.target}
                  </span>
                  <span className="px-2.5 py-1 text-xs font-medium text-green-700 bg-green-50 rounded-full border border-green-100">
                    {ex.equipment}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center p-16 bg-gray-50 border border-gray-100 rounded-xl text-center mt-8">
          <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mb-6">
            <svg className="w-10 h-10 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-700 mb-2">Henüz favori egzersiz eklenmedi</h2>
          <p className="text-gray-500 mb-8 max-w-md">
            Favori egzersizlerinizi kaydetmek için ana sayfadaki egzersizlerin sağ üst köşesindeki kalp ikonuna tıklayabilirsiniz.
          </p>
          <button 
            onClick={() => navigate('/')}
            className="px-8 py-3 font-medium text-white transition-all bg-gradient-to-r from-blue-600 to-indigo-600 
              rounded-lg hover:from-blue-700 hover:to-indigo-700 shadow-lg shadow-blue-500/20 hover:shadow-blue-600/30"
          >
            Egzersizleri Keşfet
          </button>
        </div>
      )}
    </div>
  );
};

export default Favorites;
