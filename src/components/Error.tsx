export default function ErrorComp() {
    return (
        <div className="p-6 bg-red-50 border border-red-200 rounded-xl text-center">
        <div className="inline-flex justify-center items-center w-12 h-12 rounded-full bg-red-100 text-red-600 mb-4">
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-red-800">Veri yüklenirken bir hata oluştu</h3>
        <p className="mt-2 text-red-700">Lütfen daha sonra tekrar deneyin.</p>
      </div>
    )
}