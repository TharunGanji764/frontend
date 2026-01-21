import { useEffect, useState } from "react";

const useFetch = (fetchFunction: () => Promise<any>, dependencies: any[]) => {
  const [state, setState] = useState<{
    data: any | undefined;
    error: any;
    loading: boolean | undefined;
  }>({
    loading: false,
    data: undefined,
    error: undefined,
  });

  useEffect(() => {
    const fetchData = async () => {
      setState({ ...state, loading: true });
      try {
        const data = await fetchFunction();
        setState({ data, loading: false, error: undefined });
      } catch (error) {
        setState({ data: undefined, loading: false, error });
      } finally {
        setState((prevState) => ({ ...prevState, loading: false }));
      }
    };
    fetchData();
  }, dependencies);
  return { ...state };
};

export default useFetch;
