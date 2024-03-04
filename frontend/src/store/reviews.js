// const UPDATE_REVIEW_SUCCESS = "reviews/updateReviewSuccess";
// const DELETE_REVIEW_SUCCESS = "reviews/deleteReviewSuccess";
// const FETCH_REVIEWS_REQUEST = "FETCH_REVIEWS_REQUEST";
// const FETCH_REVIEWS_SUCCESS = "FETCH_REVIEWS_SUCCESS";
// const FETCH_REVIEWS_FAILURE = "FETCH_REVIEWS_FAILURE";
// import { csrfFetch } from "./csrf.js";

// export const updateReview = (reviewId, reviewData) => async (dispatch) => {
// 	const response = await fetch(`/api/reviews/${reviewId}`, {
// 		method: "PUT",
// 		headers: { "Content-Type": "application/json" },
// 		body: JSON.stringify(reviewData),
// 	});
// 	if (response.ok) {
// 		const data = await response.json();
// 		dispatch(updateReviewSuccess({ reviewId, ...data }));
// 	}
// };

// export const deleteReview = (reviewId) => async (dispatch) => {
// 	const response = await csrfFetch(`/api/reviews/${reviewId}`, {
// 		method: "DELETE",
// 	});
// 	if (response.ok) {
// 		dispatch(deleteReviewSuccess(reviewId));
// 	}
// };
// const initialState = {
// 	loading: false,
// 	reviews: [],
// 	error: "",
// };
// const reviewsReducer = (state = initialState, action) => {
// 	switch (action.type) {
// 		case DELETE_REVIEW_SUCCESS:
// 			return {
// 				...state,
// 				reviews: state.reviews.filter((review) => review.id !== action.payload),
// 			};
// 		case UPDATE_REVIEW_SUCCESS:
// 			return {
// 				...state,
// 				reviews: state.reviews.map((review) =>
// 					review.id === action.payload.reviewId ? action.payload : review
// 				),
// 			};
// 		default:
// 			return state;
// 	}
// };

// export default reviewsReducer;
