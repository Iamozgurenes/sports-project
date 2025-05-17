export default function NotFoundComp() {
    return (
        <div className="p-12 bg-gradient-to-br from-white to-blue-50 border border-blue-100 shadow-lg rounded-2xl text-center max-w-md mx-auto my-8 transition-all duration-300 hover:shadow-xl">
            <div className="inline-flex justify-center items-center w-16 h-16 rounded-full bg-blue-100 text-blue-600 mb-6 transition-transform duration-500 hover:rotate-12">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M12 14a2 2 0 100-4 2 2 0 000 4M13 10h-.01M11 10h-.01M12 20h.01" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-3">Sonuç bulunamadı</h3>
            <p className="text-gray-600 mb-6">Arama kriterlerinizle eşleşen egzersiz bulunamadı.</p>
            
            <button
                className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-300 transform hover:scale-105 active:scale-95"
                onClick={() => window.history.back()}
            >
                Geri Dön
            </button>
        </div>
    )
}
