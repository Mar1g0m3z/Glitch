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
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa";
import "./GamePage.css";
const GamePage = () => {
	const navigate = useNavigate(); // Initialize useNavigate
	const user = useSelector((state) => state.session.user);
	const [reviews, setReviews] = useState([]);
	const [game, setGame] = useState({});
	const [userReview, setUserReview] = useState(null);
	const { gameId } = useParams();

	const baseURL =
		window.location.hostname === "localhost"
			? `http://localhost:8000/api/games/${gameId}`
			: `https://glitch-3989.onrender.com/api/games/${gameId}`;

	const refreshReviews = useCallback(() => {
		getReviews(gameId)
			.then((res) => res.json())
			.then((data) => {
				setReviews(data.Reviews);
				// Find and set user review from the refreshed reviews
				const review = data.Reviews.find(
					(review) => review.userId === user?.id
				);
				setUserReview(review);
			})
			.catch((error) => console.error("Error refreshing reviews:", error));
	}, [gameId, user?.id]);

	useEffect(() => {
		fetch(baseURL)
			.then((res) => res.json())
			.then((data) => {
				setGame(data.Game);
			})
			.catch((error) => console.error("Error fetching game:", error));

		refreshReviews();
	}, [gameId, refreshReviews, baseURL]);

	const handleDeleteReview = async (reviewId) => {
		try {
			await deleteReview(reviewId);
			refreshReviews();
		} catch (error) {
			console.error("Error deleting review:", error);
		}
	};

	const handleAddToCart = async () => {
		try {
			await addItemToCart({ gameId: Number(gameId), quantity: 1 });
			navigate("/user/cart");
		} catch (error) {
			console.error("Failed to add game to cart:", error);
			alert("Error adding game to cart.");
		}
	};

	return (
		<>
			<div className="game-content">
				<div className="game-info">
					<h1>{game.name}</h1>
					<img
						src={game.imageUrl}
						alt={game.name}
					/>
					{user && <button onClick={handleAddToCart}>Add to Cart</button>}
					{user && !userReview && (
						<OpenModalButton
							buttonText="Write Your Review"
							modalComponent={
								<CreateReviewModal
									game={game}
									afterSubmit={refreshReviews}
								/>
							}
						/>
					)}
					<p dangerouslySetInnerHTML={{ __html: game.description }}></p>
				</div>
				<div className="review-section">
					<h2>Reviews</h2>
					<ul className="review-list">
						{reviews.map((review) => (
							<li key={review.id}>
								{review.User.username}: {review.content}
								{review.rating ? <FaThumbsUp /> : <FaThumbsDown />}
								{userReview && userReview.id === review.id && (
									<div className="review-buttons">
										<OpenModalButton
											buttonText="Edit Review"
											modalComponent={
												<EditReviewModal
													reviewId={userReview.id}
													initialContent={userReview.content}
													initialRating={userReview.rating}
													onUpdate={refreshReviews}
												/>
											}
										/>
										<OpenModalButton
											buttonText="Delete Review"
											modalComponent={
												<DeleteReviewModal
													reviewId={userReview.id}
													onDelete={() => handleDeleteReview(userReview.id)}
												/>
											}
										/>
									</div>
								)}
							</li>
						))}
					</ul>
				</div>
			</div>
		</>
	);
};

export default GamePage;
