
import DepartmentStyle from './DepartmentTable.module.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import DepartmentTable from './DepartmentTable';
import Typography from '@mui/material/Typography'

export default function Department() {
	return (
		<div className={DepartmentStyle.mainContainer}>
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
						DEPARTMENT
					</span>
					<Typography variant="h5" color="initial">Breadcrumbs here</Typography>
				</h4>
			</div>

			<div className={DepartmentStyle.contentContainer}>
				<div className={DepartmentStyle.contentHolder}>
					<div
						style={{
							backgroundColor: "transparent",
							// borderBottomLeftRadius: "8px",
							// borderBottomRightRadius: "8px",
							height: "100%",
						}}
					>
						<DepartmentTable />
					</div>
				</div>
			</div>
		</div>
	);
}
