import NavigationHandler from "./NavigationHandler";
import NewProj from "../components/project/new_project/NewProj";

export default function NewProjHandler() {
	return (
		<div style={{ flexDirection: "column", display: "flex" }}>
			
        <NavigationHandler/> 
         <NewProj/>
  
		</div>
	);
}
