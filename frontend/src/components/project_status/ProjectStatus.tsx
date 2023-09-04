import ProjectStatusStyle from './ProjectStatusTable.module.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import ProjectStatusTable from './ProjectStatusTable';
import Typography from '@mui/material/Typography'

export default function ProjectStatus() {
	return (
		<div className={ProjectStatusStyle.mainContainer}>
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
						PROJECT STATUS
					</span>
					<Typography variant="h5" color="initial">Breadcrumbs here</Typography>
				</h4>
			</div>

			<div className={ProjectStatusStyle.contentContainer}>
				<div className={ProjectStatusStyle.contentHolder}>
					<div
						style={{
							backgroundColor: "transparent",
							// borderBottomLeftRadius: "8px",
							// borderBottomRightRadius: "8px",
							height: "100%",
						}}
					>
						<ProjectStatusTable />
					</div>
				</div>
			</div>
		</div>
	);
}
