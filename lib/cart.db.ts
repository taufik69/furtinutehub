export type CartItem = {
    key: string;
    productId: string;
    name: string;
    slug: string;
    image: string;
    price: number;
    qty: number;
    color?: string;
    size?: string;
    createdAt?: Date;
    updatedAt?: Date;

};
const DB_NAME = "furnitureClient";
const DB_VERSION = 3;
const STORE = "cart";

function openDb(): Promise<IDBDatabase> {
    return new Promise((resolve, reject) => {
        const req = indexedDB.open(DB_NAME, DB_VERSION);

        req.onupgradeneeded = () => {
            const db = req.result;

            // create store if missing
            if (!db.objectStoreNames.contains(STORE)) {
                db.createObjectStore(STORE, { keyPath: "key" });
            }
        };

        req.onsuccess = () => {
            const db = req.result;

            //  safety: if still missing store, force recreate
            if (!db.objectStoreNames.contains(STORE)) {
                db.close();
                indexedDB.deleteDatabase(DB_NAME);
                reject(
                    new Error(`Missing "${STORE}" store. DB deleted. Refresh page.`),
                );
                return;
            }

            resolve(db);
        };

        req.onerror = () => reject(req.error);
    });
}

// get cart
export async function getCart(): Promise<CartItem[]> {
    const db = await openDb();
    return new Promise((resolve, reject) => {
        const tx = db.transaction(STORE, "readonly");
        const store = tx.objectStore(STORE);
        const req = store.getAll();
        req.onsuccess = () => resolve(req.result || [])
        req.onerror = () => reject(req.error)
    })
}

// add to cart
export async function addToCart(payload: CartItem): Promise<CartItem> {
    const db = await openDb();

    return new Promise<CartItem>((resolve, reject) => {
        const tx = db.transaction(STORE, "readwrite");
        const store = tx.objectStore(STORE);

        const now = Date.now();
        const getReq = store.get(payload.key);

        getReq.onsuccess = () => {
            const existing = getReq.result;

            const next: any = existing
                ? {
                    ...existing,
                    qty: existing.qty + (payload.qty ?? 1),
                    updatedAt: now,
                }
                : {
                    key: payload.key,
                    productId: payload.productId,
                    name: payload.name,
                    slug: payload.slug,
                    image: payload.image,
                    price: payload.price,
                    qty: payload.qty ?? 1,
                    color: payload.color,
                    size: payload.size,
                    createdAt: now,
                    updatedAt: now,
                };

            const putReq = store.put(next);

            putReq.onsuccess = () => {
                window.dispatchEvent(new Event("cart:changed")); // UI update signal
                resolve(next);
            };
            putReq.onerror = () => reject(putReq.error);
        };

        getReq.onerror = () => reject(getReq.error);
    });
}

export async function removeCartItem(key: string) {
    const db = await openDb();
    return new Promise<void>((resolve, reject) => {
        const tx = db.transaction(STORE, "readwrite");
        const store = tx.objectStore(STORE);
        const req = store.delete(key);
        req.onsuccess = () => {
            window.dispatchEvent(new Event("cart:changed"));
            resolve();
        };
        req.onerror = () => reject(req.error);
    });
}

// clearCart
export async function clearCart() {
    const db = await openDb();
    return new Promise<void>((resolve, reject) => {
        const tx = db.transaction(STORE, "readwrite");
        const store = tx.objectStore(STORE);
        const req = store.clear();
        req.onsuccess = () => {
            window.dispatchEvent(new Event("cart:changed"));
            resolve();
        };
        req.onerror = () => reject(req.error);
    });
}

// setCartQty
export async function setCartQty(key: string, qty: number) {
    const db = await openDb();
    return new Promise<void>((resolve, reject) => {
        const tx = db.transaction(STORE, "readwrite");
        const store = tx.objectStore(STORE);
        const req = store.get(key);
        req.onsuccess = () => {
            const item = req.result;
            if (!item) return;
            item.qty = qty;
            const putReq = store.put(item);
            putReq.onsuccess = () => {
                window.dispatchEvent(new Event("cart:changed"));
                resolve();
            };
            putReq.onerror = () => reject(putReq.error);
        };
        req.onerror = () => reject(req.error);
    });
}