import { csrfFetch } from "../store/csrf";

export const addToUserLibrary = async (gameIds) => {
	try {
		const promises = gameIds.map(async (gameId) => {
			const response = await csrfFetch("/api/library/checkout", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ gameId }),
			});
			if (!response.ok) {
				throw new Error("Failed to add item to user library");
			}
			return response.json();
		});

		const results = await Promise.all(promises);
		return results;
	} catch (error) {
		throw new Error("Failed to add items to user library");
	}
};
