export const selectBasicInfoValid = (state: any) => {
  return (
    state.basicInfo?.title?.length > 0 &&
    state.basicInfo?.description?.trim().length > 0 &&
    state.basicInfo?.category?.length > 0
  );
};

export const selectVariantsValid = (state: any) => {
  return (
    state?.attributes?.length > 0 &&
    state?.attributes?.every(
      (attribute: any) =>
        attribute?.name?.trim() && attribute?.values?.length > 0,
    ) &&
    state?.variants?.length > 0 &&
    state?.variants?.every(
      (variant: any) =>
        variant?.sku?.trim() && variant?.price > 0 && variant?.stock >= 0,
    )
  );
};

export const generateCartesianVariants = (attributes: any, state: any) => {
  if (attributes?.length <= 0) return [];
  const { variants } = state;
  const combos = attributes?.reduce((acc: any, attr: any) => {
    if (!attr?.values?.length) return acc;

    if (!acc.length)
      return attr?.values?.map((v: string) => [
        { attribute_name: attr?.name, attribute_value: v },
      ]);

    return acc?.flatMap((combo: any) =>
      attr?.values?.map((v: string) => [
        ...combo,
        { attribute_name: attr?.name, attribute_value: v },
      ]),
    );
  }, []);

  const res = combos?.map((combo: any, index: number) => ({
    id: variants?.[index]?.id,
    attributes: combo,
    sku: variants?.[index]?.sku,
    price: variants?.[index]?.price,
    stock: variants?.[index]?.stock,
  }));

  return res;
};

export const groupAttributes = (attributes: any[]) => {
  const grouped: Record<string, Set<string>> = {};

  attributes.forEach((attr) => {
    if (!grouped[attr?.attribute_name]) {
      grouped[attr?.attribute_name] = new Set();
    }

    grouped[attr.attribute_name].add(attr.attribute_value);
  });

  return Object.keys(grouped)?.map((key) => ({
    name: key,
    values: Array?.from(grouped[key]),
  }));
};
