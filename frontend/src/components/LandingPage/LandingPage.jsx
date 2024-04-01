import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

import "./LandingPage.css";
const LandingPage = () => {
	const [games, setGames] = useState([]);
	const [currentIndex, setCurrentIndex] = useState(0);
	const carouselLimit = 5; // Assume you have a limit for carousel items

	// Determine the base URL based on the environment
	const baseURL =
		window.location.hostname === "localhost"
			? "http://localhost:8000/api/games"
			: "https://glitch-3989.onrender.com/api/games";

	useEffect(() => {
		fetch(baseURL).then((res) => {
			res.json().then((parsedRes) => {
				setGames(parsedRes.Games);
			});
		});
	}, [baseURL]); // Added baseURL as a dependency

	useEffect(() => {
		const interval = setInterval(() => {
			setCurrentIndex(
				(current) => (current + 1) % Math.min(games.length, carouselLimit)
			);
		}, 5000); // Change game every 5 seconds, corrected the comment

		return () => clearInterval(interval);
	}, [games.length, carouselLimit]); // Added carouselLimit as a dependency

	const goToNextGame = () => {
		setCurrentIndex(
			(current) => (current + 1) % Math.min(games.length, carouselLimit)
		);
	};

	const goToPrevGame = () => {
		setCurrentIndex(
			(current) =>
				(current - 1 + Math.min(games.length, carouselLimit)) %
				Math.min(games.length, carouselLimit)
		);
	};

	const carouselGames = games.slice(0, carouselLimit);
	const cardGames = games.slice(carouselLimit);

	return (
		<>
			<div className="landing-page">
				<div className="carousel-container">
					<button
						onClick={goToPrevGame}
						className="carousel-button-prev">
						{"<"}
					</button>
					{carouselGames.length > 0 && (
						<NavLink to={`/games/${carouselGames[currentIndex].id}`}>
							<div
								className="game-name"
								key={carouselGames[currentIndex].id}>
								{carouselGames[currentIndex].name}
								<img
									className="carousel-pic"
									src={carouselGames[currentIndex].imageUrl}
									alt={carouselGames[currentIndex].name}
								/>
							</div>
						</NavLink>
					)}
					<button
						onClick={goToNextGame}
						className="carousel-button-next">
						{">"}
					</button>
				</div>
				<div className="game-cards-container">
					{cardGames.map((game) => (
						<div
							key={game.id}
							className="game-card">
							<NavLink to={`/games/${game.id}`}>
								<div className="name-and-pic">
									{game.name}
									<img
										className="game-pic"
										src={game.imageUrl}
										alt={game.name}
									/>
								</div>
							</NavLink>
						</div>
					))}
				</div>
			</div>
		</>
	);
};

export default LandingPage;
