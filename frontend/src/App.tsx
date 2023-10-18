// import "./App.css";
// import { BrowserRouter, Route, Routes } from "react-router-dom";
// import LoginPage from "./pages/LoginPage";
// import Userhandler from "./pages/Userhandler";
// import CreateUserHandler from "./pages/CreateUserHandler";
// import ProjectHandler from "./pages/ProjectHandler";
// import RoleHandler from "./pages/RoleHandler";
// // import NewProj from "./components/project/new_project/NewProj";
// import NewProjHandler from "./pages/NewProjectHandler";
// import AddMemberTable from "./components/project/AddMemberTable";
// // import UserDetails from "./components/user/edit/EditUser";
// import EditUserHandler from "./pages/EditUserHandler";
// import EditProjectHandler from "./pages/EditProjectHandler"
// import DevelopmentPhaseHandler from "./pages/DevelopmentPhaseHandler";
// import ProjectStatusHandler from "./pages/ProjectStatusHandler";
// import DashboardHandler from "./pages/DashboardHandler";
// import ActivityLogDashboardTable from "./components/dashboard/ActivityLogDashboardTable";
// import EmployeeStatusHandler from "./pages/EmployeeStatusHandler";
// import EmployeePositionHandler from "./pages/EmployeePositionHandler";
// import DepartmentHandler from "./pages/DepartmentHandler";
// import BusinessUnitHandler from "./pages/BusinessUnitHandler";
// import TechnologyHandler from "./pages/TechnologyHandler";
// import test2 from "./components/test/test2";
// import Sidenav from "./components/newNav/SideNav"
// import Topnav from "./components/newNav/Navigations"
// import Navigations from "./pages/NavigationHandler"
// import UserGraph from "./components/dashboard/user_graph/UserGraph";
// import DevelopmentTypeHandler from "./pages/DevelopmentTypeHandler";
// import TestHandler from "./pages/TestHandler";
// import ClientHandler from "./pages/ClientHandler";
// import ImagePreview from "./components/test/viewImg";

// import  { useDispatch, useSelector } from "react-redux"
// import { RootState } from "./redux/store/store";
// import React from "react";
// import { showDialog } from "./redux/state/dialogSlice";

// function App() {
// 	// const dispatch = useDispatch();
// 	// const open = useSelector((state: RootState) => state.dialogListener.isDialogVisible)

// 	// // logic to determine if there are unsaved changes
// 	// const hasUnsavedChanges = useSelector((state: RootState) => state.pageAbandonmentPrevention.isDirty)

// 	// // Add event listeners when the component mounts
// 	// React.useEffect(() => {
// 	// 	const handleBeforeUnload = (e: BeforeUnloadEvent) => {
// 	// 		// Check if there are unsaved changes and show a confirmation dialog if needed
// 	// 		if (hasUnsavedChanges) {
// 	// 			e.preventDefault();
// 	// 			e.returnValue = 'Dirty it is'; // This message will be displayed in the confirmation dialog
// 	// 		}
// 	// 	};

// 	// 	// const handleLinkClick = (e: MouseEvent) => {
// 	// 	// 	// Check if there are unsaved changes and show a confirmation dialog if needed
// 	// 	// 	if (hasUnsavedChanges) {
// 	// 	// 		e.preventDefault();
// 	// 	// 		dispatch(showDialog()); // Dispatch your Redux action to show the dialog
// 	// 	// 	}
// 	// 	// };

// 	// 	// Add event listeners
// 	// 	window.addEventListener('beforeunload', handleBeforeUnload, { capture: true });
// 	// 	// document.addEventListener('click', handleLinkClick);

// 	// 	// Remove event listeners when the component unmounts
// 	// 	return () => {
// 	// 		window.removeEventListener('beforeunload', handleBeforeUnload, { capture: true });
// 	// 		// document.removeEventListener('click', handleLinkClick);
// 	// 	};
// 	// }, [dispatch, hasUnsavedChanges]);

