import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import Userhandler from "./pages/Userhandler";
import CreateUserHandler from "./pages/CreateUserHandler";
import ProjectHandler from "./pages/ProjectHandler";
import RoleHandler from "./pages/RoleHandler";
// import NewProj from "./components/project/new_project/NewProj";
import NewProjHandler from "./pages/NewProjectHandler";
import AddMemberTable from "./components/project/AddMemberTable";
// import UserDetails from "./components/user/edit/EditUser";
import EditUserHandler from "./pages/EditUserHandler";
import EditProjectHandler from "./pages/EditProjectHandler"
import DevelopmentPhaseHandler from "./pages/DevelopmentPhaseHandler";
import ProjectStatusHandler from "./pages/ProjectStatusHandler";
import DashboardHandler from "./pages/DashboardHandler";
import ActivityLogDashboardTable from "./components/dashboard/ActivityLogDashboardTable";
import EmployeeStatusHandler from "./pages/EmployeeStatusHandler";
import EmployeePositionHandler from "./pages/EmployeePositionHandler";
import DepartmentHandler from "./pages/DepartmentHandler";
import BusinessUnitHandler from "./pages/BusinessUnitHandler";
import TechnologyHandler from "./pages/TechnologyHandler";
import test2 from "./components/test/test2";
import Sidenav from "./components/newNav/SideNav"
import Topnav from "./components/newNav/Navigations"
import Navigations from "./pages/NavigationHandler"
import UserGraph from "./components/dashboard/user_graph/UserGraph";
import DevelopmentTypeHandler from "./pages/DevelopmentTypeHandler";
import TestHandler from "./pages/TestHandler";
import ClientHandler from "./pages/ClientHandler";
import ImagePreview from "./components/test/viewImg";

import  { useDispatch, useSelector } from "react-redux"
import {
	Dialog,
	DialogTitle,
	Typography,
	DialogContent,
	DialogContentText,
	DialogActions,
	Button,
} from "@mui/material";
import { RootState } from "./redux/store/store";
import React from "react";
import { showDialog } from "./redux/state/dialogSlice";

function App() {
	const dispatch = useDispatch();
	const open = useSelector((state: RootState) => state.dialogListener.isDialogVisible)

	// logic to determine if there are unsaved changes
	const hasUnsavedChanges = useSelector((state: RootState) => state.pageAbandonmentPrevention.isDirty)

	// Add event listeners when the component mounts
	React.useEffect(() => {
		const handleBeforeUnload = (e: BeforeUnloadEvent) => {
			// Check if there are unsaved changes and show a confirmation dialog if needed
			if (hasUnsavedChanges) {
				e.preventDefault();
				e.returnValue = 'Dirty it is'; // This message will be displayed in the confirmation dialog
			}
		};

		const handleLinkClick = (e: MouseEvent) => {
			// Check if there are unsaved changes and show a confirmation dialog if needed
			if (hasUnsavedChanges) {
				e.preventDefault();
				dispatch(showDialog()); // Dispatch your Redux action to show the dialog
			}
		};

		// Add event listeners
		window.addEventListener('beforeunload', handleBeforeUnload);
		document.addEventListener('click', handleLinkClick);

		// Remove event listeners when the component unmounts
		return () => {
			window.removeEventListener('beforeunload', handleBeforeUnload);
			document.removeEventListener('click', handleLinkClick);
		};
	}, [dispatch, hasUnsavedChanges]);

	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" Component={LoginPage} />
				<Route path="/dashboard" Component={DashboardHandler} />
				<Route path="/users/*" Component={Userhandler} />
				<Route path="/user/add-new-user" Component={CreateUserHandler} />
				{/* <Route path="/edituser" Component={EditUserHandler} /> */}
				<Route path="/user/edit-user/:name/*" element={<EditUserHandler />} />
				<Route path="/project/edit-project/:proj_name" element={<EditProjectHandler />} />
				<Route path="/projects" Component={ProjectHandler} />
				{/* <Route path="/modal" Component={Modal} /> */}
				<Route path="/roles" Component={RoleHandler} />
				<Route path="/project/add-new-project" Component={NewProjHandler} />
				{/* <Route path="/User/:name" Component={UserDetails} /> */}
				<Route path="/development-phase" Component={DevelopmentPhaseHandler} />
				<Route path="/clients" Component={ClientHandler} />
				<Route path="/project-status" Component={ProjectStatusHandler} />
				<Route path="/dashboard-table" Component={ActivityLogDashboardTable} />
				<Route path="/employee-status" Component={EmployeeStatusHandler} />
				<Route path="/employee-position" Component={EmployeePositionHandler} />
				<Route path="/business-unit" Component={BusinessUnitHandler} />
				<Route path="/department" Component={DepartmentHandler} />
				<Route path="/technology" Component={TechnologyHandler} />
				{/* <Route path="/test2" Component={TestHandler} /> */}
				{/* <Route path="/sideNav" Component={Sidenav} /> */}
				{/* <Route path="/topNav" Component={Topnav} /> */}
				{/* <Route path="/NewNav" Component={NewNav} /> */}
				<Route path="/navigations" Component={Navigations} />
				<Route path="/user-graph" Component={UserGraph} />
				<Route path="/development-type" Component={DevelopmentTypeHandler} />
				<Route path="/TestHandler" Component={TestHandler} />
				<Route path="/viewImg" Component={ImagePreview} />
			</Routes>

			{/* <Dialog open={open} aria-labelledby="responsive-dialog-title">
				<DialogTitle id="responsive-dialog-title">
					<Typography
						fontWeight={700}
						fontSize={20}
						display={"flex"}
						alignItems={"center"}
						gap={1}
					>
						Go away?
					</Typography>
				</DialogTitle>
				<DialogContent>
					<DialogContentText whiteSpace={"pre-line"}>
						Something...
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button variant="contained" autoFocus>
						Proceed
					</Button>
					<Button>Cancel</Button>
				</DialogActions>
			</Dialog> */}
		</BrowserRouter>
	);
}

export default App;
