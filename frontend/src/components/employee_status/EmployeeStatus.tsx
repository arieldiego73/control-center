import EmployeeStatusStyle from './EmployeeStatusTable.module.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import EmployeeStatusTable from './EmployeeStatusTable';
import Typography from '@mui/material/Typography'

export default function EmployeeStatus() {
	return (
		<div className={EmployeeStatusStyle.mainContainer}>
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
						EMPLOYEE STATUS
					</span>
					<Typography variant="h5" color="initial">Breadcrumbs here</Typography>
				</h4>
			</div>

			<div className={EmployeeStatusStyle.contentContainer}>
				<div className={EmployeeStatusStyle.contentHolder}>
					<div
						style={{
							backgroundColor: "transparent",
							// borderBottomLeftRadius: "8px",
							// borderBottomRightRadius: "8px",
							height: "100%",
						}}
					>
						<EmployeeStatusTable />
					</div>
				</div>
			</div>
		</div>
	);
}
