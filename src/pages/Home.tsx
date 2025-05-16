import { useState, useEffect, useRef } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate, useLocation, useSearchParams } from 'react-router-dom';
import BodyPartFilter from '../components/BodyPartFilter';
import SearchForm from '../components/SearchForm';
import { fetchExercisesByBodyPart, fetchAllExercises } from '../api/exerciseApi';
import { useFavorites } from '../hooks/useFavorites';
import type { Exercise } from '../types/exercise';
import SkeletonLoader from '../components/SkeletonLoader';

const Home = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();
  
  const initialPart = searchParams.get('bodyPart') || 'back';
  const initialSearchTerm = searchParams.get('search') || '';
  
  const [selectedPart, setSelectedPart] = useState<string>(initialPart);
  const [searchTerm, setSearchTerm] = useState<string>(initialSearchTerm);
  const [isSearching, setIsSearching] = useState<boolean>(initialSearchTerm.length > 2);
  
  const { toggleFavorite, isFavorite } = useFavorites();
  const queryClient = useQueryClient();
  const lastSearchTimeRef = useRef<number>(0);
  const allCachedExercisesRef = useRef<Exercise[]>([]);

  const updateUrlParams = (part: string | null, search: string | null) => {
    const params = new URLSearchParams();
    
    if (part) {
      params.set('bodyPart', part);
    }
    
    if (search && search.length > 2) {
      params.set('search', search);
    }
    
    setSearchParams(params);
  };

  useEffect(() => {
    const bodyPart = searchParams.get('bodyPart');
    const search = searchParams.get('search');
    
    if (bodyPart && bodyPart !== selectedPart) {
      setSelectedPart(bodyPart);
    }
    
    if (search !== searchTerm) {
      setSearchTerm(search || '');
      setIsSearching(search !== null && search.length > 2);
    }
  }, [location.search, searchParams, searchTerm, selectedPart]);


  const shouldFetchSearch = (): boolean => {
    const now = Date.now();
    const oneHour = 60 * 60 * 1000; // 1 saat (ms)
    
    
    if (now - lastSearchTimeRef.current > oneHour) {
      lastSearchTimeRef.current = now;
      return true;
    }
    
    return false;
  };

  const fetchAndCacheAllExercises = async (): Promise<Exercise[]> => {
    if (shouldFetchSearch() || allCachedExercisesRef.current.length === 0) {
      const data = await fetchAllExercises();
      allCachedExercisesRef.current = data;
      
      queryClient.setQueryData(['exercises', 'all'], data);
      
      return data;
    }
    
    return allCachedExercisesRef.current;
  };

  // Arama sonuçlarını kategori ve arama terimine göre filtreleme
  const filterExercises = (exercises: Exercise[], searchTerm: string): Exercise[] => {
    return exercises.filter((exercise: Exercise): boolean =>
      exercise.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      exercise.target.toLowerCase().includes(searchTerm.toLowerCase()) ||
      exercise.equipment.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  useEffect(() => {
    if (isSearching && searchTerm.length > 2) {
      // 'all' kategorisindeyse tüm egzersizlerde ara
      if (selectedPart === 'all') {
        fetchAndCacheAllExercises().then((data: Exercise[]) => {
          const filteredResults: Exercise[] = filterExercises(data, searchTerm);
          queryClient.setQueryData(['exercises', 'search', selectedPart, searchTerm], filteredResults);
        });
      } 
      // Seçili kategori içinde ara
      else {
        // Önce yerel bellekte var mı diye kontrol et
        if (allCachedExercisesRef.current.length > 0) {
          // Önce sadece seçili kategoriye ait egzersizleri filtrele
          const categoryExercises = allCachedExercisesRef.current.filter(
            (exercise: Exercise) => exercise.bodyPart.toLowerCase() === selectedPart.toLowerCase()
          );
          // Sonra arama terimine göre filtrele
          const filteredResults = filterExercises(categoryExercises, searchTerm);
          queryClient.setQueryData(['exercises', 'search', selectedPart, searchTerm], filteredResults);
        } 
        // Önbellekte veri yoksa önce categori egzersizlerini getir
        else {
          fetchExercisesByBodyPart(selectedPart).then((data: Exercise[]) => {
            const filteredResults = filterExercises(data, searchTerm);
            queryClient.setQueryData(['exercises', 'search', selectedPart, searchTerm], filteredResults);
          });
        }
      }
    }
  }, [isSearching, searchTerm, selectedPart, queryClient]);

  // Query anahtarına kategori bilgisini de ekle
  const queryKey = isSearching 
    ? ['exercises', 'search', selectedPart, searchTerm] 
    : ['exercises', selectedPart];

  const { data: exercises, isLoading, error } = useQuery<Exercise[]>({
    queryKey,
    queryFn: async () => {
      if (isSearching) {
        // 'all' kategorisindeyse tüm egzersizlerde ara
        if (selectedPart === 'all') {
          if (allCachedExercisesRef.current.length > 0) {
            return filterExercises(allCachedExercisesRef.current, searchTerm);
          }
          
          const data: Exercise[] = await fetchAndCacheAllExercises();
          return filterExercises(data, searchTerm);
        } 
        // Seçili kategori içinde ara
        else {
          // Önbellekte tüm veriler varsa kullan
          if (allCachedExercisesRef.current.length > 0) {
            // Önce sadece seçili kategoriye ait egzersizleri filtrele
            const categoryExercises = allCachedExercisesRef.current.filter(
              (exercise: Exercise) => exercise.bodyPart.toLowerCase() === selectedPart.toLowerCase()
            );
            // Sonra arama terimine göre filtrele
            return filterExercises(categoryExercises, searchTerm);
          }
          
          // Kategori verilerini getir ve arama yap
          const categoryData = await fetchExercisesByBodyPart(selectedPart);
          return filterExercises(categoryData, searchTerm);
        }
      } else if (selectedPart === 'all') {
        const cachedData = queryClient.getQueryData<Exercise[]>(['exercises', 'all']);
        if (cachedData) {
          return cachedData;
        }
        
        return fetchAndCacheAllExercises();
      } else {
        return fetchExercisesByBodyPart(selectedPart);
      }
    },
    enabled: isSearching ? searchTerm.length > 2 : true,
    staleTime: 60 * 60 * 1000, 
    gcTime: 60 * 60 * 1000, 
    refetchOnMount: false, 
    refetchOnWindowFocus: false, 
    refetchOnReconnect: false, 
  });

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    setIsSearching(term.length > 2);
    updateUrlParams(selectedPart, term.length > 2 ? term : null);
  };

  const resetSearch = () => {
    setSearchTerm('');
    setIsSearching(false);
    updateUrlParams(selectedPart, null);
  };

  const handleBodyPartSelect = (part: string) => {
    setSelectedPart(part);
    resetSearch();
    updateUrlParams(part, null);
  };

  const filtered = exercises;

  return (
    <div className="max-w-7xl px-4 sm:px-6 py-8 mx-auto">
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-indigo-700 leading-relaxed pb-1">
          Egzersiz Rehberi
        </h1>
        <p className="mt-3 text-lg text-gray-600">
          Kas gruplarına göre egzersizleri keşfedin ve sağlıklı bir yaşama adım atın
        </p>
      </div>

      <SearchForm onSearch={handleSearch} initialValue={searchTerm} />
      <BodyPartFilter 
        onSelect={handleBodyPartSelect}
        selectedPart={selectedPart} 
        disabled={isSearching}
      />

      <div className="flex items-center gap-3 mt-10 mb-8">
        <h2 className="text-2xl font-bold text-gray-800">Egzersizler</h2>
        {!isSearching && (
          <span className="px-4 py-1 text-sm font-semibold text-blue-700 bg-blue-100 rounded-full">
            {selectedPart}
          </span>
        )}
        {searchTerm && (
          <span className="px-4 py-1 text-sm font-semibold text-gray-700 bg-gray-100 rounded-full flex items-center">
            "{searchTerm}"
            <button
              className="ml-2 text-gray-500 hover:text-gray-700"
              onClick={resetSearch}
            >
              ✕
            </button>
          </span>
        )}
      </div>

      {isLoading && <SkeletonLoader />}
      
      {error && (
        <div className="p-6 bg-red-50 border border-red-200 rounded-xl text-center">
          <div className="inline-flex justify-center items-center w-12 h-12 rounded-full bg-red-100 text-red-600 mb-4">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-red-800">Veri yüklenirken bir hata oluştu</h3>
          <p className="mt-2 text-red-700">Lütfen daha sonra tekrar deneyin.</p>
        </div>
      )}

      {!isLoading && filtered && filtered.length === 0 && (
        <div className="p-10 bg-gray-50 border border-gray-100 rounded-xl text-center">
          <div className="inline-flex justify-center items-center w-12 h-12 rounded-full bg-gray-100 text-gray-600 mb-4">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-800">Sonuç bulunamadı</h3>
          <p className="mt-2 text-gray-600">Arama kriterlerinizle eşleşen egzersiz bulunamadı.</p>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filtered?.map((exercise: Exercise) => (
          <div
            key={exercise.id}
            onClick={() => navigate(`/exercise/${exercise.id}`)}
            className="overflow-hidden bg-white rounded-2xl shadow-sm border border-gray-100 transition-all duration-300 hover:shadow-xl hover:scale-[1.02] group"
          >
            <div className="relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <img 
                src={exercise.gifUrl} 
                alt={exercise.name} 
                className="w-full h-52 object-cover transition-transform duration-500 group-hover:scale-110" 
                loading="lazy"
              />
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleFavorite(exercise); // Artık egzersizin sadece ID'sini değil tüm bilgilerini geçiyoruz
                }}
                className="absolute z-20 p-2.5 bg-white/90 backdrop-blur-sm rounded-full shadow-lg top-4 right-4 transition-all duration-300 
                  hover:bg-white group-hover:scale-110"
                aria-label={isFavorite(exercise.id) ? "Favorilerden çıkar" : "Favorilere ekle"}
              >
                {isFavorite(exercise.id) ? 
                  <span className="text-xl">❤️</span> : 
                  <span className="text-xl text-gray-300 hover:text-red-500">🤍</span>}
              </button>
            </div>
            <div className="p-5">
              <h3 className="text-base font-bold text-gray-800 mb-3 truncate">{exercise.name}</h3>
              <div className="flex flex-wrap gap-2">
                <span className="px-2.5 py-1 text-xs font-medium text-blue-700 bg-blue-50 rounded-full border border-blue-100">
                  {exercise.target}
                </span>
                <span className="px-2.5 py-1 text-xs font-medium text-green-700 bg-green-50 rounded-full border border-green-100">
                  {exercise.equipment}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
