'use client';
import {
  newArrivalsData,
  relatedProductData,
  topSellingData,
} from "@/app/page";
import ProductListSec from "@/components/common/ProductListSec";
import BreadcrumbProduct from "@/components/product-page/BreadcrumbProduct";
import Header from "@/components/product-page/Header";
import Tabs from "@/components/product-page/Tabs";
import { useGetMenuByIdQuery } from "@/lib/features/menus/menusApi";
import { Product } from "@/types/product.types";
import { notFound } from "next/navigation";

// const data: Product[] = [
//   ...newArrivalsData,
//   ...topSellingData,
//   ...relatedProductData,
// ];

export default function ProductPage({
  params,
}: {
  params: { slug: string[] };
}) {
  console.log(params)
  const menuId = params.slug[0];
  console.log(menuId)
  const { data: menu, isLoading, error } = useGetMenuByIdQuery(menuId);

  console.log(menu)

  if (isLoading) return <p>Loading product...</p>;
  if (error || !menu) return notFound();

  // const productData = data.find(
  //   (product) => product.id === Number(params.slug[0])
  // );

  // if (!productData?.title) {
  //   notFound();
  // }

  return (
    <main>
      <div className="max-w-frame mx-auto px-4 xl:px-0">
        <hr className="h-[1px] border-t-black/10 mb-5 sm:mb-6" />
        <BreadcrumbProduct title={menu.data?.name ?? "Manu Name"} />
        <section className="mb-11">
          <Header data={menu.data} />
        </section>
        <Tabs />
      </div>
      {/* <div className="mb-[50px] sm:mb-20">
        <ProductListSec title="You might also like" data={relatedProductData} />
      </div> */}
    </main>
  );
}
