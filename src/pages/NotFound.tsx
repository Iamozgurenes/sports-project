import { Link } from "react-router-dom";
import { useDocumentTitle } from "../hooks/useDocumentTitle";

const NotFound = () => {
  useDocumentTitle("Sayfa Bulunamadı | Egzersiz Rehberi");



  return (
    <div className="max-w-5xl px-4 py-16 mx-auto text-center">
      <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-10 max-w-2xl mx-auto">
        <div className="inline-flex justify-center items-center w-24 h-24 rounded-full bg-red-50 text-red-500 mb-8">
          <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 7v2M12 15h.01M4.929 19.071c3.905 3.905 10.237 3.905 14.142 0 3.905-3.905 3.905-10.237 0-14.142-3.905-3.905-10.237-3.905-14.142 0-3.905 3.905-3.905 10.237 0 14.142Z" 
                 stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        
        <h1 className="text-5xl font-bold text-gray-800 mb-4">404</h1>
        <h2 className="text-2xl font-bold text-gray-700 mb-6">Sayfa Bulunamadı</h2>
        
        <p className="text-gray-600 mb-8 max-w-md mx-auto">
          Aradığınız sayfa taşınmış, silinmiş veya hiç var olmamış olabilir.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/" 
            className="px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200">
            Ana Sayfaya Dön
          </Link>
          <button onClick={() => window.history.back()} 
            className="px-6 py-3 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition-colors">
            Geri Git
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
