import DevelopmentPhase from "../components/development_phase/DevelopmentPhase";
import NavigationHandler from "./NavigationHandler";
import HomeIcon from '@mui/icons-material/Home';


export default function DevelopmentPhaseHandler() {

	const pageTitle = "DEVELOPMENT PHASE";

	const breadcrumbs = [
	  { icon: <HomeIcon style={{height:"20px", marginTop:"5px"}}/>,  to: "/dashboard"  }, // Example breadcrumb data
	  { label: "Development phase", to: "/development-phase" },
	];
  
	return (
		<div style={{display: 'flex', flexDirection:'column'}}>
      		<NavigationHandler pageTitle={pageTitle} breadcrumbs={breadcrumbs} /> {/* Pass the pageTitle and breadcrumbs prop here */}
			<DevelopmentPhase />
		</div>
	);

}
