import { useBodyParts } from '../hooks/useBodyParts';

interface Props {
  onSelect: (part: string) => void;
  selectedPart?: string;
  disabled?: boolean;
}

const BodyPartFilter = ({ onSelect, selectedPart, disabled = false }: Props) => {
  const { data, isLoading, error } = useBodyParts();

  if (isLoading) return (
    <div className="my-6">
      <div className="h-6 w-40 bg-gray-200 rounded-md mb-4 animate-pulse"></div>
      <div className="flex flex-wrap gap-2">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="h-10 w-24 bg-gray-200 rounded-full animate-pulse"></div>
        ))}
      </div>
    </div>
  );
  
  if (error) return (
    <div className="p-4 bg-red-50 border border-red-200 rounded-xl my-6">
      <div className="flex items-center">
        <div className="flex-shrink-0">
          <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293-1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
          </svg>
        </div>
        <div className="ml-3">
          <p className="text-sm font-medium text-red-800">Kas grupları yüklenirken bir hata oluştu</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className={`my-8 ${disabled ? 'opacity-50 pointer-events-none' : ''}`}>
      <h2 className="mb-4 text-lg font-semibold text-gray-800">Kas Grupları</h2>
      <div className="flex flex-wrap gap-2.5">
        {data?.map((part) => (
          <button
            key={part}
            onClick={() => onSelect(part)}
            className={`px-4 py-2.5 text-sm font-medium transition-all duration-300 rounded-full shadow-sm 
              ${selectedPart === part 
                ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-300/30'
                : 'bg-white text-gray-700 border border-gray-200 hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700'
              }`}
          >
            {part}
          </button>
        ))}
      </div>
    </div>
  );
};

export default BodyPartFilter;
