import { useQuery } from '@tanstack/react-query';
import { getExercisesByBodyPart } from '../api/exerciseApi';

export const useExercisesByBodyPart = (
  bodyPart: string,
  page: number = 1,
  limit: number = 10,
  enabled: boolean = true // yeni parametre
) => {
  const offset = (page - 1) * limit;

  return useQuery({
    queryKey: ['exercises', bodyPart, page],
    queryFn: () =>
      getExercisesByBodyPart({ bodyPart, limit, offset }),
    enabled: !!bodyPart && enabled,
    placeholderData: (prev) => prev,
  });
};
