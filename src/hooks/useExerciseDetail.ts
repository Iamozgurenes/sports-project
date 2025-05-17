import { useQuery } from "@tanstack/react-query";
import { getExerciseById } from "../api/exerciseApi";
import type { Exercise } from "../types/exercise";

export const useExerciseDetail = (id: string | undefined) => {
  return useQuery<Exercise>({
    queryKey: ["exercise", id],
    queryFn: () => getExerciseById(id!),
    enabled: !!id,
  });
};
