import { useState, useEffect } from "react";
import { Contribution } from "@/app/types/github";

const CACHE_KEY_PREFIX = "github_contributions_cache_v3_";
const CACHE_DURATION = 48 * 60 * 60 * 1000; // 48 hours

export function useGithubContributions(selectedYear: number | "lastYear") {
  const [data, setData] = useState<{ [key: string]: { contributions: Contribution[], total: number } }>({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    const fetchData = async (year: number | "lastYear") => {
      setIsLoading(true);
      setError("");
      
      const cacheKey = `${CACHE_KEY_PREFIX}${year}`;
      
      try {
        const cached = localStorage.getItem(cacheKey);
        if (cached) {
          const { contributions, total, timestamp } = JSON.parse(cached);
          if (Date.now() - timestamp < CACHE_DURATION) {
            if (isMounted) {
              setData(prev => ({ ...prev, [year]: { contributions, total } }));
              setIsLoading(false);
            }
            return;
          }
        }
      } catch (e) {
        console.warn("Cache read error", e);
      }

      try {
        const url = year === "lastYear" 
          ? "/api/github-contributions" 
          : `/api/github-contributions?year=${year}`;
        
        const res = await fetch(url);
        if (!res.ok) throw new Error("Failed to fetch data");
        const result = await res.json();
        
        if (result.contributions && isMounted) {
          setData(prev => ({ ...prev, [year]: { contributions: result.contributions, total: result.total } }));
          localStorage.setItem(cacheKey, JSON.stringify({
            contributions: result.contributions,
            total: result.total,
            timestamp: Date.now()
          }));
        }
      } catch (err: any) {
        if (isMounted) {
          setError(err.message || "An error occurred");
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchData(selectedYear);

    return () => {
      isMounted = false;
    };
  }, [selectedYear]);

  return {
    currentYearData: data[selectedYear],
    isLoading,
    error,
  };
}
