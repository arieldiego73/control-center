import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import { Dashboard } from "./components/dashboard/Dashboard";
import TopNav from "./components/topnav/Topnav";
import { Sidenav } from "./components/sidenav/Sidenav";
import Userpage from "./components/user/Userpage";
import UserTable from "./components/user/Usertable";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" Component={LoginPage} />
				<Route path="/Dashboard" Component={Dashboard} />
				<Route path="/TopNav" Component={TopNav} />
				<Route path="/Sidenav" Component={Sidenav} />
				<Route path="/Userpage" Component={Userpage} />
				<Route path="/UserTable" Component={UserTable} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
