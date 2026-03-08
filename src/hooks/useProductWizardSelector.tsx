export const selectBasicInfoValid = (s: any) =>
  s.basicInfo.name.trim().length > 0 &&
  s.basicInfo.shortDescription.trim().length > 0 &&
  s.basicInfo.category.length > 0;

export const selectVariantsValid = (s: any) =>
  s.attributes.length > 0 &&
  s.attributes.every((a: any) => a.name.trim() && a.values.length > 0) &&
  s.variants.length > 0 &&
  s.variants.every((v: any) => v.sku.trim() && v.price > 0 && v.stock >= 0);

export const generateCartesianVariants = (attributes: any[]) => {
  if (!attributes.length) return [];

  const combos = attributes.reduce((acc, attr) => {
    if (!attr.values.length) return acc;

    if (!acc.length)
      return attr.values.map((v: string) => [{ name: attr.name, value: v }]);

    return acc.flatMap((combo: any) =>
      attr.values.map((v: string) => [...combo, { name: attr.name, value: v }]),
    );
  }, []);

  return combos.slice(0, 50).map((combo: any, i: number) => ({
    id: `v_${Date.now()}_${i}`,
    combo,
    sku: "",
    price: 0,
    stock: 0,
  }));
};
