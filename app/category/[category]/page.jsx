import { prisma } from "@/lib/prisma";
import ProductCard from "../../components/ProductCard";

export const dynamic = "force-dynamic";

export default async function CategoryPage(props) {
  // ✅ Next.js 16 fix — params must be awaited
  const { category } = await props.params;

  if (!category) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-10">
        <p className="text-center text-red-500">
          Category not found.
        </p>
      </div>
    );
  }

  // ✅ Case-insensitive match
  const products = await prisma.product.findMany({
    where: {
      category: {
        equals: category,
        mode: "insensitive",
      },
    },
  });

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <div className="bg-black text-white py-16 text-center mb-10">
        <h1 className="text-4xl font-semibold capitalize">
          {category}
        </h1>
      </div>

      {products.length === 0 ? (
        <p className="text-center text-gray-500">
          No products found.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}