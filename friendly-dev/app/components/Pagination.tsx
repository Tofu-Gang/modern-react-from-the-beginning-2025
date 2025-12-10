type PaginationProps = {
    currentPage: number,
    setCurrentPage: (page:number) => void,
    totalPages: number
}

function Pagination({ currentPage, setCurrentPage, totalPages }:PaginationProps) {
    return (
        totalPages > 1 && <div className="flex justify-center gap-2 mt-8">
            {Array.from({ length: totalPages }, (_, index) => (
                <button
                    key={index + 1}
                    className={`px-3 py-1 rounded ${currentPage === index + 1 ? "bg-blue-600 text-white" : "bg-gray-700 text-gray-200 cursor-pointer"}`}
                    onClick={() => setCurrentPage(index + 1)}
                >
                    {index + 1}
                </button>
            ))}
        </div>
    );
}

export default Pagination;
