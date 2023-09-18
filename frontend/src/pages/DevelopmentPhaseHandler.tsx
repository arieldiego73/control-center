import DevelopmentPhase from "../components/development_phase/DevelopmentPhase";
import NavigationHandler from "./NavigationHandler";

export default function DevelopmentPhaseHandler() {
	return (
		<div style={{display: 'flex', flexDirection:'column'}}>
			<NavigationHandler/> 
			<DevelopmentPhase />
		</div>
	);

}
