import RoleStyle from "./Role.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import RoleTable from "./RoleTable";

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
				</h4>
			</div>

			<div className={RoleStyle.contentContainer}>
				<div className={RoleStyle.contentHolder}>
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
						<RoleTable />
					</div>
				</div>
			</div>
		</div>
	);
}
