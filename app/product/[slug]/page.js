import { prisma } from "@/lib/prisma";
import ProductPageClient from "./ProductPageClient";

export default async function Page({ params }) {

  // ✅ IMPORTANT — unwrap params
  const { slug } = await params;

  if (!slug) {
    return <div className="p-10">Invalid product URL</div>;
  }

  // 1️⃣ Get product
  const product = await prisma.product.findUnique({
    where: { slug },
  });

  if (!product) {
    return <div className="p-10">Product not found</div>;
  }

  // 2️⃣ Get reviews
  const reviews = await prisma.review.findMany({
    where: { productId: product.id },
    orderBy: { createdAt: "desc" },
  });

  // 3️⃣ Get related products
  const relatedProducts = await prisma.product.findMany({
    where: {
      category: product.category,
      NOT: { id: product.id },
    },
    take: 4,
  });

  return (
    <ProductPageClient
      product={product}
      reviews={reviews}
      relatedProducts={relatedProducts}
    />
  );
}