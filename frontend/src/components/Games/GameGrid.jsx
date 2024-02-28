import { useEffect, useState } from "react";
import apiClient from "../../services/api-client";

const GameGrid = () => {
	const [games, setGames] = useState([]);
	const [error, setError] = useState("");

	useEffect(() => {
		apiClient
			.get("/games")
			.then((res) => {
				setGames(res.data.results);
			})
			.catch((error) => {
				setError("Error fetching games: " + error.message);
			});
	}, []);

	return (
		<>
			{error && <p>Error: {error}</p>}
			<ul>
				{games.map((game) => (
					<li key={game.id}>{game.name}</li>
				))}
			</ul>
		</>
	);
};

export default GameGrid;
