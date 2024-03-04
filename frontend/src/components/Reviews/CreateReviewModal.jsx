import { useModal } from "../../context/Modal";
import { useState } from "react";
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa";
import { createReview } from "../../services/review-service";

function CreateReviewModal({ game, afterSubmit }) {
	const [content, setContent] = useState("");
	const [rating, setRating] = useState(undefined);
	const [errors, setErrors] = useState({});
	const { closeModal } = useModal();
	const buttonEnable = content.length >= 10 && rating !== undefined;
	const handleSubmit = (e) => {
		e.preventDefault();
		createReview({
			content,
			rating,
			gameId: game.id,
		})
			.then(closeModal)
			.then(afterSubmit)
			.catch(async (response) => {
				const data = await response.json();
				console.log(response);
				if (data?.errors) {
					setErrors(data.errors);
				}
			});
	};
	return (
		<>
			<div className="create-review">
				<h2>Game Review?</h2>
				{errors?.review}
				{errors?.stars}
				<form
					className="submit-review"
					onSubmit={handleSubmit}>
					<textarea
						value={content}
						placeholder="leave your review here..."
						onChange={(e) => setContent(e.target.value)}></textarea>
					<ul>
						<li>
							<FaThumbsUp onClick={() => setRating(true)}></FaThumbsUp>
						</li>
						<li>
							<FaThumbsDown onClick={() => setRating(false)}></FaThumbsDown>
						</li>
					</ul>
					{
						<button
							className="submit-review-button"
							type="submit"
							disabled={!buttonEnable}>
							Submit Your Review
						</button>
					}
				</form>
			</div>
		</>
	);
}

export default CreateReviewModal;
