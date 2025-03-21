export type Discount = {
  amount: number;
  percentage: number;
};

export type Product = {
  id: number;
  title: string;
  srcUrl: string;
  gallery?: string[];
  price: number;
  discount: Discount;
  rating: number;
};

interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
}

interface Menu {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
  price: string;
  category_id: string;
}
