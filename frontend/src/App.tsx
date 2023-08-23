import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import { Dashboard } from "./components/dashboard/Dashboard";
import TopNav from "./components/topnav/Topnav";
import { Sidenav } from "./components/sidenav/Sidenav";
import Userhandler from "./pages/Userhandler";
import Userpage from "./components/user/Userpage";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" Component={LoginPage} />
				<Route path="/dashboard" Component={Dashboard} />
				<Route path="/userhandler" Component={Userhandler} />
				
			</Routes>
		</BrowserRouter>
	);
}

export default App;
