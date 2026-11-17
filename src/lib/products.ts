
import type { Product } from "@/components/products/ProductCard";

type DummyJsonProduct = {
  id: number;
  title: string;
  price: number;
  discountPercentage: number;
  category: string;
  thumbnail: string;
};

type DummyJsonResponse = {
  products: DummyJsonProduct[];
};

const categoryMapping: Record<string, string> = {
  smartphones: "Electronics",
  laptops: "Electronics",
  tablets: "Electronics",
  "mobile-accessories": "Electronics",

  "mens-shirts": "Fashion & Accessories",
  "womens-dresses": "Fashion & Accessories",
  "womens-bags": "Fashion & Accessories",

  beauty: "Beauty & Personal Care",
  fragrances: "Beauty & Personal Care",
  "skin-care": "Beauty & Personal Care",

  furniture: "Home & Kitchen",
  "home-decoration": "Home & Kitchen",
  "kitchen-accessories": "Home & Kitchen",

  groceries: "Grocery & Food",
};

const selectedCategories = [
  "smartphones",
  "womens-bags",
  "beauty",
  "home-decoration",
  "groceries",
];

export async function getProducts(): Promise<Product[]> {
  const responses = await Promise.all(
    selectedCategories.map(async (category) => {
      const response = await fetch(
        `https://dummyjson.com/products/category/${category}?limit=4`,
        {
          next: { revalidate: 3600 },
        }
      );

      if (!response.ok) {
        throw new Error(
          `Failed to fetch products for ${category}`
        );
      }

      const data: DummyJsonResponse = await response.json();

      return data.products;
    })
  );

  const products = responses.flat();

  return products.map((item) => {
    const hasDiscount = item.discountPercentage > 0;

    return {
      id: item.id,
      title: item.title,
      category:
        categoryMapping[item.category] ?? item.category,
      price: item.price,
      originalPrice: hasDiscount
        ? Number(
            (
              item.price /
              (1 - item.discountPercentage / 100)
            ).toFixed(2)
          )
        : undefined,
      image: item.thumbnail,
    };
  });
}
