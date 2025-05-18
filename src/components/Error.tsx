export default function ErrorComp() {
    return (
        <div className="p-8 bg-gradient-to-br from-red-50 to-red-100 border border-red-200 rounded-2xl shadow-lg mx-auto max-w-md animate-fade-in transition-all duration-300 hover:shadow-xl">
            <div className="flex flex-col items-center">
                <div className="inline-flex justify-center items-center w-16 h-16 rounded-full bg-white border border-red-200 text-red-600 mb-5 shadow-sm transform transition-transform hover:scale-105">
                    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.3" />
                        <path d="M12 7v6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                        <circle cx="12" cy="16" r="1" fill="currentColor" />
                    </svg>
                </div>
                <h3 className="text-xl font-bold text-red-800 mb-2">Veri yüklenirken bir hata oluştu</h3>
                <p className="text-red-700 opacity-80 text-center max-w-xs">Lütfen daha sonra tekrar deneyin veya sistem yöneticinizle iletişime geçin.</p>

                <button className="mt-6 px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-lg shadow-sm transition-all font-medium text-sm">
                    Yeniden Dene
                </button>
            </div>
        </div>
    )
}