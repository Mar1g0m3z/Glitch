import { useModal } from "../../context/Modal";

function OpenModalButton({
	modalComponent, // Component to render inside the modal
	buttonText, // Text of the button that opens the modal
	onButtonClick, // Optional: callback function called once the button is clicked
	onModalClose, // Optional: callback function called once the modal is closed
	children, // Children components to render inside the button
}) {
	const { setModalContent, setOnModalClose } = useModal();

	const onClick = () => {
		if (onModalClose) setOnModalClose(onModalClose);
		setModalContent(modalComponent);
		if (typeof onButtonClick === "function") onButtonClick();
	};

	// Render children if provided, otherwise render buttonText
	return <button onClick={onClick}>{children || buttonText}</button>;
}

export default OpenModalButton;
