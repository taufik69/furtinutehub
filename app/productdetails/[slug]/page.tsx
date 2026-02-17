import { notFound } from "next/navigation";
import ProductDetailsClient from "../../../components/ProductDetails/ProductDetailsClient";
import { Suspense } from "react";

// Fetch product by slug
async function getProduct(slug: string) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/product/get-products?slug=${slug}`,
      { cache: "no-store" },
    );
    const data = await response.json();
    return data?.data?.[0] ?? null;
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
}

// Fetch related products by categoryId (exclude current product)
async function getRelatedProducts(
  categoryId: string,
  currentProductslug: string,
) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/product/get-products?category=${categoryId}`,
      { cache: "no-store" },
    );
    const data = await response.json();
    console.log(data);

    const filtered = (data?.data || [])
      .filter((p: any) => p?.slug !== currentProductslug)
      .slice(0, 4);

    return filtered;
  } catch (error) {
    console.error("Error fetching related products:", error);
    return [];
  }
}

export default async function ProductDetailsPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = await params;

  const product = await getProduct(slug);
  if (!product) notFound();

  const categoryId = product?.category?._id;
  const relatedProducts = categoryId
    ? await getRelatedProducts(categoryId, product.slug)
    : [];

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ProductDetailsClient
        product={product}
        relatedProducts={relatedProducts}
      />
    </Suspense>
  );
}
