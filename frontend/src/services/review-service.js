import { csrfFetch } from "../store/csrf";

export async function getReviews(gameId) {
	const response = await csrfFetch(`/api/reviews/${gameId}`, {
		method: "GET",
	});
	return response;
}

export async function createReview({
	content: content,
	rating: rating,
	gameId: gameId,
}) {
	const response = await csrfFetch(`/api/reviews/${gameId}`, {
		method: "POST",
		body: JSON.stringify({
			content,
			rating,
		}),
	});
	return response;
}
export async function deleteReview(reviewId) {
	const response = await csrfFetch(`/api/reviews/${reviewId}`, {
		method: "DELETE",
	});
	return response;
}

export async function editReview(reviewId, { content, rating }) {
	const response = await csrfFetch(`/api/reviews/${reviewId}`, {
		method: "PUT",
		body: JSON.stringify({
			content,
			rating,
		}),
	});
	return response;
}
