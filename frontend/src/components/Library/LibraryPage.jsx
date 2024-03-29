import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./LibraryPage.css"; // Adjust the CSS path as necessary

const LibraryPage = () => {
	const [libraryItems, setLibraryItems] = useState([]);
	const [filteredItems, setFilteredItems] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");
	const [filterType, setFilterType] = useState("alphabetical");
	const [searchQuery, setSearchQuery] = useState("");
	const navigate = useNavigate();

	const sessionUser = useSelector((state) => state.session.user);

	useEffect(() => {
		if (!sessionUser) {
			navigate("/");
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
				setFilteredItems(sortItems(groupedItems, filterType));
			} catch (error) {
				console.error("Error fetching library items:", error);
				setError("Failed to load library items");
			} finally {
				setLoading(false);
			}
		};

		fetchLibraryItems();
	}, []);

	useEffect(() => {
		let items = sortItems([...libraryItems], filterType);
		if (searchQuery) {
			items = items.filter((item) =>
				item.name.toLowerCase().includes(searchQuery.toLowerCase())
			);
		}
		setFilteredItems(items);
	}, [filterType, searchQuery, libraryItems]);

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
	const sortItems = (items, filterType) => {
		switch (filterType) {
			case "alphabetical":
				return items.sort((a, b) => a.name.localeCompare(b.name));
			case "datePurchased":
				return items.sort(
					(a, b) =>
						new Date(b.latestPurchaseDate) - new Date(a.latestPurchaseDate)
				);
			default:
				return items;
		}
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
			<div className="filter">
				<select
					onChange={(e) => setFilterType(e.target.value)}
					value={filterType}>
					<option value="alphabetical">Alphabetical</option>
					<option value="datePurchased">Date Purchased</option>
				</select>
				<input
					type="text"
					placeholder="Search games..."
					value={searchQuery}
					onChange={(e) => setSearchQuery(e.target.value)}
				/>
			</div>
			{filteredItems.length > 0 ? (
				<ul className="game-lib">
					{filteredItems.map((item) => (
						<li
							className="game-container"
							key={item.name}>
							<img
								className="game-img"
								src={item.image}
								alt={item.name}
							/>
							<div className="game-stuff">
								{item.name} - Copies: {item.count} <br /> Latest Purchase on:
								{item.latestPurchaseDate}
							</div>
						</li>
					))}
				</ul>
			) : (
				<p>No games found.</p>
			)}
		</div>
	);
};
export default LibraryPage;
