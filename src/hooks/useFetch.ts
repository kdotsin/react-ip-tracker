import { useEffect, useState } from "react";
import axios from "axios";
import type ipAPI from "../types/types";

export default function useFetch(url: string, input: string) {
  const [data, setData] = useState<ipAPI | null>(null);

  useEffect(() => {
    let ignore = false;

    async function fetchData() {
      try {
        // Only digits and dots means an IP address, anything else is a domain
        const param = /^[\d.]*$/.test(input) ? "ipAddress" : "domain";
        const response = await axios.get(`${url}&${param}=${input}`)

        const rawData = response.data;

        const data: ipAPI = {
          ip: rawData.ip,
          location: {
            region: rawData.location.region,
            city: rawData.location.city,
            postalCode: rawData.location.postalCode,
            timezone: rawData.location.timezone,
            lat: rawData.location.lat,
            lng: rawData.location.lng,
          },
          isp: rawData.isp
        }
        
        if (!ignore) {
          setData(data)
        }

      } catch (error: any) {
        console.error('Error retrieving data:', error.message)
      }
    }

    fetchData();

    return () => {
      ignore = true;
    }
  }, [url, input]);

  return { data };
}