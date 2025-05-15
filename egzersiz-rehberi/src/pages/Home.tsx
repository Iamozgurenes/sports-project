import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import BodyPartFilter from '../components/BodyPartFilter';
import SearchForm from '../components/SearchForm';
import { fetchExercisesByBodyPart } from '../api/exerciseApi';
import { useFavorites } from '../hooks/useFavorites';
import { useNavigate } from 'react-router-dom';
import type { Exercise } from '../types/exercise';
import SkeletonLoader from '../components/SkeletonLoader';

const Home = () => {
  const [selectedPart, setSelectedPart] = useState<string>('back');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const { toggleFavorite, isFavorite } = useFavorites();
  const navigate = useNavigate();

  const { data: exercises, isLoading, error } = useQuery<Exercise[]>({
    queryKey: ['exercises', selectedPart],
    queryFn: () => fetchExercisesByBodyPart(selectedPart),
  });

  const filtered = exercises?.filter((exercise: Exercise) =>
    exercise.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Egzersiz Rehberi</h1>

      <SearchForm onSearch={setSearchTerm} />
      <BodyPartFilter onSelect={(part) => {
        setSelectedPart(part);
        setSearchTerm('');
      }} />

      <h2 className="text-lg font-semibold mt-4">Kas Grubu: {selectedPart}</h2>

      {isLoading &&  <SkeletonLoader />}
      {error && <p>Bir hata oluştu</p>}

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
        {filtered?.map((exercise: Exercise) => (
          <div
            key={exercise.id}
            onClick={() => navigate(`/exercise/${exercise.id}`)}
            className="border rounded p-3 shadow hover:scale-[1.02] transition relative"
          >
                {/* FAVORİ BUTONU */}
    <button
      onClick={(e) => {
        e.stopPropagation(); // Tıklama olayının üst elemente geçmesini engelle
        toggleFavorite(exercise.id);
      }}
      className="absolute top-2 right-2 text-red-500 text-xl"
    >
      {isFavorite(exercise.id) ? '❤️' : '🤍'}
    </button>
            <img src={exercise.gifUrl} alt={exercise.name} className="w-full h-40 object-cover" />
            <h3 className="mt-2 font-bold text-sm">{exercise.name}</h3>
            <p className="text-xs text-gray-600">Hedef: {exercise.target}</p>
            <p className="text-xs text-gray-600">Ekipman: {exercise.equipment}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
