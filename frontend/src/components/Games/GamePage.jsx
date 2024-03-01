import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const GamePage = () => {
	const [game, setGame] = useState({});
	const { gameId } = useParams();
	useEffect(() => {
		fetch(`http://localhost:8000/api/games/${gameId}`).then((res) => {
			res.json().then((parsedRes) => {
				setGame(parsedRes);
			});
		});
	}, [gameId]);
	return (
		<>
			<div>GamePage!!!!HELP</div>
			<h1>{game.name}</h1>
			<h2 dangerouslySetInnerHTML={{ __html: game.description }}></h2>
			<p>{game.metacritic}</p>
		</>
	);
};

export default GamePage;
