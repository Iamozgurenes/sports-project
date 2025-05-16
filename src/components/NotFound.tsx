export default function NotFoundComp() {
    return (
            <div className="p-10 bg-gray-50 border border-gray-100 rounded-xl text-center">
          <div className="inline-flex justify-center items-center w-12 h-12 rounded-full bg-gray-100 text-gray-600 mb-4">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-800">Sonuç bulunamadı</h3>
          <p className="mt-2 text-gray-600">Arama kriterlerinizle eşleşen egzersiz bulunamadı.</p>
        </div>
    )
}
