// app/api/api.ts

// ── Banner (cached with ISR) ────────────────────────────────────────────────
export const getBanners = async (): Promise<string[]> => {
    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/banner/get-banner`,
            { next: { revalidate: 60 } },
        );

        if (!res.ok) return [];

        const data = await res.json();
        const banners = data?.data || [];
        console.log("banners", banners)

        // Only return image URLs of active banners with uploaded images
        const imageUrls: string[] = banners
            .filter(
                (b: any) =>
                    b.isActive && b.image?.status === "uploaded" && b.image?.url,
            )
            .map((b: any) => b.image.url);

        return imageUrls;
    } catch (error) {
        console.error("Error fetching banners:", error);
        return [];
    }
};

// ── Products ────────────────────────────────────────────────────────────────
export const getBestSelling = async (query: string) => {
    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/product/get-products?${query}=true`,
            { next: { revalidate: 3600 } },
        );

        const data = await res.json();

        return data?.data || [];
    } catch (error) {
        console.error("Error fetching best selling products:", error);
        return [];
    }
};

// get category /categories/get-category

export const getCategories = async () => {
    try {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/categories/get-category`,
            { next: { revalidate: 3600 } },
        );
        const data = await response.json();
        return data?.data || [];
    } catch (error) {
        console.error("Error fetching categories:", error);
        return [];
    }
};

export const getSubCategories = async (categoryId?: string) => {
    try {
        const query = categoryId ? `?category=${encodeURIComponent(categoryId)}` : "";
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/subcategory/get-subcategory${query}`,
            { next: { revalidate: 3600 } },
        );
        const data = await response.json();
        return data?.data || [];
    } catch (error) {
        console.error("Error fetching subcategories:", error);
        return [];
    }
};

export const getBrands = async () => {
    try {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/brand/get-brand`,
            { next: { revalidate: 3600 } },
        );
        const data = await response.json();
        return data?.data || [];
    } catch (error) {
        console.error("Error fetching brands:", error);
        return [];
    }
};