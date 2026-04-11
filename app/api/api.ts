// app/api/api.ts

export interface Banner {
    title: string;
    imageUrl: string;
}

export const getBanners = async (): Promise<Banner[]> => {
    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/banner/get-banner`,
            { next: { revalidate: 60 } },
        );

        if (!res.ok) return [];

        const data = await res.json();
        const banners = data?.data || [];

        // Return banner objects with title and image URL
        return banners
            .filter(
                (b: any) =>
                    b.isActive && b.image?.status === "uploaded" && b.image?.url,
            )
            .map((b: any) => ({
                title: b.title || "Modern Furniture",
                imageUrl: b.image.url
            }));
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