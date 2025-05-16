import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const API_HEADERS = {
  'X-RapidAPI-Key': import.meta.env.VITE_API_KEY,
  'X-RapidAPI-Host': import.meta.env.VITE_API_HOST,
};

export const fetchBodyParts = async (): Promise<string[]> => {
  const response = await axios.get(`${API_BASE_URL}/exercises/bodyPartList`, {
    headers: API_HEADERS,
  });
  return response.data;
};


export const fetchExercisesByBodyPart = async (bodyPart: string) => {
    const response = await axios.get(
      `https://exercisedb.p.rapidapi.com/exercises/bodyPart/${bodyPart}`,
      { headers: API_HEADERS }
    );
    return response.data;
  };
  