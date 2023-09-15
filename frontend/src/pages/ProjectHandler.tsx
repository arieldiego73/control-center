import NavigationHandler from "./NavigationHandler";
import Project from "../components/project/Project";

export default function ProjectHandler() {
	return (
		<div style={{display: 'flex', flexDirection:'column'}}>
		<NavigationHandler/> 
		<Project/>
	</div>
	);
}
