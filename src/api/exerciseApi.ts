import axios from 'axios';

const API_BASE_URL = 'https://exercisedb.p.rapidapi.com';
const API_HEADERS = {
  'X-RapidAPI-Key': '96aacc3f77msh31524feef2483edp1b4320jsnf1c51623af03',
  'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com',
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
  