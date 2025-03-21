export type Discount = {
  amount: number;
  percentage: number;
};

export type Menu = {
  id: number; // API returns `id` as a number
  name: string;
  slug: string;
  description: string;
  thumbnail: string;
  price: string;
  category_id: string | number; // API returns `category_id` as a number
  discounted_price: number;
  discount: number;
  rating: string;
  gallery_images: { url: string }[]; // Ensure gallery_images is an array of objects with `url`
  category: {
    id: string | number;
    name: string;
  };
};
