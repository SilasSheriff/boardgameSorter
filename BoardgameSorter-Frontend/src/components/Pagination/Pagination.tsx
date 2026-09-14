import "./Pagination.css";

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPrevious: () => void;
    onNext: () => void;
    onPageChange: (page: number) => void;
}

function Pagination({
    currentPage,
    totalPages,
    onPrevious,
    onNext,
    onPageChange,
}: PaginationProps) {

    function getPages(): (number | string)[] {
        if (totalPages <= 7) {
            return Array.from(
                { length: totalPages },
                (_, index) => index + 1
            );
        }

        if (currentPage <= 4) {
            return [1, 2, 3, 4, 5, "...", totalPages];
        }

        if (currentPage >= totalPages - 3) {
            return [
                1,
                "...",
                totalPages - 4,
                totalPages - 3,
                totalPages - 2,
                totalPages - 1,
                totalPages,
            ];
        }

        return [
            1,
            "...",
            currentPage - 1,
            currentPage,
            currentPage + 1,
            "...",
            totalPages,
        ];
    }

    return (
        <div className="pagination">
            <button
                onClick={onPrevious}
                disabled={currentPage === 1}
            >
                Vorherige
            </button>

            <div className="pagination-pages">
                {getPages().map((page, index) =>
                    typeof page === "number" ? (
                        <button
                            key={index}
                            className={
                                page === currentPage
                                    ? "pagination-page active"
                                    : "pagination-page"
                            }
                            onClick={() => onPageChange(page)}
                        >
                            {page}
                        </button>
                    ) : (
                        <span
                            key={index}
                            className="pagination-ellipsis"
                        >
                            {page}
                        </span>
                    )
                )}
            </div>

            <button
                onClick={onNext}
                disabled={currentPage === totalPages}
            >
                Nächste
            </button>
        </div>
    );
}

export default Pagination;