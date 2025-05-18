import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import api from '../api/axios';
import type { Exercise } from '../types/exercise';

const CACHE_KEY = 'allExercises';
const CACHE_DURATION_MS = 1000 * 60 * 60; // 1 saat

export const useExerciseSearch = (searchTerm: string) => {
  const { data: allExercises, isFetching, isLoading } = useQuery<Exercise[]>({
    queryKey: [CACHE_KEY],
    queryFn: async () => {
      const response = await api.get('/exercises', {
        params: {
          limit: 2000, 
        },
      });
      return response.data;
    },
    staleTime: CACHE_DURATION_MS,
    gcTime: CACHE_DURATION_MS,
    enabled: searchTerm.length > 0,
  });


  const filteredResults = useMemo(() => {
    if (!searchTerm || !allExercises) return [];
    
    return allExercises.filter((exercise) => 
      exercise.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [allExercises, searchTerm]);

  return {
    data: filteredResults,
    isLoading: isLoading && searchTerm.length > 0,
    isFetching: isFetching && searchTerm.length > 0,
    isCacheValid: !!allExercises,
  };
};
