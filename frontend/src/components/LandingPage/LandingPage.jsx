import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import "./LandingPage.css";
const LandingPage = () => {
	const [games, setGames] = useState([]);
	const [currentIndex, setCurrentIndex] = useState(0);
	const carouselLimit = 5; // Maximum number of games to display in the carousel

	useEffect(() => {
		fetch("http://localhost:8000/api/games").then((res) => {
			res.json().then((parsedRes) => {
				setGames(parsedRes.Games);
			});
		});
	}, []);
	useEffect(() => {
		const interval = setInterval(() => {
			setCurrentIndex(
				(current) => (current + 1) % Math.min(games.length, carouselLimit)
			);
		}, 5000); // Change game every 2 seconds

		return () => clearInterval(interval);
	}, [games.length]);

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

	// Separate games for carousel and cards
	const carouselGames = games.slice(0, carouselLimit);
	const cardGames = games.slice(carouselLimit);

	return (
		<>
			<div className="landing-page">
				LandingPage
				<div className="carousel-container">
					<button
						onClick={goToPrevGame}
						className="carousel-button">
						{"<"}
					</button>
					{carouselGames.length > 0 && (
						<NavLink to={`/games/${carouselGames[currentIndex].id}`}>
							<div
								className="game-name"
								key={carouselGames[currentIndex].id}>
								{carouselGames[currentIndex].name}
								<img
									className="game-pic"
									src={carouselGames[currentIndex].imageUrl}
									alt={carouselGames[currentIndex].name}
								/>
							</div>
						</NavLink>
					)}
					<button
						onClick={goToNextGame}
						className="carousel-button">
						{">"}
					</button>
				</div>
				<div className="game-cards-container">
					{cardGames.map((game) => (
						<div
							key={game.id}
							className="game-card">
							<NavLink to={`/games/${game.id}`}>
								<div>
									{game.name}
									<img
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
