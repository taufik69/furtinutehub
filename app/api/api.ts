// app/api/api.ts
export const getBestSelling = async () => {
    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/product/get-products?isBestSelling=true`,
            { cache: "no-store" },
        );

        const data = await res.json();
        return data?.data || [];
    } catch (error) {
        console.error("Error fetching best selling products:", error);
        return [];
    }
};
