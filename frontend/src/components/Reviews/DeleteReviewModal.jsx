import { useModal } from "../../context/Modal";
import "./DeleteReview.css";
function DeleteReviewModal({ reviewId, onDelete }) {
	const { closeModal } = useModal();

	const handleDelete = async () => {
		try {
			await onDelete(reviewId);
			closeModal(); // Close the modal after successful deletion
		} catch (error) {
			console.error("Error deleting review:", error);
		}
	};

	return (
		<>
			<div className="delete-review-modal">
				<h3>Confirm Delete</h3>
				<p>Are you sure you want to delete this review?</p>
				<button
					className="yes-delete"
					onClick={handleDelete}>
					Yes (Delete Review)
				</button>
				<button onClick={closeModal}>No (Keep Review)</button>
			</div>
		</>
	);
}

export default DeleteReviewModal;
