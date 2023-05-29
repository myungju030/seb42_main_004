import { useState, useEffect } from 'react';
import apiClient from './apiClient';

const useGET = (url) => {
  const [res, setRes] = useState('');
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);

  const getData = async () => {
    try {
      const response = await apiClient.get(url);
      setRes(response.data);
      setIsPending(false);
    } catch (err) {
      setError(err);
      setIsPending(false);
    }
  };

  useEffect(() => {
    if (url) {
      setIsPending(true);
      setError(null);
      getData();
    }
  }, [url]);

  return [res, isPending, error, getData];
};

export default useGET;
