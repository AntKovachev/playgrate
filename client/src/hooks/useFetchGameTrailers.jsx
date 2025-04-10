import { useState, useEffect } from "react";
import axios from "axios";

function useFetchGameTrailers(gameId) {
    const [trailers, setTrailers] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!gameId) return;

        const fetchGameTrailers = async () => {
            setLoading(true);

            try {
                const response = await axios.get(`https://api.rawg.io/api/games/${gameId}/movies?key=19e2812a3b574f739acba93c39ae2213`);
                setTrailers(response.data.results || []);
            } catch (error) {
                console.error("Error fetching game trailers:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchGameTrailers();
    }, [gameId]);

    return { trailers, loading };
}

export default useFetchGameTrailers;