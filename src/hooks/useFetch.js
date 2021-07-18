import { useState, useEffect } from "react";
import http from "../helpers";

const useFetch = (url, options = {}) => {
  const [response, setResponse] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await http.get(url, options);
        setResponse(res.data);
      } catch (error) {
        setError(error);
      }
    };
    fetchData();
  }, []);
  return { response, error };
};

export default useFetch;
