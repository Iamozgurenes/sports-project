
import { useQuery } from '@tanstack/react-query';
import { fetchBodyParts } from '../api/exerciseApi';

interface BodyPartFilterProps {
  onSelect: (part: string) => void;
  selectedPart: string;
  disabled?: boolean;
}

const BodyPartFilter = ({ onSelect, selectedPart, disabled = false }: BodyPartFilterProps) => {
  const { data: bodyParts = [], isLoading } = useQuery({
    queryKey: ['bodyParts'],
    queryFn: fetchBodyParts,
  });

  
  const allBodyParts = ['all', ...bodyParts];

  if (isLoading) {
    return (
      <div className="flex gap-2 overflow-x-auto py-4">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="h-10 w-24 bg-gray-200 rounded-full animate-pulse"></div>
        ))}
      </div>
    );
  }

  return (
    <div className={`flex gap-2 overflow-x-auto py-4 ${disabled ? 'opacity-50 pointer-events-none' : ''}`}>
      {allBodyParts.map((part) => (
        <button
          key={part}
          onClick={() => onSelect(part)}
          className={`px-5 py-2.5 text-sm font-medium rounded-full whitespace-nowrap transition-colors ${
            selectedPart === part
              ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          {part.charAt(0).toUpperCase() + part.slice(1).replace('-', ' ')}
        </button>
      ))}
    </div>
  );
};

export default BodyPartFilter;
