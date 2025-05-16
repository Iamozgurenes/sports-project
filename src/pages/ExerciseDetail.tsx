import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useFavorites } from '../hooks/useFavorites';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const API_HEADERS = {
  'X-RapidAPI-Key': import.meta.env.VITE_API_KEY,
  'X-RapidAPI-Host': import.meta.env.VITE_API_HOST,
};

const fetchExerciseById = async (id: string) => {
  const response = await axios.get(`${API_BASE_URL}/exercises/exercise/${id}`, {
    headers: API_HEADERS,
  });
  return response.data;
};

const ExerciseDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toggleFavorite, isFavorite } = useFavorites();

  const { data, isLoading, error } = useQuery({
    queryKey: ['exercise', id],
    queryFn: () => fetchExerciseById(id!),
    enabled: !!id,
  });

  if (isLoading) return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="w-16 h-16 relative">
        <div className="absolute top-0 left-0 w-full h-full border-4 border-blue-200 rounded-full"></div>
        <div className="absolute top-0 left-0 w-full h-full border-4 border-t-blue-600 rounded-full animate-spin"></div>
      </div>
    </div>
  );
  
  if (error) return (
    <div className="max-w-2xl mx-auto mt-12 overflow-hidden bg-red-50 border border-red-200 rounded-xl">
      <div className="p-8 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 text-red-600 mb-6">
          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-red-800 mb-2">Egzersiz detayları yüklenemedi</h2>
        <p className="text-red-700 mb-8">Veriler alınırken bir sorun oluştu. Lütfen daha sonra tekrar deneyin.</p>
        <button 
          onClick={() => navigate('/')}
          className="px-8 py-3 font-medium text-white transition-colors bg-red-600 rounded-lg hover:bg-red-700"
        >
          Ana Sayfaya Dön
        </button>
      </div>
    </div>
  );

  return (
    <div className="max-w-5xl px-4 py-10 mx-auto">
      <button 
        onClick={() => navigate(-1)} 
        className="flex items-center gap-2 px-4 py-2 mb-8 text-gray-600 transition-colors bg-gray-100 rounded-lg hover:bg-gray-200"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Geri
      </button>
      
      <div className="overflow-hidden bg-white rounded-3xl shadow-xl border border-gray-100">
        <div className="md:flex">
          <div className="md:w-1/2 relative bg-gradient-to-br from-gray-50 to-gray-100">
            <img 
              src={data.gifUrl} 
              alt={data.name} 
              className="object-contain w-full h-72 p-8 md:h-full" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-white/50 to-transparent md:hidden"></div>
          </div>
          <div className="p-8 md:w-1/2">
            <div className="flex items-start justify-between mb-6">
              <h1 className="text-3xl font-bold text-gray-800 leading-tight md:text-4xl">{data.name}</h1>
              <button
                onClick={() => toggleFavorite(id!)}
                className="p-3 text-2xl transition-transform bg-gray-100 rounded-full hover:bg-gray-200 hover:scale-110"
                aria-label={isFavorite(id!) ? "Favorilerden çıkar" : "Favorilere ekle"}
              >
                {isFavorite(id!) ? '❤️' : '🤍'}
              </button>
            </div>
            
            <div className="grid gap-5 mt-8">
              <div className="p-5 bg-blue-50 rounded-xl border border-blue-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-100">
                    <svg className="w-5 h-5 text-blue-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <div>
                    <h2 className="text-sm font-semibold text-blue-900 uppercase">HEDEF KAS</h2>
                    <p className="mt-1 text-lg font-medium text-blue-800">{data.target}</p>
                  </div>
                </div>
              </div>
              
              <div className="p-5 bg-purple-50 rounded-xl border border-purple-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 flex items-center justify-center rounded-full bg-purple-100">
                    <svg className="w-5 h-5 text-purple-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                    </svg>
                  </div>
                  <div>
                    <h2 className="text-sm font-semibold text-purple-900 uppercase">KAS GRUBU</h2>
                    <p className="mt-1 text-lg font-medium text-purple-800">{data.bodyPart}</p>
                  </div>
                </div>
              </div>
              
              <div className="p-5 bg-green-50 rounded-xl border border-green-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 flex items-center justify-center rounded-full bg-green-100">
                    <svg className="w-5 h-5 text-green-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                    </svg>
                  </div>
                  <div>
                    <h1 className="text-sm font-semibold text-green-900 uppercase">EKİPMAN</h1>
                    <p className="mt-1 text-lg font-medium text-green-800">{data.equipment}</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-10 p-6 bg-gray-50 rounded-xl border border-gray-100">
              <h3 className="text-lg font-bold text-gray-800 mb-2">Egzersiz İpucu</h3>
              <p className="text-gray-700">
                Bu egzersizi yaparken kas kontrolünü sağlamalı ve doğru formda uygulamalısınız. 
                GIF'teki hareketi dikkatlice inceleyin ve benzer şekilde uygulamaya çalışın.
              </p>
              <div className="mt-4 pt-4 border-t border-gray-200 flex justify-between items-center">
                <div className="text-sm text-gray-500">
                  <span className="font-medium">Zorluk: </span>
                  <span className="text-green-600 font-medium">Orta</span>
                </div>
                <button 
                  onClick={() => toggleFavorite(id!)}
                  className={`px-5 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isFavorite(id!) 
                      ? 'bg-red-100 text-red-700 hover:bg-red-200' 
                      : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                  }`}
                >
                  {isFavorite(id!) ? 'Favorilerden Çıkar' : 'Favorilere Ekle'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExerciseDetail;
