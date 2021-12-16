import { useState, useEffect } from 'react';

export function useFetch(requestFunction, id) {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const getPageData = async () => {
    try {
      const { data: pageData } = await requestFunction(id ? id : null);
      setData(pageData);
    } catch (requestError) {
      setError(requestError);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    getPageData();
  }, [id]);

  return { isLoading, data, error, getPageData };
}
