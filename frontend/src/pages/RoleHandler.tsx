import Role from "../components/role/Role";
import NavigationHandler from "./NavigationHandler";
import HomeIcon from '@mui/icons-material/Home';


export default function RoleHandler() {

	const pageTitle = "ROLES";

	const breadcrumbs = [
		{ icon: <HomeIcon style={{ height: "20px", marginTop: "5px" }} />, to: "/dashboard" }, // Example breadcrumb data
		{ label: "Roles", to: "/roles" },
	];

	return (
		<div style={{ flexDirection: "column", display: "flex" }}>
			<NavigationHandler pageTitle={pageTitle} breadcrumbs={breadcrumbs} /> {/* Pass the pageTitle and breadcrumbs prop here */}
				<Role />
		</div>
	);
}
