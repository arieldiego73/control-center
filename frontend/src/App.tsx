import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import { Dashboard } from "./components/dashboard/Dashboard";
import Userhandler from "./pages/Userhandler";
import CreateUserHandler from "./pages/CreateUserHandler";
import ProjectHandler from "./pages/ProjectHandler";
import Modal from "./components/modal/Modal";
import popUp from "./components/for testing/popUp";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" Component={LoginPage} />
				<Route path="/dashboard" Component={Dashboard} />
				<Route path="/userhandler" Component={Userhandler} />
				<Route path="/createuser" Component={CreateUserHandler} />
				<Route path="/project" Component={ProjectHandler} />
				{/* <Route path="/modal" Component={Modal} /> */}
				<Route path="/test" Component={popUp} />
	
			</Routes>
		</BrowserRouter>
	);
}

export default App;
