// import axios from "axios";

// export default axios.create({
// 	baseURL: "https://api.rawg.io/api/",
// 	params: {
// 		key: "b67dc0395d944563875b3e0d0df81755",
// 	},
// });
const fetchGames = (page) => {
	const key = process.env.RAWG_API_KEY;
	const myHeaders = new Headers();
	myHeaders.append("Accept", "application/json");

	const requestOptions = {
		method: "GET",
		headers: myHeaders,
		redirect: "follow",
	};

	return fetch(
		`https://api.rawg.io/api/games?key=${key}&page=${page}`,
		requestOptions
	)
		.then((response) => response.json())
		.catch((error) => console.error(error));
};

const fetchGame = (gameId) => {
	const key = process.env.RAWG_API_KEY;
	const myHeaders = new Headers();
	myHeaders.append("Accept", "application/json");

	const requestOptions = {
		method: "GET",
		headers: myHeaders,
		redirect: "follow",
	};

	return fetch(
		`https://api.rawg.io/api/games/${gameId}?key=${key}`,
		requestOptions
	)
		.then((response) => response.json())

		.catch((error) => console.error(error));
};
module.exports.fetchGames = fetchGames;
module.exports.fetchGame = fetchGame;
