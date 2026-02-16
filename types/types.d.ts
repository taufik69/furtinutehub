

// types/category.types.ts

export interface CategoryImage {
  url: string;
  publicId: string;
  status: "pending" | "processing" | "uploaded" | "failed";
  lastError?: string;
}

export interface CategorySEO {
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  ogImage: string;
}

export interface CategoryType {
  id?: string; 
  name: string;
  slug: string;
  description: string;

  image: CategoryImage;
  seo: CategorySEO;

  isActive: boolean;
  featured: boolean;
  sortOrder: number;

  filters?: string[];

  createdAt: string;
  updatedAt: string;
 
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