// 	return (
// 		<BrowserRouter>
// 			<Routes>
// 				<Route path="/" Component={LoginPage} />
// 				<Route path="/dashboard" Component={DashboardHandler} />
// 				<Route path="/users/*" Component={Userhandler} />
// 				<Route path="/user/add-new-user" Component={CreateUserHandler} />
// 				{/* <Route path="/edituser" Component={EditUserHandler} /> */}
// 				<Route path="/user/edit-user/:name/*" element={<EditUserHandler />} />
// 				<Route path="/project/edit-project/:proj_name" element={<EditProjectHandler />} />
// 				<Route path="/projects" Component={ProjectHandler} />
// 				{/* <Route path="/modal" Component={Modal} /> */}
// 				<Route path="/roles" Component={RoleHandler} />
// 				<Route path="/project/add-new-project" Component={NewProjHandler} />
// 				{/* <Route path="/User/:name" Component={UserDetails} /> */}
// 				<Route path="/development-phase" Component={DevelopmentPhaseHandler} />
// 				<Route path="/clients" Component={ClientHandler} />
// 				<Route path="/project-status" Component={ProjectStatusHandler} />
// 				<Route path="/dashboard-table" Component={ActivityLogDashboardTable} />
// 				<Route path="/employee-status" Component={EmployeeStatusHandler} />
// 				<Route path="/employee-position" Component={EmployeePositionHandler} />
// 				<Route path="/business-unit" Component={BusinessUnitHandler} />
// 				<Route path="/department" Component={DepartmentHandler} />
// 				<Route path="/technology" Component={TechnologyHandler} />
// 				{/* <Route path="/test2" Component={TestHandler} /> */}
// 				{/* <Route path="/sideNav" Component={Sidenav} /> */}
// 				{/* <Route path="/topNav" Component={Topnav} /> */}
// 				{/* <Route path="/NewNav" Component={NewNav} /> */}
// 				<Route path="/navigations" Component={Navigations} />
// 				{/* <Route path="/user-graph" Component={UserGraph} /> */}
// 				<Route path="/development-type" Component={DevelopmentTypeHandler} />
// 				<Route path="/TestHandler" Component={TestHandler} />
// 				<Route path="/viewImg" Component={ImagePreview} />
// 			</Routes>
// 		</BrowserRouter>
// 	);
// }

// export default App;


