import { useState, useEffect } from "react";
import axios from "axios";
import { useDebounce } from "use-debounce";

function useFetchGames(category, searchTerm) {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(false);
  const [debouncedSearchTerm] = useDebounce(searchTerm, 500);

  useEffect(() => {
    const fetchGames = async () => {
      setLoading(true);

      let apiUrl = `https://api.rawg.io/api/games?key=19e2812a3b574f739acba93c39ae2213&page_size=10`;

      if (debouncedSearchTerm) {
        apiUrl += `&search=${debouncedSearchTerm}`;
      }

      const categoryOrdering = {
        "top-rated": "-rating",
        "best-of-all-time": "-metacritic",
        "new-releases": "-released",
        "most-popular": "-added",
        "best-sellers": "-suggestions",
        "trending": "-updated",
      };

      if (categoryOrdering[category]) {
        apiUrl += `&ordering=${categoryOrdering[category]}`;
      }

      try {
        const response = await axios.get(apiUrl);
        setGames(response.data.results);
      } catch (error) {
        console.error("Error fetching games:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGames();
  }, [category, debouncedSearchTerm]);

  return { games, loading };
}

export default useFetchGames;
