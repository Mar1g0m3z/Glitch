import { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import OpenModalButton from "../OpenModalButton";
import CreateReviewModal from "../Reviews/CreateReviewModal";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addItemToCart } from "../../services/cart-service";
import DeleteReviewModal from "../Reviews/DeleteReviewModal";
import { getReviews, deleteReview } from "../../services/review-service";
import EditReviewModal from "../Reviews/EditReviewModal";
const GamePage = () => {
	const navigate = useNavigate(); // Initialize useNavigate
	const user = useSelector((state) => state.session.user);

	const [reviews, setReviews] = useState([]);
	const [game, setGame] = useState({});
	const [userReview, setUserReview] = useState(null);
	const { gameId } = useParams();

	const refreshReviews = useCallback(() => {
		getReviews(gameId)
			.then((revRes) => revRes.json())
			.then((parsedRev) => {
				setReviews(parsedRev.Reviews);
			})
			.catch((error) => console.error("Error refreshing reviews:", error));
	}, [gameId]);

	useEffect(() => {
		fetch(`http://localhost:8000/api/games/${gameId}`)
			.then((res) => res.json())
			.then((parsedRes) => {
				setGame(parsedRes.Game);
			})
			.catch((error) => console.error("Error fetching game:", error));
		refreshReviews();
	}, [gameId, refreshReviews]);

	useEffect(() => {
		if (user) {
			const userReview = reviews.find((review) => review.userId === user.id);
			setUserReview(userReview);
		}
	}, [user, reviews]);
	const handleUpdateReview = (content, rating) => {
		const updatedReviews = reviews.map((review) =>
			review.id === userReview.id ? { ...review, content, rating } : review
		);
		setReviews(updatedReviews);
	};

	const handleDeleteReview = async (reviewId) => {
		try {
			await deleteReview(reviewId);
			refreshReviews(); // Update the reviews list after deletion
		} catch (error) {
			console.error("Error deleting review:", error);
		}
	};

	const handleAddToCart = async () => {
		try {
			await addItemToCart({ gameId: Number(gameId), quantity: 1 });
			navigate("/user/cart"); // Navigate to the cart page
		} catch (error) {
			console.error("Failed to add game to cart:", error);
			alert("Error adding game to cart.");
		}
	};

	return (
		<>
			<div>GamePage!!!!HELP</div>
			<h1>{game.name}</h1>
			<h2 dangerouslySetInnerHTML={{ __html: game.description }}></h2>
			<ul>
				{reviews.map((review) => (
					<li
						key={
							review.id
						}>{`${review.User.username}: ${review.content} ${review.rating}`}</li>
				))}
			</ul>

			{user && <button onClick={handleAddToCart}>Add to Cart</button>}
			{user && !userReview ? (
				<OpenModalButton
					buttonText="Write Your Review"
					modalComponent={
						<CreateReviewModal
							game={game}
							afterSubmit={refreshReviews}
						/>
					}
				/>
			) : null}
			{userReview ? (
				<>
					<OpenModalButton
						buttonText="Edit Review"
						modalComponent={
							<EditReviewModal
								reviewId={userReview.id}
								initialContent={userReview.content}
								initialRating={userReview.rating}
								onUpdate={handleUpdateReview}
							/>
						}
					/>
					<OpenModalButton
						buttonText="Delete Review"
						modalComponent={
							<DeleteReviewModal
								reviewId={userReview.id}
								onDelete={handleDeleteReview}
							/>
						}
					/>
				</>
			) : null}
		</>
	);
};

export default GamePage;
