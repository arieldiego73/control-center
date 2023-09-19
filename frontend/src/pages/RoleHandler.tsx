import Role from "../components/role/Role";
import NavigationHandler from "./NavigationHandler";

export default function RoleHandler() {
	return (
		<div style={{ flexDirection: "column", display: "flex" }}>
				<NavigationHandler />
				<Role />
		</div>
	);
}
