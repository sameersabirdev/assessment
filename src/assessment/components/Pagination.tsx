import { useAppContext } from "../AppContext";

export default function Pagination() {
  const { page, setPage, totalPages } = useAppContext();

  if (totalPages <= 1) {
    return null;
  }

  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <div className="pagination">
      <button className="pg-btn" disabled={page === 1} onClick={() => setPage((current) => current - 1)}>
        ←
      </button>
      {pages.map((pageNumber) => (
        <button
          key={pageNumber}
          className={`pg-btn${page === pageNumber ? " active" : ""}`}
          onClick={() => setPage(pageNumber)}
        >
          {pageNumber}
        </button>
      ))}
      <button className="pg-btn" disabled={page === totalPages} onClick={() => setPage((current) => current + 1)}>
        →
      </button>
    </div>
  );
}
