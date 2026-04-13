import { useAppContext } from "../AppContext";
import ProductCard from "./ProductCard";
import Pagination from "./Pagination";

export default function Dashboard() {
  const { products, loading, error, search, setSearch, sortBy, setSortBy, totalCount } = useAppContext();

  return (
    <div className="main">
      <div className="page-title">Product Inventory</div>
      <div className="page-sub">Browse and filter our complete product catalog</div>

      <div className="controls">
        <div className="search-wrap">
          <span className="search-icon">⌕</span>
          <input
            className="search-input"
            placeholder="Search products..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </div>
        <select className="sort-select" value={sortBy} onChange={(event) => setSortBy(event.target.value)}>
          <option value="default">Default Order</option>
          <option value="name-asc">Name A→Z</option>
          <option value="name-desc">Name Z→A</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
        </select>
      </div>

      {!loading && !error && (
        <div className="results-info">{totalCount} product{totalCount !== 1 ? "s" : ""} found</div>
      )}

      {loading && (
        <div className="loading-wrap">
          <div className="spinner" />
          <div className="loading-text">Loading products...</div>
        </div>
      )}

      {error && (
        <div className="error-wrap">
          <div className="error-icon">⚠</div>
          <div className="error-text">{error}</div>
        </div>
      )}

      {!loading && !error && products.length === 0 && (
        <div className="empty-text">No products match your search.</div>
      )}

      {!loading && !error && products.length > 0 && (
        <>
          <div className="grid">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <Pagination />
        </>
      )}
    </div>
  );
}
