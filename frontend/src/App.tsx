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
import test from "./components/project/new_project/test";
import AddMemberTable from "./components/project/new_project/AddMemberTable";
import UserDetails from "./components/user/edit/EditUser";
import EditUserHandler from "./pages/EditUserHandler";


function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" Component={LoginPage} />
				<Route path="/dashboard" Component={Dashboard} />
				<Route path="/userhandler" Component={Userhandler} />
				<Route path="/createuser" Component={CreateUserHandler} />

				{/* <Route path="/edituser" Component={EditUserHandler} /> */}
				<Route path="/User/:name" element={<EditUserHandler />} />

				<Route path="/project" Component={ProjectHandler} />
				{/* <Route path="/modal" Component={Modal} /> */}
				<Route path="/role" Component={RoleHandler} />
				<Route path="/NewProj" Component={NewProjHandler} />
				<Route path="/test" Component={test} />
				<Route path="/AddMemberTable" Component={AddMemberTable} />
				<Route path="/User/:name" Component={UserDetails} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
