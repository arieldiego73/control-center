import EmployeePositionStyle from './EmployeePositionTable.module.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import EmployeePositionTable from './EmployeePositionTable';
import Typography from '@mui/material/Typography'

export default function EmployeePosition() {
	return (
		<div className={EmployeePositionStyle.mainContainer}>
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
						EMPLOYEE POSITION
					</span>
					<Typography variant="h5" color="initial">Breadcrumbs here</Typography>
				</h4>
			</div>

			<div className={EmployeePositionStyle.contentContainer}>
				<div className={EmployeePositionStyle.contentHolder}>
					<div
						style={{
							backgroundColor: "transparent",
							// borderBottomLeftRadius: "8px",
							// borderBottomRightRadius: "8px",
							height: "100%",
						}}
					>
						<EmployeePositionTable />
					</div>
				</div>
			</div>
		</div>
	);
}
