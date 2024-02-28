import { AppRouter } from "@/pages";
import { Navbar } from "@/widget/navbar";
import "./styles/index.sass";

function App() {
	return (
		<div id="app" className="app app_light_theme">
			<Navbar />
			<AppRouter />
		</div>
	);
}

export default App;
