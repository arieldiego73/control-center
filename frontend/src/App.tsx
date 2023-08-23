import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import { Dashboard } from "./components/dashboard/Dashboard";
import Userhandler from "./pages/Userhandler";
import CreateUserHandler from "./pages/CreateUserHandler";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" Component={LoginPage} />
				<Route path="/dashboard" Component={Dashboard} />
				<Route path="/userhandler" Component={Userhandler} />
				<Route path="/createuser" Component={CreateUserHandler} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
