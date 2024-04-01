import { useState } from "react";
import { useModal } from "../../context/Modal";
import { editReview } from "../../services/review-service";
import "./EditReview.css";
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa";
function EditReviewModal({
	reviewId,
	initialContent,
	initialRating,
	onUpdate,
}) {
	const { closeModal } = useModal();
	const [error, setError] = useState("");
	const [content, setContent] = useState(initialContent);
	const [rating, setRating] = useState(initialRating);

	const handleUpdate = async () => {
		if (!content.trim()) {
			setError("Review content cannot be empty.");
			return;
		}
		if (content.length > 255) {
			setError("Review can't be more than 255 characters");
			return;
		}

		setError(""); // Clear any existing error
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
				{error && <div className="error-message">{error}</div>}
				<textarea
					value={content}
					onChange={(e) => setContent(e.target.value)}
				/>
				<div className="rating">
					<FaThumbsUp
						className={`fa-thumbs-up ${rating === true ? "active" : ""}`}
						onClick={() => setRating(true)}
					/>
					<FaThumbsDown
						className={`fa-thumbs-down ${rating === false ? "active" : ""}`}
						onClick={() => setRating(false)}
					/>
				</div>
				<button onClick={handleUpdate}>Update Review</button>
				<button
					className="cancel-edit"
					onClick={closeModal}>
					Cancel
				</button>
			</div>
		</>
	);
}

export default EditReviewModal;
