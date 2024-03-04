import { useState } from "react";
import { useModal } from "../../context/Modal";
import { editReview } from "../../services/review-service";
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa";
function EditReviewModal({
	reviewId,
	initialContent,
	initialRating,
	onUpdate,
}) {
	const { closeModal } = useModal();
	const [content, setContent] = useState(initialContent);
	const [rating, setRating] = useState(initialRating);

	const handleUpdate = async () => {
		try {
			await editReview(reviewId, { content, rating });
			onUpdate(content, rating); // Update the review in the parent component
			closeModal(); // Close the modal after successful update
		} catch (error) {
			console.error("Error updating review:", error);
		}
	};

	return (
		<>
			<div className="edit-review-modal">
				<h3>Edit Review</h3>
				<textarea
					value={content}
					onChange={(e) => setContent(e.target.value)}
				/>
				<div className="rating">
					<button
						className={rating ? "active" : ""}
						onClick={() => setRating(true)}>
						<i>
							<FaThumbsUp></FaThumbsUp>
						</i>
					</button>
					<button
						className={!rating ? "active" : ""}
						onClick={() => setRating(false)}>
						<i>
							<FaThumbsDown></FaThumbsDown>
						</i>
					</button>
				</div>
				<button onClick={handleUpdate}>Update Review</button>
				<button onClick={closeModal}>Cancel</button>
			</div>
		</>
	);
}

export default EditReviewModal;
