import ProjStyle from './ProjectStatus.module.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import ProjectStatusTable from './ProjectStatusTable'

export default function ProjectStatus() {
	return (
		<div className={ProjStyle.mainContainer}>
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
				</h4>
			</div>

			<div className={ProjStyle.contentContainer}>
				<div className={ProjStyle.contentHolder}>
					{/* Start of Header */}

					{/* Start of Table */}
					<div
						style={{
							backgroundColor: "transparent",
							borderBottomLeftRadius: "8px",
							borderBottomRightRadius: "8px",
							height: "100%",
							marginTop: "46px",
						}}
					>
						<ProjectStatusTable />
					</div>
				</div>
			</div>
		</div>
	);
}
