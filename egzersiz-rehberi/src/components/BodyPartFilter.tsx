import { useBodyParts } from '../hooks/useBodyParts';

interface Props {
  onSelect: (part: string) => void;
}

const BodyPartFilter = ({ onSelect }: Props) => {
  const { data, isLoading, error } = useBodyParts();

  if (isLoading) return <div>Yükleniyor...</div>;
  if (error) return <div>Bir hata oluştu</div>;

  return (
    <div className="flex gap-3 flex-wrap my-4">
      {data?.map((part) => (
        <button
          key={part}
          onClick={() => onSelect(part)}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          {part}
        </button>
      ))}
    </div>
  );
};

export default BodyPartFilter;
