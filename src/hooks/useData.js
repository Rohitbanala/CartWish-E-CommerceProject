import { useEffect, useState } from "react";
import apiClient from "../utils/api-client";
export default function useData(url) {
  const [data, setData] = useState(null);
  const [errors, setErrors] = useState("");
  useEffect(() => {
    apiClient
      .get(url)
      .then((res) => setData(res.data))
      .catch((err) => setErrors(err.message));
  }, []);
  return { data, errors };
}
