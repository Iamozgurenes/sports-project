import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import TitleDesc from '../components/TitleDesc';
import BodyPartFilter from '../components/BodyPartFilter';
import HomeCard from '../components/Card';
import SearchBar from '../components/SearchBar';
import { useExerciseSearch } from '../hooks/useExerciseSearch';
import SkeletonLoader from '../components/SkeletonLoader';

const Home = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get("category") || "tumu";
  const selectedBodyPart = categoryParam === "tumu" ? "tumu" : categoryParam;
  const [searchTerm, setSearchTerm] = useState("");

  const { data: searchResults, isLoading: searchLoading } = useExerciseSearch(searchTerm);

  const showSearchResults = searchTerm.length > 0;

  return (
    <div className="max-w-7xl px-4 sm:px-6 py-8 mx-auto">
      <TitleDesc
        title="Egzersiz Rehberi"
        desc="Kas gruplarına göre egzersizleri keşfedin ve sağlıklı bir yaşama adım atın"
      />

      <SearchBar onSearch={setSearchTerm} />

      <BodyPartFilter
        selectedPart={selectedBodyPart}
        onSelect={(part) => {
          setSearchParams({ category: part });
          setSearchTerm(""); // aramayı temizle
        }}
      />

      <div className="flex items-center gap-3 mt-10 mb-8">
        <h2 className="text-2xl font-bold text-gray-800">
          {showSearchResults ? "Arama Sonuçları" : "Egzersizler"}
        </h2>
        {selectedBodyPart !== "tumu" && !showSearchResults && (
          <span className="px-4 py-1 text-sm font-semibold text-blue-700 bg-blue-100 rounded-full">
            {selectedBodyPart}
          </span>
        )}
      </div>

      {showSearchResults ? (
        searchLoading ? (
          <SkeletonLoader />
        ) : (
          <HomeCard bodyPart="" key={searchTerm} dataOverride={searchResults} />
        )
      ) : (
        <HomeCard 
          bodyPart={selectedBodyPart} 
          key={selectedBodyPart} // key değiştiği için yeniden render olacak
        />
      )}

      <footer className="mt-16 py-8 border-t border-gray-200">
        <div className="text-center">
          <p className="text-gray-600 text-sm font-medium">
            Bu proje Özgür Enes Osanmaz tarafından yapılmıştır
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
