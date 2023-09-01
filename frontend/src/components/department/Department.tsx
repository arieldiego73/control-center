import DepartmentStyle from './DepartmentTable.module.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import DepartmentTable from './DepartmentTable';

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
				</h4>
			</div>

			<div className={DepartmentStyle.contentContainer}>
			
		
			
				<div className={DepartmentStyle.contentHolder}>
		
					<div
						style={{
							backgroundColor: "transparent",
							borderBottomLeftRadius: "8px",
							borderBottomRightRadius: "8px",
							height: "100%",
							marginTop: "10px",
						}}
					>

						<DepartmentTable />
					</div>
				</div>
			</div>
		</div>
	);
}
