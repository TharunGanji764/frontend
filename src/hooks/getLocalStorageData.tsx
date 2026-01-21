const getLocalStorageData = (key: string) => {
  const data = global?.window?.localStorage.getItem(key);
  return data;
};
