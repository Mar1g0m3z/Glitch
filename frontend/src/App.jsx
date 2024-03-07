import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet, createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginFormPage from "./components/LoginFormPage";
import SignupFormPage from "./components/SignupFormPage";
import Navigation from "./components/Navigation";
import CartPage from "./components/Cart/CartPage";
import * as sessionActions from "./store/session";
import LandingPage from "./components/LandingPage/LandingPage";
import GamePage from "./components/Games/GamePage";
import NotFoundPage from "./components/PageNotFound";
function Layout() {
	const dispatch = useDispatch();
	const [isLoaded, setIsLoaded] = useState(false);

	useEffect(() => {
		dispatch(sessionActions.restoreUser()).then(() => {
			setIsLoaded(true);
		});
	}, [dispatch]);

	return (
		<>
			<Navigation isLoaded={isLoaded} />
			{isLoaded && <Outlet />}
		</>
	);
}

const router = createBrowserRouter([
	{
		element: <Layout />,
		children: [
			{
				path: "/",
				element: <LandingPage />,
			},
			{
				path: "login",
				element: <LoginFormPage />,
			},
			{
				path: "signup",
				element: <SignupFormPage />,
			},
			{
				path: "games/:gameId",
				element: <GamePage />,
			},
			{
				path: "user/cart",
				element: <CartPage />,
			},
			{ path: "*", element: <NotFoundPage /> },
		],
	},
]);

function App() {
	return <RouterProvider router={router} />;
}

export default App;
