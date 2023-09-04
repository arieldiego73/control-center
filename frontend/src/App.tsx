import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import Userhandler from "./pages/Userhandler";
import CreateUserHandler from "./pages/CreateUserHandler";
import ProjectHandler from "./pages/ProjectHandler";
import RoleHandler from "./pages/RoleHandler";
// import NewProj from "./components/project/new_project/NewProj";
import NewProjHandler from "./pages/NewProjectHandler";
import test from "./components/project/new_project/test";
import AddMemberTable from "./components/project/new_project/AddMemberTable";
// import UserDetails from "./components/user/edit/EditUser";
import EditUserHandler from "./pages/EditUserHandler";
import EditProjectHandler from "./pages/EditProjectHandler"
import DevelopmentPhaseHandler from "./pages/DevelopmentPhaseHandler";
import ProjectStatusHandler from "./pages/ProjectStatusHandler";
import DashboardHandler from "./pages/DashboardHandler";
import ActivityLogDashboardTable from "./components/dashboard/ActivityLogDashboardTable";
import EmployeeStatusHandler from "./pages/EmployeeStatusHandler";
import EmployeePositionHandler from "./pages/EmployeePositionHandler";
import BusinessUnitHandler from "./pages/BusinessUnitHanlder";
import DepartmentHandler from "./pages/DepartmentHandler";
import TechnologyHandler from "./pages/TechnologyHandler";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" Component={LoginPage} />
				<Route path="/dashboard" Component={DashboardHandler} />
				<Route path="/user" Component={Userhandler} />
				<Route path="/createuser" Component={CreateUserHandler} />
				{/* <Route path="/edituser" Component={EditUserHandler} /> */}
				<Route path="/editUser/:name" element={<EditUserHandler />} />
				<Route path="/editProject/:projectName" element={<EditProjectHandler />} />
				<Route path="/project" Component={ProjectHandler} />
				{/* <Route path="/modal" Component={Modal} /> */}
				<Route path="/role" Component={RoleHandler} />
				<Route path="/NewProj" Component={NewProjHandler} />
				<Route path="/test" Component={test} />
				<Route path="/AddMemberTable" Component={AddMemberTable} />
				{/* <Route path="/User/:name" Component={UserDetails} /> */}
				<Route path="/developmentphase" Component={DevelopmentPhaseHandler} />
				<Route path="/projectStatus" Component={ProjectStatusHandler} />
				<Route path="/dashboardtable" Component={ActivityLogDashboardTable} />
				<Route path="/employeestatus" Component={EmployeeStatusHandler} />
				<Route path="/employeeposition" Component={EmployeePositionHandler} />
				<Route path="/businessunit" Component={BusinessUnitHandler} />
				<Route path="/department" Component={DepartmentHandler} />
				<Route path="/technology" Component={TechnologyHandler} />
				

				
			</Routes>
		</BrowserRouter>
	);
}

export default App;
