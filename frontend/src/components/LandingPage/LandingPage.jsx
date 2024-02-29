import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
const LandingPage = () => {
	const [games, setGames] = useState([]);

	useEffect(() => {
		fetch("http://localhost:8000/api/games").then((res) => {
			res.json().then((parsedRes) => {
				setGames(parsedRes.results);
			});
		});
	}, []);
	console.log(games);

	return (
		<>
			<div>LandingPage</div>
			<ul>
				{games.map((game) => {
					return (
						<NavLink
							key={game.id}
							to={`/games/${game.id}`}>
							<li key={game.id}>
								{game.name}
								<img src={game.background_image}></img>
							</li>
						</NavLink>
					);
				})}
			</ul>
		</>
	);
};

export default LandingPage;
