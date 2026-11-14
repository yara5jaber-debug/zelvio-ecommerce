
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
  total: number;
  skip: number;
  limit: number;
};
const productImageOverrides: Record<number, string> = {
  // Example:
  // 1: "/products/mascara.png",
};


export async function getProducts(): Promise<Product[]> {
  const response = await fetch(
    "https://dummyjson.com/products?limit=8",
    {
      next: { revalidate: 3600 },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }

  const data: DummyJsonResponse = await response.json();

  return data.products.map((item) => {
    const hasDiscount = item.discountPercentage > 0;

    return {
      id: item.id,
      title: item.title,
      category: item.category,
      price: item.price,
      originalPrice: hasDiscount
        ? Number(
            (
              item.price /
              (1 - item.discountPercentage / 100)
            ).toFixed(2)
          )
        : undefined,
      image: productImageOverrides[item.id] ?? item.thumbnail,
    };
  });
}
