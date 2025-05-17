import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import api from '../api/axios';
import type { Exercise } from '../types/exercise';

const CACHE_KEY = ['searchExercises'];
const CACHE_DURATION_MS = 1000 * 60 * 60; // 1 saat

export const useExerciseSearch = (searchTerm: string) => {
  const { data: allExercises, isFetching, isLoading } = useQuery<Exercise[]>({
    queryKey: CACHE_KEY,
    queryFn: async () => {
      const response = await api.get('/exercises', {
        params: {
          limit: 2000,
          offset: 0,
        },
      });
      return response.data;
    },
    staleTime: CACHE_DURATION_MS,
    gcTime: CACHE_DURATION_MS,
  });

  const filtered = useMemo(() => {
    if (!searchTerm) return [];
    return allExercises?.filter((exercise) =>
      exercise.name.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];
  }, [allExercises, searchTerm]);

  return {
    data: filtered,
    isLoading,
    isFetching,
    isCacheValid: !!allExercises,
  };
};
