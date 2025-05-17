import { useSearchParams } from "react-router-dom";
import { useFavorites } from "../hooks/useFavorites";
import { useExercisesByBodyPart } from "../hooks/useExercisesByBodyPart";
import type { Exercise } from "../types/exercise";
import SkeletonLoader from "./SkeletonLoader";
import Pagination from "./Pagination";
import { Link } from "react-router-dom";
import ErrorComp from "./Error";

type ExerciseListProps = {
  bodyPart: string;
  dataOverride?: Exercise[]; 
};

export default function HomeCard({ bodyPart, dataOverride }: ExerciseListProps) {
  const { toggleFavorite, isFavorite } = useFavorites();
  const [searchParams, setSearchParams] = useSearchParams();

  const pageParam = parseInt(searchParams.get("page") || "1");
  const page = isNaN(pageParam) ? 1 : pageParam;
  const limit = 10;

  const { data, isLoading, isFetching, error } = useExercisesByBodyPart(
    bodyPart,
    page,
    limit,
    !dataOverride 
  );

  const isLastPage = data ? data.length < limit : false;

  const handlePageChange = (newPage: number) => {
    setSearchParams((prev) => {
      const newParams = new URLSearchParams(prev);
      newParams.set("page", String(newPage));
      return newParams;
    });
  };


  const exercises = dataOverride ?? data;

  if (isLoading && !dataOverride) return <SkeletonLoader />;
  if (error && !dataOverride) return <ErrorComp />;
  
  
  if (dataOverride && dataOverride.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-10 bg-gray-50 rounded-lg border border-gray-200 shadow-sm">
        <svg xmlns="http://www.w3.org/2000/svg" className="w-16 h-16 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <h3 className="text-xl font-semibold text-gray-700 mb-2">Arama sonucu bulunamadı</h3>
        <p className="text-gray-500 text-center">Farklı bir anahtar kelime ile tekrar arama yapmayı deneyin.</p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {exercises?.map((exercise: Exercise) =>  (
          <Link
            key={exercise.id}
            to={`/exercise/${exercise.id}`}
            className="overflow-hidden bg-white rounded-2xl shadow-sm border border-gray-100 transition-all duration-300 hover:shadow-xl hover:scale-[1.02] group block"
          >
            <div className="relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <img
                src={exercise.gifUrl}
                alt={exercise.name}
                className="w-full h-52 object-cover transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
              />
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  toggleFavorite(exercise);
                }}
                className="absolute z-20 p-2.5 bg-white/90 backdrop-blur-sm rounded-full shadow-lg top-4 right-4 transition-all duration-300 hover:bg-white group-hover:scale-110"
                aria-label={
                  isFavorite(exercise.id)
                    ? "Favorilerden çıkar"
                    : "Favorilere ekle"
                }
              >
                {isFavorite(exercise.id) ? (
                  <span className="text-xl">❤️</span>
                ) : (
                  <span className="text-xl text-gray-300 hover:text-red-500">🤍</span>
                )}
              </button>
            </div>
            <div className="p-5">
              <h3 className="text-base font-bold text-gray-800 mb-3 truncate">
                {exercise.name}
              </h3>
              <div className="flex flex-wrap gap-2">
                <span className="px-2.5 py-1 text-xs font-medium text-blue-700 bg-blue-50 rounded-full border border-blue-100">
                  {exercise.target}
                </span>
                <span className="px-2.5 py-1 text-xs font-medium text-green-700 bg-green-50 rounded-full border border-green-100">
                  {exercise.equipment}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {!dataOverride && (
        <Pagination
          currentPage={page}
          onPageChange={handlePageChange}
          isLastPage={isLastPage}
          isLoading={isFetching}
        />
      )}
    </>
  );
}
