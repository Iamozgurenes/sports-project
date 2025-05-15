import { useQuery } from '@tanstack/react-query';
import { fetchBodyParts } from '../api/exerciseApi';

export const useBodyParts = () => {
  return useQuery({
    queryKey: ['bodyParts'],
    queryFn: fetchBodyParts
  });
};
