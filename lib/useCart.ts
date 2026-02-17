"use client";

import { useEffect, useState } from "react";
import { getCart, type CartItem } from "./cart.db";

export function useCart() {
    const [items, setItems] = useState<CartItem[]>([]);
    const [count, setCount] = useState(0);

    const refresh = async () => {
        const data = await getCart();
        setItems(data);
        setCount(data.reduce((sum: number, it: any) => sum + it.qty, 0)); // total qty
    };

    useEffect(() => {
        refresh();
        const onChange = () => refresh();
        window.addEventListener("cart:changed", onChange);
        return () => window.removeEventListener("cart:changed", onChange);
    }, []);

    return { items, count, refresh };
}
