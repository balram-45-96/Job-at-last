const SkeletonLoader = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-3 gap-6">
      {Array.from({ length: 6 }).map((_, index) => (
        <div
          key={index}
          className="rounded-3xl border border-gray-400 p-1.5 shadow-md flex flex-col justify-between animate-pulse"
        >
          <div className="bg-gray-300 rounded-3xl p-6">
            <div className="flex justify-between items-center mb-4">
              <span className="w-16 h-6 bg-gray-200 rounded"></span>
              <div className="w-6 h-6 bg-gray-200 rounded-full"></div>
            </div>
            <div className="flex justify-between items-center mb-4">
              <span className="w-24 h-6 bg-gray-200 rounded"></span>
              <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
            </div>
            <p className="w-36 h-4 bg-gray-200 rounded mb-4"></p>
            <div className="mt-2 flex flex-wrap gap-2">
              {Array.from({ length: 3 }).map((_, idx) => (
                <span key={idx} className="w-16 h-6 bg-gray-200 rounded"></span>
              ))}
            </div>
          </div>
          <div className="flex justify-between items-center m-4 mt-4">
            <span className="w-20 h-6 bg-gray-200 rounded"></span>
            <span className="w-24 h-8 bg-gray-200 rounded"></span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SkeletonLoader;
