import { Outlet } from "react-router-dom";
import { Navbar } from "@/widget/navbar";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { initAuthData } from "@/entities/user/model/services/initAuthData";
import { userActions } from "@/entities/user/model/slice/userSlice";
import "./styles/index.sass";

function App() {
	const dispatch = useDispatch();

	useEffect(() => {
		const getInitAuthData = async () => {
			const initData = await initAuthData();

			if (!initData) return;

			dispatch(userActions.setInited(initData));
		};

		getInitAuthData();
	}, [dispatch]);

	return (
		<div id="app" className="app app_light_theme">
			<Navbar />
			<Outlet />
		</div>
	);
}

export default App;
