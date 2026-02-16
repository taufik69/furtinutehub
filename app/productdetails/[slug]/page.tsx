import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import CollectionProductCard from "@/components/commonComponents/Productcardupdated";
import { ProductImageGallery } from "@/components/ProductDetails/Productclientfinal";

// Fetch product by slug
async function getProduct(slug: string) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/product/get-products?slug=${slug}`,
      { cache: "no-store" },
    );
    const data = await response.json();

    if (data?.data && data.data.length > 0) {
      return data.data[0];
    }
    return null;
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
}

// Fetch related products by category slug
async function getRelatedProducts(categoryId: string) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/product/get-products?category=${categoryId}`,
      { cache: "no-store" },
    );
    const data = await response.json();
    console.log(data);

    // Filter out current product and limit to 4
    const filtered = (data?.data || [])
      .filter((p: any) => p._id !== categoryId)
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

  if (!product) {
    notFound();
  }

  // Get related products
  const relatedProducts = await getRelatedProducts(product?.category?._id);

  // Extract images from API structure
  const images =
    product?.image?.map((img: any) => img.optimized_url || img.url) || [];
  const price = product?.finalPrice || product?.price || 0;
  const originalPrice = product?.price || 0;
  const discountValue = product?.discountValue || 0;
  const inStock = product?.inStock ?? true;

  return (
    <div className="min-h-screen bg-colorBody">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-colorTextBody/60 mb-6">
          <Link href="/" className="hover:text-colorLink">
            Home
          </Link>
          <span>/</span>
          <Link href="/allcollection" className="hover:text-colorLink">
            Shop
          </Link>
          <span>/</span>
          <span className="text-colorTextBody">{product?.name}</span>
        </div>

        {/* Product Details Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-16">
          {/* Client Component for Interactive Parts */}
          <ProductImageGallery
            images={images}
            colors={product?.color || []}
            sizes={product?.size || []}
            inStock={inStock}
            discount={discountValue}
            productName={product?.name || "Product"}
          />

          {/* Product Info - Server Side */}
          <div className="space-y-6">
            {/* Title & Category */}
            <div>
              {product?.category?.name && (
                <p className="text-sm text-colorTextBody/60 mb-2">
                  {product.category.name}
                </p>
              )}
              <h1 className="text-3xl lg:text-4xl font-bold text-colorTextBody mb-3">
                {product?.name}
              </h1>

              {/* Brand */}
              {product?.brand && (
                <p className="text-sm text-colorTextBody/60">
                  Brand:{" "}
                  <span className="font-medium text-colorTextBody">
                    {product.brand}
                  </span>
                </p>
              )}

              {/* Rating */}
              {product?.rating && (
                <div className="flex items-center gap-2 mt-3">
                  <div className="flex items-center">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <svg
                        key={i}
                        className={`w-5 h-5 ${
                          i < Math.floor(product.rating)
                            ? "text-yellow-500"
                            : "text-gray-300"
                        }`}
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-sm text-colorTextBody/60">
                    ({product.rating} stars • {product.totalReviews || 0}{" "}
                    reviews)
                  </span>
                </div>
              )}
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-bold text-colorTextBody">
                ৳ {price.toLocaleString("en-BD")}
              </span>
              {discountValue > 0 && (
                <>
                  <span className="text-xl text-colorTextBody/40 line-through">
                    ৳ {originalPrice.toLocaleString("en-BD")}
                  </span>
                  <span className="text-sm font-semibold text-green-600 bg-green-50 px-2 py-1 rounded">
                    Save {discountValue}%
                  </span>
                </>
              )}
            </div>

            {/* Short Description */}
            {product?.shortDescription && (
              <div className="bg-colorBodyDim/50 p-4 rounded-lg">
                <p className="text-colorTextBody font-medium">
                  {product.shortDescription}
                </p>
              </div>
            )}

            {/* Description */}
            {product?.description && (
              <div className="border-t border-colorBorder pt-6">
                <h3 className="font-semibold text-colorTextBody mb-2">
                  Description
                </h3>
                <p className="text-colorTextBody/80 leading-relaxed">
                  {product.description}
                </p>
              </div>
            )}

            {/* Product Details */}
            <div className="border-t border-colorBorder pt-6 space-y-3">
              <h3 className="font-semibold text-colorTextBody mb-4">
                Product Details
              </h3>

              {product?.sku && (
                <div className="flex items-center justify-between text-sm">
                  <span className="text-colorTextBody/60">SKU:</span>
                  <span className="text-colorTextBody font-medium">
                    {product.sku}
                  </span>
                </div>
              )}

              {product?.category?.name && (
                <div className="flex items-center justify-between text-sm">
                  <span className="text-colorTextBody/60">Category:</span>
                  <span className="text-colorTextBody font-medium">
                    {product.category.name}
                  </span>
                </div>
              )}

              {product?.stock !== undefined && (
                <div className="flex items-center justify-between text-sm">
                  <span className="text-colorTextBody/60">Stock:</span>
                  <span className="text-colorTextBody font-medium">
                    {product.stock} units available
                  </span>
                </div>
              )}

              <div className="flex items-center justify-between text-sm">
                <span className="text-colorTextBody/60">Status:</span>
                <div className="flex items-center gap-2">
                  {product?.isNew && (
                    <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                      New
                    </span>
                  )}
                  {product?.isSale && (
                    <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded">
                      Sale
                    </span>
                  )}
                  {product?.isLimited && (
                    <span className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded">
                      Limited
                    </span>
                  )}
                  {product?.isHot && (
                    <span className="text-xs bg-pink-100 text-pink-700 px-2 py-1 rounded">
                      Hot
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Delivery Info */}
            <div className="border-t border-colorBorder pt-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-start gap-3 p-4 bg-colorBodyDim rounded-lg">
                  <svg
                    className="w-6 h-6 text-colorBtnPrimary shrink-0 mt-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
                    />
                  </svg>
                  <div>
                    <h4 className="font-semibold text-colorTextBody text-sm mb-1">
                      Free Delivery
                    </h4>
                    <p className="text-xs text-colorTextBody/60">
                      On orders over ৳5000
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 bg-colorBodyDim rounded-lg">
                  <svg
                    className="w-6 h-6 text-colorBtnPrimary shrink-0 mt-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                  <div>
                    <h4 className="font-semibold text-colorTextBody text-sm mb-1">
                      Secure Payment
                    </h4>
                    <p className="text-xs text-colorTextBody/60">
                      100% secure transaction
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-colorTextBody">
                Related Products
              </h2>
              <Link
                href={`/allcollection?category=${product?.category?.slug}`}
                className="text-colorLink hover:underline text-sm"
              >
                View All
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct: any) => (
                <CollectionProductCard
                  key={relatedProduct._id || relatedProduct.slug}
                  productData={relatedProduct}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
