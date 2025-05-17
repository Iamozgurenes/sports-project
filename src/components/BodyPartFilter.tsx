import { useBodyPartList } from "../hooks/useBodyParts";
import ErrorComp from "./Error";
import LoaderComp from "./Loader";

type Props = {
  selectedPart: string;
  onSelect: (part: string) => void;
};

export default function BodyPartFilter({ selectedPart, onSelect }: Props) {
  const { data, isLoading, error } = useBodyPartList();

  if (isLoading) return <LoaderComp />;
  if (error) return <ErrorComp />;

  const bodyParts = ["tumu", ...data];

  return (
    <div className="flex gap-2 overflow-x-auto py-4">
      {bodyParts.map((part: string) => {
        const isSelected = selectedPart === part;
        const label = part === "tumu" ? "Tümü" : part.charAt(0).toUpperCase() + part.slice(1).replace("-", " ");

        return (
          <button
            key={part}
            onClick={() => onSelect(part)}
            className={`px-5 py-2.5 text-sm font-medium rounded-full whitespace-nowrap transition-colors ${
              isSelected
                ? "bg-blue-600 text-white shadow-md shadow-blue-500/20"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}
