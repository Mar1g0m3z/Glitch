import { useState, useEffect } from "react";
import apiClient from "../services/api-client";

const useGames = () => {
	const [games, setGames] = useState([]);
	const [error, setError] = useState("");

	useEffect(() => {
		const controller = new AbortController();
		const signal = controller.signal;

		apiClient
			.get("/games", { signal })
			.then((res) => {
				setGames(res.data.results);
			})
			.catch((error) => {
				if (error.name === "AbortError") return;
				setError("Error fetching games: " + error.message);
			});

		return () => controller.abort();
	}, []);

	return { games, error };
};

export default useGames;
