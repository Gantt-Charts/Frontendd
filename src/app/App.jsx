import { Outlet } from "react-router-dom";
import { Navbar } from "@/widget/navbar";
import "./styles/index.sass";

function App() {
	return (
		<div id="app" className="app app_light_theme">
			<Navbar />
			<Outlet />
		</div>
	);
}

export default App;
