// import { Product } from "@/types/product";

const products: any[] = Array.from({ length: 30 }).map((_, i) => {
  const price = 999 + i * 100;
  const mrp = price + 500;

  return {
    id: i + 1,
    slug: `product-${i + 1}`,

    title: `Product ${i + 1}`,
    brand: i % 2 === 0 ? "TechBrand" : "HomeBrand",
    category: i % 3 === 0 ? "electronics" : "fashion",

    price,
    mrp,
    discountPercent: Math.round(((mrp - price) / mrp) * 100),

    rating: (i % 5) + 1,
    ratingCount: 40 + i * 3,

    inStock: i % 4 !== 0,
    stockQty: i % 4 !== 0 ? 10 + i : 0,

    thumbnail: "./default-img.png",
    images: ["./default-img.png", "./default-img.png"],

    shortDescription: "High quality product",
    description:
      "This is a detailed product description explaining features and benefits.",
    specifications: ["Feature 1", "Feature 2", "Feature 3"],

    createdAt: new Date().toISOString(),
    image: "./default-img.png",
  };
});

export default products;
