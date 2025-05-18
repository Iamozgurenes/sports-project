import LoaderComp from "./Loader";

type PaginationProps = {
  currentPage: number;
  onPageChange: (page: number) => void;
  isLastPage: boolean;
  isLoading?: boolean;
};

const Pagination = ({ currentPage, onPageChange, isLastPage, isLoading }: PaginationProps) => {
  return (
    <div className="flex justify-center items-center mt-8 gap-5">
      <button
        onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
        disabled={currentPage === 1}
        className="px-5 py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-40 disabled:bg-gray-400 transition-all duration-300 ease-in-out shadow-md hover:shadow-lg flex items-center gap-1"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Önceki
      </button>

      <span className="bg-gray-100 px-4 py-2 rounded-full text-indigo-800 font-medium shadow-sm">
        Sayfa / {currentPage}
      </span>

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={isLastPage}
        className="px-5 py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-40 disabled:bg-gray-400 transition-all duration-300 ease-in-out shadow-md hover:shadow-lg flex items-center gap-1"
      >
        Sonraki
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {isLoading && <span className="text-sm ml-2"><LoaderComp/></span>}
    </div>
  );
};

export default Pagination;
