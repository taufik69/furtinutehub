// app/api/api.ts
export const getBestSelling = async (query: string) => {
    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/product/get-products?${query}=true`,
            { cache: "no-store" },
        );

        const data = await res.json();
        console.log(data)
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
            { cache: "no-store" },
        );
        const data = await response.json();
        return data?.data || [];
    } catch (error) {
        console.error("Error fetching categories:", error);
        return [];
    }
};