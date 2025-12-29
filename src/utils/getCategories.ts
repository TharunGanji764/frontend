
export default function getCategories(products: any[]) {
  return Array.from(new Set(products.map((p) => p.category)));
}
