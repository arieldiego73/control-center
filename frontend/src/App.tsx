import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import { Dashboard } from "./components/dashboard/Dashboard";
import Userhandler from "./pages/Userhandler";
import CreateUserHandler from "./pages/CreateUserHandler";
import ProjectHandler from "./pages/ProjectHandler";
import RoleHandler from "./pages/RoleHandler";
// import NewProj from "./components/project/new_project/NewProj";
import NewProjHandler from "./pages/NewProjectHandler";
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
				<Route path="/role" Component={RoleHandler} />
				<Route path="/NewProj" Component={NewProjHandler} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
