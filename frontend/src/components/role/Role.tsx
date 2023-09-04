import RoleStyle from "./Role.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import RoleTable from "./RoleTable";
import Typography from '@mui/material/Typography'

export default function Role() {
	return (
		<div className={RoleStyle.mainContainer}>
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
						ROLES AND PERMISSIONS
					</span>
					<Typography variant="h5" color="initial">Breadcrumbs here</Typography>
				</h4>
			</div>

			<div className={RoleStyle.contentContainer}>
				<div className={RoleStyle.contentHolder}>
					<div
						style={{
							backgroundColor: "transparent",
							// borderBottomLeftRadius: "8px",
							// borderBottomRightRadius: "8px",
							height: "100%",
						}}
					>
						<RoleTable />
					</div>
				</div>
			</div>
		</div>
	);
}