import "./App.css";
import { BrowserRouter, Route, Routes, Navigate, useNavigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import Userhandler from "./pages/Userhandler";
import CreateUserHandler from "./pages/CreateUserHandler";
import ProjectHandler from "./pages/ProjectHandler";
import RoleHandler from "./pages/RoleHandler";
import NewProjHandler from "./pages/NewProjectHandler";
import AddMemberTable from "./components/project/AddMemberTable";
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
import { RootState } from "./redux/store/store";
import React, { useEffect, useState } from "react";
import { showDialog } from "./redux/state/dialogSlice";
import { apiLogin } from "./redux/saga/sessionSaga";
import { setAuthenticationStatus, setUser } from "./redux/state/sessionState";
import Cookies from 'universal-cookie';

// ... (other imports and component definitions)

// function App() {
// 	const dummyUsers = [
// 	  {
// 		id: 1,
// 		username: "admin",
// 		role: "System Administrator",
// 	  },
// 	  {
// 		id: 2,
// 		username: "acct_manager",
// 		role: "Account Manager",
// 	  },
// 	  {
// 		id: 3,
// 		username: "proj_manager",
// 		role: "Project Manager",
// 	  },
// 	  {
// 		id: 4,
// 		username: "normal_user",
// 		role: "Normal User",
// 	  },
// 	];
  
// 	const defaultUserId = 1;
  
// 	const currentUser = dummyUsers.find((user) => user.id === defaultUserId);
  
// 	return (
// 	  <BrowserRouter>
// 		<Routes>
// 		  {/* Allow access based on user role */}
// 		  {currentUser && currentUser.role === "System Administrator" && (
// 			<>
// 			 	<Route path="/" Component={LoginPage} />
//  				<Route path="/dashboard" Component={DashboardHandler} />
//  				<Route path="/users/*" Component={Userhandler} />
//  				<Route path="/user/add-new-user" Component={CreateUserHandler} />
//  				<Route path="/user/edit-user/:name/*" element={<EditUserHandler />} />
//  				<Route path="/project/edit-project/:proj_name" element={<EditProjectHandler />} />
//  				<Route path="/projects" Component={ProjectHandler} />
//  				<Route path="/roles" Component={RoleHandler} />
//  				<Route path="/project/add-new-project" Component={NewProjHandler} />
//  				<Route path="/development-phase" Component={DevelopmentPhaseHandler} />
//  				<Route path="/clients" Component={ClientHandler} />
//  				<Route path="/project-status" Component={ProjectStatusHandler} />
//  				<Route path="/dashboard-table" Component={ActivityLogDashboardTable} />
//  				<Route path="/employee-status" Component={EmployeeStatusHandler} />
//  				<Route path="/employee-position" Component={EmployeePositionHandler} />
//  				<Route path="/business-unit" Component={BusinessUnitHandler} />
//  				<Route path="/department" Component={DepartmentHandler} />
//  				<Route path="/technology" Component={TechnologyHandler} />
//  				<Route path="/navigations" Component={Navigations} />
//  				<Route path="/development-type" Component={DevelopmentTypeHandler} />
//  				<Route path="/TestHandler" Component={TestHandler} />
//  				<Route path="/viewImg" Component={ImagePreview} />			
// 			</>
// 		  )}
// 		  {currentUser && currentUser.role === "Account Manager" && (
// 			<>
// 			  <Route path="/" Component={LoginPage} />
// 			  <Route path="/dashboard" Component={DashboardHandler} />
// 			  <Route path="/users/*" Component={Userhandler} />
// 			  <Route path="/user/add-new-user" element={<CreateUserHandler />} />
// 			  <Route path="/user/edit-user/:name/*" element={<EditUserHandler />} />
// 			</>
// 		  )}
// 		  {currentUser && currentUser.role === "Project Manager" && (
// 			<>
// 			  <Route path="/" Component={LoginPage} />
//  			  <Route path="/dashboard" Component={DashboardHandler} />
// 			  <Route path="/projects" Component={ProjectHandler} />
// 			  <Route path="/project/add-new-project" element={<NewProjHandler />} />
// 			  <Route path="/project/edit-project/:proj_name" element={<EditProjectHandler />} />
// 			</>
// 		  )}
// 		  {!currentUser && (
// 			<p>Normal User - Restrict access to all pages</p>
// 		  )}
// 		</Routes>
// 	  </BrowserRouter>
// 	);
//   }
  
//   export default App;

function App() {
	const dispatch = useDispatch(); // Get the dispatch function from Redux


	
	const isAuthenticated = useSelector((state: RootState) => state.sessionReducer.isAuthenticated);
	console.log("isAuthenticated",isAuthenticated );

	const cookies = new Cookies();

	// useEffect(() => {
    //     const checkAuthentication = async () => {
    //         // Check if the user is authenticated in localStorage
    //         const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';

    //         if (isAuthenticated) {
    //             // If the user is authenticated, call the login API to get user info
    //             try {
    //                 const userData = await apiLogin('username', 'password');
    //                 if (userData) {
    //                     // setUser(userData); // This line can be removed to fix the warning
    //                 }
    //             } catch (error) {
    //                 console.error('Error while checking authentication:', error);
    //             }
    //         }
    //     };

    //     checkAuthentication();
    // }, []);


  useEffect(() => {
    // Check if the user is authenticated in localStorage
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
	console.log(isAuthenticated + "---------------");
	
    if (isAuthenticated) {
      // If the user is authenticated, call the login API to get user info
      const username = cookies.get('username'); // Retrieve the username from localStorage
      const password = cookies.get('password'); // Replace with the actual way you retrieve the password or token
	  console.log(isAuthenticated + "++++++++++");
      if (isAuthenticated && username && password) {
		console.log(isAuthenticated + "[][][][][");
        apiLogin(username, password)
          .then((userData) => {
            if (userData) {
              // Dispatch an action to update the user state
              dispatch(setUser(userData)); // You should define the setUser action
              // Dispatch an action to update the authentication status
              dispatch(setAuthenticationStatus(true)); // You should define the setAuthenticationStatus action
			  console.log("userData::::::" + userData);
			  
            }
          })
          .catch((error) => {
            console.error('Error while checking authentication:', error);
          });
      }
    }
  }, [dispatch]);

  console.log(isAuthenticated + "//////////");

	return (
		<BrowserRouter>
			<Routes>
			{isAuthenticated ? (
				<>
				<Route path="/" element={<Navigate to="/dashboard" />} />
            	<Route path="/dashboard/*" element={<DashboardHandler />} />
				<Route path="/users/*" Component={Userhandler} />
				<Route path="/user/add-new-user/*" Component={CreateUserHandler} />
				<Route path="/user/edit-user/:name/*" element={<EditUserHandler />} />
			    <Route path="/project/edit-project/:proj_name" element={<EditProjectHandler />} />
				<Route path="/projects/*" Component={ProjectHandler} />
				<Route path="/roles/" Component={RoleHandler} />
				<Route path="/project/add-new-project" Component={NewProjHandler} />
				<Route path="/development-phase/*" Component={DevelopmentPhaseHandler} />
				<Route path="/clients/*" Component={ClientHandler} />
				<Route path="/project-status/*" Component={ProjectStatusHandler} />
				<Route path="/dashboard-table" Component={ActivityLogDashboardTable} />
				<Route path="/employee-status/*" Component={EmployeeStatusHandler} />
				<Route path="/employee-position/*" Component={EmployeePositionHandler} />
				<Route path="/business-unit/*" Component={BusinessUnitHandler} />
				<Route path="/department/*" Component={DepartmentHandler} />
				<Route path="/technology/*" Component={TechnologyHandler} />
				<Route path="/navigations/*" Component={Navigations} />
				<Route path="/development-type/*" Component={DevelopmentTypeHandler} />
				<Route path="/TestHandler" Component={TestHandler} />
				<Route path="/viewImg" Component={ImagePreview} />		
				</>
			) : (
				<>
				 <Route index element={<LoginPage />} />
        	     <Route path="*" element={<Navigate to="/" />} />
				</>
			)}
			</Routes>
		</BrowserRouter>
	);
}

export default App;