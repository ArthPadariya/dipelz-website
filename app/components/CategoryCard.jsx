import Link from "next/link";
import Image from "next/image";

export default function CategoryCard({ title, image }) {
  return (
    <Link href={`/category/${title}`}>
      <div className="relative cursor-pointer group overflow-hidden rounded-lg">

        <Image
          src={image}
          alt={title}
          width={400}
          height={300}
          className="w-full h-[250px] object-cover group-hover:scale-105 transition duration-500"
        />

        <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-center py-3">
          <h3 className="text-lg font-semibold">{title}</h3>
        </div>

      </div>
    </Link>
  );
}