
import { notFound } from "next/navigation";

export type ProductDetails = {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand?: string;
  images: string[];
};

export async function getProductById(
  id: string
): Promise<ProductDetails> {
  if (!/^\d+$/.test(id)) {
    notFound();
  }

  const response = await fetch(
    `https://dummyjson.com/products/${id}`,
    {
      next: {
        revalidate: 3600,
      },
    }
  );

  if (response.status === 404) {
    notFound();
  }

  if (!response.ok) {
    throw new Error("Failed to fetch product details");
  }

  return response.json();
}
