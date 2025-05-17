import type { Exercise } from "../types/exercise";
import api from "./axios";

export const getBodyPartList = async () => {
  const response = await api.get('/exercises/bodyPartList');
  return response.data;
};

export const getExercisesByBodyPart = async ({
  bodyPart,
  limit = 10,
  offset = 0,
}: {
  bodyPart?: string;
  limit?: number;
  offset?: number;
}) => {
  let endpoint = '/exercises';
  
  if (bodyPart && bodyPart !== "tumu") {
    endpoint = `/exercises/bodyPart/${bodyPart}`;
  }

  
  
  const response = await api.get(endpoint, {
    params: { limit, offset },
  });

  return response.data;
};



export const getExerciseById = async (id: string): Promise<Exercise> => {
  const response = await api.get(`/exercises/exercise/${id}`);
  return response.data;
};