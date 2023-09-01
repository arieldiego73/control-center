import EmployeePositionStyle from './EmployeePositionTable.module.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import EmployeePositionTable from './EmployeePositionTable';

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
				</h4>
			</div>

			<div className={EmployeePositionStyle.contentContainer}>
			
		
			
				<div className={EmployeePositionStyle.contentHolder}>
		
					<div
						style={{
							backgroundColor: "transparent",
							borderBottomLeftRadius: "8px",
							borderBottomRightRadius: "8px",
							height: "100%",
							marginTop: "10px",
						}}
					>

						<EmployeePositionTable />
					</div>
				</div>
			</div>
		</div>
	);
}
