import { useEffect, useState } from "react";
import axios from "axios";
import type ipAPI from "../types/types";

export default function useFetch(url: string, input: string) {
  const [data, setData] = useState<ipAPI | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let ignore = false;

    setLoading(true);
    setError(null);

    async function fetchData() {
      try {
        const response = await axios.get(`${url}${input}`)

        const rawData = response.data;

        const data: ipAPI = {
          ip: rawData.ip,
          location: {
            region: rawData.location.region,
            city: rawData.location.city,
            postalCode: rawData.location.postalCode,
            timezone: rawData.location.timezone,
          },
          isp: rawData.isp
        }
        
        if (!ignore) {
          setData(data)
        }

      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchData();

    return () => {
      ignore = true;
    }
  }, [url]);

  return { data, loading, error}
}