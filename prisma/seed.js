const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  const products = [
    {
      name: "Authentic Poha",
      slug: "poha",
      price: 199,
      oldPrice: 249,
      images: ["/poha.PNG"],
      bestSeller: true,
      category: "Breakfast",
      stock: 20,
    },
    {
      name: "Dipelz Combo Pack",
      slug: "combo-pack",
      price: 899,
      oldPrice: 1099,
      images: ["/combo.jpeg"],
      bestSeller: true,
      category: "Combo",
      stock: 15,
    },
    {
      name: "Upma",
      slug: "upma",
      price: 179,
      oldPrice: 229,
      images: ["/upma.jpeg"],
      bestSeller: true,
      category: "Breakfast",
      stock: 25,
    },
    {
      name: "Kheer",
      slug: "kheer",
      price: 149,
      oldPrice: 199,
      images: ["/kheer.jpeg"],
      bestSeller: false,
      category: "MainCourse",
      stock: 30,
    },
    {
      name: "Sambhar",
      slug: "sambhar",
      price: 189,
      oldPrice: 239,
      images: ["/sambhar.jpeg"],
      bestSeller: false,
      category: "MainCourse",
      stock: 18,
    },
    {
      name: "Rasdar Khichdi",
      slug: "rasdar-khichdi",
      price: 229,
      oldPrice: 279,
      images: ["/rasdarkhichdi.jpeg"],
      bestSeller: true,
      category: "Rice",
      stock: 22,
    },
    {
      name: "Noodles Gravy",
      slug: "noodles-gravy",
      price: 199,
      oldPrice: 249,
      images: ["/noodlesgravy.jpeg"],
      bestSeller: false,
      category: "MainCourse",
      stock: 16,
    },
    {
      name: "Masala Rice",
      slug: "masala-rice",
      price: 189,
      oldPrice: 239,
      images: ["/masalarice.jpeg"],
      bestSeller: false,
      category: "Rice",
      stock: 20,
    },
    {
      name: "Dal Fry",
      slug: "dal-fry",
      price: 199,
      oldPrice: 249,
      images: ["/dalfry.jpeg"],
      bestSeller: true,
      category: "MainCourse",
      stock: 14,
    },
    {
      name: "Paneer Punjabi Sabji",
      slug: "paneer-sabji",
      price: 199,
      oldPrice: 249,
      images: ["/punjabi.jpeg"],
      bestSeller: true,
      category: "MainCourse",
      stock: 12,
    },
    {
      name: "Hyderabadi Biryani",
      slug: "hyderabadi-biryani",
      price: 199,
      oldPrice: 249,
      images: ["/biryani.jpeg"],
      bestSeller: true,
      category: "Rice",
      stock: 17,
    },
    {
      name: "Sadi Khichdi",
      slug: "sadi-khichdi",
      price: 199,
      oldPrice: 249,
      images: ["/khichdi.jpeg"],
      bestSeller: true,
      category: "Rice",
      stock: 19,
    },
  ];

  for (const product of products) {
    const exists = await prisma.product.findUnique({
      where: { slug: product.slug },
    });

    if (!exists) {
      await prisma.product.create({
        data: product,
      });
      console.log(`Created: ${product.name}`);
    } else {
      console.log(`Skipped (already exists): ${product.name}`);
    }
  }

  console.log("🌱 Products seeded successfully!");
}

main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });