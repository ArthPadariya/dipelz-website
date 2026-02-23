import { products } from "../../data/products";
import ProductCard from "../../components/ProductCard";

export default function ShopPage() {
  return (
    <div className="shop-container">
      <h1 className="shop-title">
        Shop Our Ready-to-Eat Collection
      </h1>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "40px" }}>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}