const SkeletonLoader = () => {
    return (
      <div className="animate-pulse grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="bg-gray-200 h-52 rounded"></div>
        ))}
      </div>
    );
  };
  
  export default SkeletonLoader;
  