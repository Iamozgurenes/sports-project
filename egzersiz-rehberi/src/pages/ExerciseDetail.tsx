import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const API_BASE_URL = 'https://exercisedb.p.rapidapi.com';
const API_HEADERS = {
  'X-RapidAPI-Key': '96aacc3f77msh31524feef2483edp1b4320jsnf1c51623af03', // Buraya kendi RapidAPI anahtarını koy
  'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com',
};

const fetchExerciseById = async (id: string) => {
  const response = await axios.get(`${API_BASE_URL}/exercises/exercise/${id}`, {
    headers: API_HEADERS,
  });
  return response.data;
};

const ExerciseDetail = () => {
  const { id } = useParams<{ id: string }>();

  const { data, isLoading, error } = useQuery({
    queryKey: ['exercise', id],
    queryFn: () => fetchExerciseById(id!),
    enabled: !!id,
  });

  if (isLoading) return <p className="p-4">Yükleniyor...</p>;
  if (error) return <p className="p-4">Hata oluştu.</p>;

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">{data.name}</h1>
      <img src={data.gifUrl} alt={data.name} className="w-full h-64 object-contain mb-4" />
      <p><strong>Hedef Kas:</strong> {data.target}</p>
      <p><strong>Kas Grubu:</strong> {data.bodyPart}</p>
      <p><strong>Ekipman:</strong> {data.equipment}</p>
    </div>
  );
};

export default ExerciseDetail;
