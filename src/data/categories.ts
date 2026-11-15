
export type Category = {
  id: number;
  name: string;
  slug: string;
  image: string;
};

export const categories: Category[] = [
  {
    id: 1,
    name: "Electronics",
    slug: "electronics",
    image: "/categories/electronics.png",
  },
  {
    id: 2,
    name: "Fashion & Accessories",
    slug: "fashion",
    image: "/categories/fashion.png",
  },
  {
    id: 3,
    name: "Beauty & Personal Care",
    slug: "beauty",
    image: "/categories/beauty.png",
  },
  {
    id: 4,
    name: "Home & Kitchen",
    slug: "home",
    image: "/categories/home.png",
  },
  {
    id: 5,
    name: "Grocery & Food",
    slug: "grocery",
    image: "/categories/grocery.png",
  },
];
