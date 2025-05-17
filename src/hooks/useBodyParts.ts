import { useQuery } from '@tanstack/react-query';
import { getBodyPartList } from '../api/exerciseApi';

export const useBodyPartList = () => {
  return useQuery({
    queryKey: ['bodyPartList'],
    queryFn: getBodyPartList,
    staleTime: 1000 * 60 * 10,
  });
};
