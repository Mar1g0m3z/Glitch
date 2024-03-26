import { useNavigate } from "react-router-dom";
import { FaGamepad } from "react-icons/fa";

import "./LibraryButton.css";

const LibraryButton = () => {
	let navigate = useNavigate();

	const goToLibrary = () => {
		navigate("/library");
	};

	return (
		<button
			className="library-button"
			onClick={goToLibrary}>
			<FaGamepad />
		</button>
	);
};

export default LibraryButton;
