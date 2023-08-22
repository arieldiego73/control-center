import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import { Dashboard } from "./components/dashboard/Dashboard";
import TopNav from "./components/topnav/Topnav";
import { Sidenav } from "./components/sidenav/Sidenav";
import Userhandler from "./components/user/Userhandler";
import Userpage from "./components/user/Userpage";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" Component={LoginPage} />
				<Route path="/Dashboard" Component={Dashboard} />
				<Route path="/TopNav" Component={TopNav} />
				<Route path="/Sidenav" Component={Sidenav} />
				<Route path="/Userhandler" Component={Userhandler} />
				<Route path="/Userpage" Component={Userpage} />
				
			</Routes>
		</BrowserRouter>
	);
}

export default App;
