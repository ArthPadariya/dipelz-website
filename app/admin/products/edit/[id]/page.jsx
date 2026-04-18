import { prisma } from "@/lib/prisma";
import EditProductForm from "./EditProductForm";

export default async function EditProductPage(props) {
  const { id } = await props.params;

  const product = await prisma.product.findUnique({
    where: { id },
  });

  if (!product) {
    return <div className="p-10">Product not found</div>;
  }

  return (
    <div className="p-10">
      <h1 className="text-3xl font-semibold mb-8">
        Edit Product
      </h1>

      <EditProductForm product={product} />
    </div>
  );
}