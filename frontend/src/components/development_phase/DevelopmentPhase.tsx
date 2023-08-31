import DevStyle from './DevelopmentPhase.module.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import DevelopmentPhaseTable from './DevelopmentPhaseTable'

export default function DevelopmentPhase() {
	return (
		<div className={DevStyle.mainContainer}>
			<div style={{ width: "97%" }}>
				<h4>
					<FontAwesomeIcon icon={faUser} size="3x" color="black" />
					<span
						style={{
							fontSize: "4vh",
							color: "black",
							fontFamily: "Montserrat, san-serif",
						}}
					>
						{" "}
						DEVELOPMENT PHASE
					</span>
				</h4>
			</div>

			<div className={DevStyle.contentContainer}>
			
		
			
				<div className={DevStyle.contentHolder}>
		
					<div
						style={{
							backgroundColor: "transparent",
							borderBottomLeftRadius: "8px",
							borderBottomRightRadius: "8px",
							height: "100%",
							marginTop: "10px",
						}}
					>

						<DevelopmentPhaseTable />
					</div>
				</div>
			</div>
		</div>
	);
}
