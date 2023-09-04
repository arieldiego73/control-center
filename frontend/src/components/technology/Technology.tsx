import TechStyle from './Technology.module.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import TechnologyTable from './TechnologyTable';
import Typography from '@mui/material/Typography'

export default function Technology() {
	return (
		<div className={TechStyle.mainContainer}>
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
						TECHNOLOGY
					</span>
					<Typography variant="h5" color="initial">Breadcrumbs here</Typography>
				</h4>
			</div>

			<div className={TechStyle.contentContainer}>
				<div className={TechStyle.contentHolder}>
					<div
						style={{
							backgroundColor: "transparent",
							// borderBottomLeftRadius: "8px",
							// borderBottomRightRadius: "8px",
							height: "100%",
						}}
					>
						<TechnologyTable />
					</div>
				</div>
			</div>
		</div>
	);
}
