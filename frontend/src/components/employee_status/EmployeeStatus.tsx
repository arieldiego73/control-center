import EmployeeStatusStyle from './EmployeeStatusTable.module.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import EmployeeStatusTable from './EmployeeStatusTable';

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
				</h4>
			</div>

			<div className={EmployeeStatusStyle.contentContainer}>
			
		
			
				<div className={EmployeeStatusStyle.contentHolder}>
		
					<div
						style={{
							backgroundColor: "transparent",
							borderBottomLeftRadius: "8px",
							borderBottomRightRadius: "8px",
							height: "100%",
							marginTop: "10px",
						}}
					>

						<EmployeeStatusTable />
					</div>
				</div>
			</div>
		</div>
	);
}
