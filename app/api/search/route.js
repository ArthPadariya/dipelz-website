import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req){

  const { searchParams } = new URL(req.url);

  const query = searchParams.get("q") || "";
  const category = searchParams.get("category");
  const sort = searchParams.get("sort");

  let orderBy = { createdAt:"desc" };

  if(sort === "price-low"){
    orderBy = { price:"asc" };
  }

  if(sort === "price-high"){
    orderBy = { price:"desc" };
  }

  const products = await prisma.product.findMany({

    where:{
      name:{
        contains:query,
        mode:"insensitive"
      },
      ...(category && {category})
    },

    orderBy,
    take:10

  });

  return NextResponse.json(products);

}