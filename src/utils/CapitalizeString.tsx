const CapitalizeString = (key: string) => {
  return key
    ?.split("-")
    ?.map((word) => word?.charAt(0)?.toUpperCase() + word?.slice(1))
    ?.join(" ");
};

export default CapitalizeString;
