
"use client";

import { useState } from "react";
import Image from "next/image";

type ProductImageGalleryProps = {
  images: string[];
  title: string;
};

export default function ProductImageGallery({
  images,
  title,
}: ProductImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(0);

  if (images.length === 0) {
    return (
      <div className="flex aspect-square items-center justify-center bg-image-sand text-sm text-text-secondary">
        No image available
      </div>
    );
  }

  return (
    <div>
      <div className="relative aspect-square overflow-hidden bg-image-sand">
        <Image
          src={images[selectedImage]}
          alt={`${title} - Image ${selectedImage + 1}`}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-contain p-8"
        />
      </div>

      {images.length > 1 && (
        <div className="mt-4 grid grid-cols-4 gap-3 sm:grid-cols-5">
          {images.map((image, index) => (
            <button
              key={`${image}-${index}`}
              type="button"
              onClick={() => setSelectedImage(index)}
              aria-label={`View image ${index + 1} of ${title}`}
              aria-pressed={selectedImage === index}
              className={`relative aspect-square overflow-hidden border bg-image-sand transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
                selectedImage === index
                  ? "border-foreground"
                  : "border-border hover:border-foreground"
              }`}
            >
              <Image
                src={image}
                alt=""
                fill
                sizes="(max-width: 640px) 25vw, 100px"
                className="object-contain p-2"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
