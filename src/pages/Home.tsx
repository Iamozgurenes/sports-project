import { useState, useEffect, useRef } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import {  useLocation, useSearchParams, Link } from 'react-router-dom';
import BodyPartFilter from '../components/BodyPartFilter';
import SearchForm from '../components/SearchForm';
import { fetchExercisesByBodyPart, fetchAllExercises } from '../api/exerciseApi';

import type { Exercise } from '../types/exercise';
import SkeletonLoader from '../components/SkeletonLoader';
import HomeCard from '../components/Card';
import ErrorComp from '../components/Error';
import NotFoundComp from '../components/NotFound';
import TitleDesc from '../components/TitleDesc';

// Sayfa başına gösterilecek egzersiz sayısı
const ITEMS_PER_PAGE = 12;

const Home = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const location = useLocation();
  
  const initialPart = searchParams.get('bodyPart') || 'back';
  const initialSearchTerm = searchParams.get('search') || '';
  const initialPage = parseInt(searchParams.get('page') || '1', 10);
  
  const [selectedPart, setSelectedPart] = useState<string>(initialPart);
  const [searchTerm, setSearchTerm] = useState<string>(initialSearchTerm);
  const [isSearching, setIsSearching] = useState<boolean>(initialSearchTerm.length > 2);
  const [currentPage, setCurrentPage] = useState<number>(initialPage);
  const [totalItems, setTotalItems] = useState<number>(0);
  
  
  const queryClient = useQueryClient();
  const lastSearchTimeRef = useRef<number>(0);
  const allCachedExercisesRef = useRef<Exercise[]>([]);

  const updateUrlParams = (part: string | null, search: string | null, page: number = 1) => {
    const params = new URLSearchParams();
    
    if (part) {
      params.set('bodyPart', part);
    }
    
    if (search && search.length > 2) {
      params.set('search', search);
    }
    
    params.set('page', page.toString());
    
    setSearchParams(params);
  };

  useEffect(() => {
    const bodyPart = searchParams.get('bodyPart');
    const search = searchParams.get('search');
    const page = searchParams.get('page');
    
    if (bodyPart && bodyPart !== selectedPart) {
      setSelectedPart(bodyPart);
      setCurrentPage(1); // Kategori değiştiyse sayfayı sıfırla
    }
    
    if (search !== searchTerm) {
      setSearchTerm(search || '');
      setIsSearching(search !== null && search.length > 2);
    }
    
    if (page) {
      setCurrentPage(parseInt(page, 10));
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
      setTotalItems(data.length);
      
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
          setTotalItems(filteredResults.length);
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
          setTotalItems(filteredResults.length);
        } 
        // Önbellekte veri yoksa önce categori egzersizlerini getir
        else {
          fetchExercisesByBodyPart(selectedPart).then((data: Exercise[]) => {
            const filteredResults = filterExercises(data, searchTerm);
            queryClient.setQueryData(['exercises', 'search', selectedPart, searchTerm], filteredResults);
            setTotalItems(filteredResults.length);
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
            const filtered = filterExercises(allCachedExercisesRef.current, searchTerm);
            setTotalItems(filtered.length);
            return filtered;
          }
          
          const data: Exercise[] = await fetchAndCacheAllExercises();
          const filtered = filterExercises(data, searchTerm);
          setTotalItems(filtered.length);
          return filtered;
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
            const filtered = filterExercises(categoryExercises, searchTerm);
            setTotalItems(filtered.length);
            return filtered;
          }
          
          // Kategori verilerini getir ve arama yap
          const categoryData = await fetchExercisesByBodyPart(selectedPart);
          const filtered = filterExercises(categoryData, searchTerm);
          setTotalItems(filtered.length);
          return filtered;
        }
      } else if (selectedPart === 'all') {
        const cachedData = queryClient.getQueryData<Exercise[]>(['exercises', 'all']);
        if (cachedData) {
          setTotalItems(cachedData.length);
          return cachedData;
        }
        
        const data = await fetchAndCacheAllExercises();
        setTotalItems(data.length);
        return data;
      } else {
        const data = await fetchExercisesByBodyPart(selectedPart);
        setTotalItems(data.length);
        return data;
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
    setCurrentPage(1);
    updateUrlParams(selectedPart, term.length > 2 ? term : null, 1);
  };

  const resetSearch = () => {
    setSearchTerm('');
    setIsSearching(false);
    setCurrentPage(1);
    updateUrlParams(selectedPart, null, 1);
  };

  const handleBodyPartSelect = (part: string) => {
    // Aynı kategori tekrar seçildiğinde bile pagination'ı sıfırla ve URL güncelle
    setSelectedPart(part);
    resetSearch();
    setCurrentPage(1);
    updateUrlParams(part, null, 1);
  };

  // Sayfalama için egzersizleri filtreleme
  const getPaginatedExercises = () => {
    if (!exercises) return [];
    
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    
    return exercises.slice(startIndex, endIndex);
  };

  const totalPages = Math.ceil((totalItems || 0) / ITEMS_PER_PAGE);
  
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      const nextPage = currentPage + 1;
      setCurrentPage(nextPage);
      updateUrlParams(selectedPart, isSearching ? searchTerm : null, nextPage);
    }
  };
  
  const handlePrevPage = () => {
    if (currentPage > 1) {
      const prevPage = currentPage - 1;
      setCurrentPage(prevPage);
      updateUrlParams(selectedPart, isSearching ? searchTerm : null, prevPage);
    }
  };

  const paginatedExercises = getPaginatedExercises();

  return (
    <div className="max-w-7xl px-4 sm:px-6 py-8 mx-auto">
      
      <TitleDesc title='Egzersiz Rehberi' desc='Kas gruplarına göre egzersizleri keşfedin ve sağlıklı bir yaşama adım atın'/>

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
      <ErrorComp/>
      )}

      {!isLoading && paginatedExercises && paginatedExercises.length === 0 && (
        <NotFoundComp/>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {paginatedExercises?.map((exercise: Exercise) => (
        <HomeCard exercise={exercise}/>
        ))}
      </div>

      {/* Sayfalama Kontrolleri */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center space-x-4 mt-12 mb-8">
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded-lg border text-sm flex items-center gap-2 transition-colors ${
              currentPage === 1 
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                : 'bg-white text-gray-700 hover:bg-gray-50 border-gray-200'
            }`}
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Önceki
          </button>
          
          {/* <div className="text-sm font-medium text-gray-700">
            Sayfa {currentPage} / {totalPages} 
            <span className="ml-1 text-gray-500">({totalItems} sonuç)</span>
          </div> */}
          
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 rounded-lg border text-sm flex items-center gap-2 transition-colors ${
              currentPage === totalPages 
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                : 'bg-white text-gray-700 hover:bg-gray-50 border-gray-200'
            }`}
          >
            Sonraki
            <svg className="w-4 h-4" fill="none" viewBox="0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      )}

      {/* Footer */}
      <footer className="mt-16 py-8 border-t border-gray-200">
        <div className="text-center">
          <p className="text-gray-600 text-sm font-medium">
            Bu proje Özgür Enes Osanmaz tarafından yapılmıştır
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
