import db from "@/lib/db";
import ProductList from "@/components/product-list";
import { Prisma } from "@prisma/client";
import Link from "next/link";
import { PlusIcon } from "@heroicons/react/24/solid";
import { unstable_cache as nextCache } from "next/cache";

const getCachedProduct = nextCache(getInitialProduct, ["home-products"],);

async function getInitialProduct() {
  const products = await db.product.findMany({
    select: {
      title: true,
      price: true,
      created_at: true,
      photo: true,
      id: true,
    },
    take: 1,
    orderBy: {
      created_at: "desc",
    },
  });
  return products;
}

export type InitialProducts = Prisma.PromiseReturnType<
  typeof getInitialProduct
>;

export const metadata = {
  title: "Home",
};

export default async function Products() {
  const initialProducts = await getCachedProduct();
  return (
    <div>
      <ProductList initialProducts={initialProducts} />
      <Link
        href="/products/add"
        className="bg-orange-500 flex items-center justify-center rounded-full size-16 fixed bottom-24 right-8 text-white transition-colors hover:bg-orange-400"
      >
        <PlusIcon className="size-10" />
      </Link>
    </div>
  );
}
