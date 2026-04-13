import type { Product } from "../types";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <div className="card">
      <div className="card-img">
        <img src={product.image} alt={product.title} />
      </div>
      <div className="card-body">
        <div className="card-cat">{product.category}</div>
        <div className="card-title">{product.title}</div>
        <div className="card-footer">
          <div className="price">${product.price.toFixed(2)}</div>
          <div className="rating">
            <span className="star">★</span>
            {product.rating?.rate ?? "0.0"} ({product.rating?.count ?? 0})
          </div>
        </div>
      </div>
    </div>
  );
}
