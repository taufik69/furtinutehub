export interface CategoryCardProps {
  id: number;
  title: string;
  imageUrl: string;
  href: string;
}


export interface ProductCardProps {
  id: string | number;
  name: string;
  description: string;
  image: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  tags?: string[];
  slug: string;
}



export interface CollectionProduct {
  id: number;
  name: string;
  description: string;
  image: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  tags?: string[];
  slug: string;
  category: string;
  colors: string[];
  availability: "in-stock" | "out-of-stock" | "limited";
  rating: number;
  reviewCount: number;
}