import { useModal } from "../../context/Modal";
import { useState, useEffect } from "react";
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa";
import { createReview } from "../../services/review-service";
import "./CreateReview.css";
function CreateReviewModal({ game, afterSubmit }) {
	const [content, setContent] = useState("");
	const [rating, setRating] = useState(undefined);
	const [errors, setErrors] = useState({});
	const { closeModal } = useModal();

	useEffect(() => {
		// Immediately show an error if content length is more than 255 characters
		if (content.length > 255) {
			setErrors((errors) => ({
				...errors,
				content: "Review can't be more than 255 characters",
			}));
		} else {
			// Remove the content error if content length is within the limit
			setErrors((errors) => {
				const newErrors = { ...errors };
				delete newErrors.content;
				return newErrors;
			});
		}
	}, [content]); // This effect depends on changes to content
	// const buttonEnable = content.length >= 10 && rating !== undefined;
	const handleSubmit = (e) => {
		e.preventDefault();
		if (content.length > 255) {
			// This is just an extra precaution, the UI should already prevent this
			return;
		}
		createReview({
			content,
			rating,
			gameId: game.id,
		})
			.then(closeModal)
			.then(afterSubmit)
			.catch(async (response) => {
				const data = await response.json();

				if (data?.errors) {
					setErrors(data.errors);
				}
			});
	};
	return (
		<>
			<div className="create-review">
				<h2>Game Review?</h2>
				<p className="error-message">{errors?.content}</p>

				<form
					className="submit-review"
					onSubmit={handleSubmit}>
					<textarea
						value={content}
						placeholder="leave your review here..."
						onChange={(e) => setContent(e.target.value)}></textarea>
					<ul>
						<FaThumbsUp
							className={`fa-thumbs-up ${rating === true ? "active" : ""}`}
							onClick={() => setRating(true)}
						/>
						<FaThumbsDown
							className={`fa-thumbs-down ${rating === false ? "active" : ""}`}
							onClick={() => setRating(false)}
						/>
					</ul>
					<p className="error-message">{errors?.rating}</p>
					<br />
					{
						<button
							className="submit-review-button"
							type="submit">
							Submit Your Review
						</button>
					}
				</form>
			</div>
		</>
	);
}

export default CreateReviewModal;
