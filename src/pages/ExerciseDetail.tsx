import { useNavigate, useParams } from "react-router-dom";
import { useExerciseDetail } from "../hooks/useExerciseDetail";
import ErrorComp from "../components/Error";
import { useFavorites } from "../hooks/useFavorites";
import LoaderComp from "../components/Loader";
import { useDocumentTitle } from "../hooks/useDocumentTitle";

const ExerciseDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, isLoading, error } = useExerciseDetail(id);
  const { toggleFavorite, isFavorite } = useFavorites();
  
  // Dinamik başlık
  useDocumentTitle(data ? `${data.name} | Egzersiz Rehberi` : 'Egzersiz Detayı');

  if (isLoading) return <LoaderComp text="Egzersiz bilgileri yükleniyor..." />;
  if (error || !data) return <ErrorComp />;

  return (
    <div className="max-w-5xl px-4 py-10 mx-auto">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 px-4 py-2 mb-8 text-gray-600 transition-colors bg-gray-100 rounded-lg hover:bg-gray-200"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Geri
      </button>

      <div className="overflow-hidden bg-white rounded-3xl shadow-xl border border-gray-100">
        <div className="md:flex">
          <div className="md:w-1/2 relative bg-gradient-to-br from-gray-50 to-gray-100">
            <img
              src={data.gifUrl}
              alt={data.name}
              className="object-contain w-full h-72 p-8 md:h-full"
            />
          </div>

          <div className="p-8 md:w-1/2">
            <div className="flex items-start justify-between mb-6">
              <h1 className="text-3xl font-bold text-gray-800 leading-tight md:text-4xl">{data.name}</h1>
              <button
                onClick={() => toggleFavorite(data)}
                className="p-3 text-2xl transition-transform bg-gray-100 rounded-full hover:bg-gray-200 hover:scale-110"
              >
                {isFavorite(data.id) ? "❤️" : "🤍"}
              </button>
            </div>

            <div className="grid gap-5 mt-8">
              {/* Hedef Kas */}
              <InfoCard title="HEDEF KAS" value={data.target} color="blue" />
              {/* Kas Grubu */}
              <InfoCard title="KAS GRUBU" value={data.bodyPart} color="purple" />
              {/* Ekipman */}
              <InfoCard title="EKİPMAN" value={data.equipment} color="green" />
            </div>

            <div className="mt-10 p-6 bg-gray-50 rounded-xl border border-gray-100">
              <h3 className="text-lg font-bold text-gray-800 mb-2">Egzersiz İpucu</h3>
              <p className="text-gray-700">
                Bu egzersizi yaparken kas kontrolünü sağlamalı ve doğru formda uygulamalısınız.
                GIF'teki hareketi dikkatlice inceleyin ve benzer şekilde uygulamaya çalışın.
              </p>
              <div className="mt-4 pt-4 border-t border-gray-200 flex justify-between items-center">
                <div className="text-sm text-gray-500">
                  <span className="font-medium">Zorluk: </span>
                  <span className="text-green-600 font-medium">Orta</span>
                </div>
                <button
                  onClick={() => toggleFavorite(data)}
                  className={`px-5 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isFavorite(data.id)
                      ? "bg-red-100 text-red-700 hover:bg-red-200"
                      : "bg-blue-100 text-blue-700 hover:bg-blue-200"
                  }`}
                >
                  {isFavorite(data.id) ? "Favorilerden Çıkar" : "Favorilere Ekle"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// İçerik kartı bileşeni
const InfoCard = ({
  title,
  value,
  color,
}: {
  title: string;
  value: string;
  color: "blue" | "purple" | "green";
}) => {
  const bg = {
    blue: "bg-blue-50 border-blue-100 text-blue-800",
    purple: "bg-purple-50 border-purple-100 text-purple-800",
    green: "bg-green-50 border-green-100 text-green-800",
  };

  return (
    <div className={`p-5 rounded-xl border ${bg[color]}`}>
      <h2 className="text-sm font-semibold uppercase">{title}</h2>
      <p className="mt-1 text-lg font-medium">{value}</p>
    </div>
  );
};

export default ExerciseDetail;
