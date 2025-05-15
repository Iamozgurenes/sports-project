const SkeletonLoader = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="overflow-hidden rounded-2xl bg-white border border-gray-100 shadow-sm">
          <div className="h-48 bg-gradient-to-r from-gray-200 to-gray-300 animate-pulse"></div>
          <div className="p-4 space-y-3">
            <div className="w-3/4 h-5 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full animate-pulse"></div>
            <div className="flex gap-2">
              <div className="w-1/3 h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full animate-pulse"></div>
              <div className="w-1/3 h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SkeletonLoader;
