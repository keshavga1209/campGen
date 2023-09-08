import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Components/Layout/GlobalLayout";
import CampaignHistory from "./Pages/CampaignHistory";
import CampaignManager from "./Pages/CampaignManager";
import Reports from "./Pages/Reports";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Layout />}>
					<Route path="" element={"home"} />
					<Route path="reports" element={<Reports />} />
					<Route index path="history" element={<CampaignHistory />} />
					<Route path="gen-tool" element={<CampaignManager />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
