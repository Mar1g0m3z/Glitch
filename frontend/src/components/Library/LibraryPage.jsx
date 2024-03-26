import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./LibraryPage.css"; // Adjust the CSS path as necessary

const LibraryPage = () => {
	const [libraryItems, setLibraryItems] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");
	const navigate = useNavigate();

	const sessionUser = useSelector((state) => state.session.user); // Example selector, adjust based on your state shape

	useEffect(() => {
		// Check if there's a logged-in user
		if (!sessionUser) {
			navigate("/"); // Redirect to home if no user is logged in
		}
	}, [sessionUser, navigate]);

	useEffect(() => {
		const fetchLibraryItems = async () => {
			setLoading(true);
			try {
				const response = await fetch("/api/library", {
					method: "GET",
					headers: {
						"Content-Type": "application/json",
					},
				});

				if (!response.ok) {
					throw new Error("Network response was not ok");
				}

				const data = await response.json();
				const groupedItems = groupLibraryItems(data.libraryItems);
				setLibraryItems(groupedItems);
			} catch (error) {
				console.error("Error fetching library items:", error);
				setError("Failed to load library items");
			} finally {
				setLoading(false);
			}
		};

		fetchLibraryItems();
	}, []);

	const groupLibraryItems = (items) => {
		const grouped = items.reduce((acc, item) => {
			const key = item.Game.name;
			if (!acc[key]) {
				acc[key] = {
					count: 1,
					latestPurchaseDate: item.purchaseDate,
					...item.Game,
				};
			} else {
				acc[key].count += 1;
				acc[key].latestPurchaseDate =
					new Date(acc[key].latestPurchaseDate) > new Date(item.purchaseDate)
						? acc[key].latestPurchaseDate
						: item.purchaseDate;
			}
			return acc;
		}, {});

		return Object.values(grouped).map((item) => ({
			name: item.name,
			count: item.count,
			image: item.imageUrl,
			latestPurchaseDate: new Date(
				item.latestPurchaseDate
			).toLocaleDateString(),
		}));
	};

	if (loading) {
		return <div>Loading...</div>;
	}

	if (error) {
		return <div>{error}</div>;
	}

	return (
		<div className="library-container">
			<h2>My Library</h2>
			{libraryItems.length > 0 ? (
				<ul>
					{libraryItems.map((item) => (
						<li key={item.name}>
							<img
								src={item.image}
								alt={item.name}
								style={{ width: "100px", height: "100px" }}
							/>
							{item.name} - Copies: {item.count} - Latest Purchase on:{" "}
							{item.latestPurchaseDate}
						</li>
					))}
				</ul>
			) : (
				<p>Your library is empty.</p>
			)}
		</div>
	);
};

export default LibraryPage;
