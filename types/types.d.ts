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