import BusinessUnitStyle from './BusinessUnitTable.module.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import BusinessUnitTable from './BusinessUnitTable';
import Typography from '@mui/material/Typography'

export default function BusinessUnit() {
	return (
		<div className={BusinessUnitStyle.mainContainer}>
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
						BUSINESS UNIT
					</span>
					<Typography variant="h5" color="initial">Breadcrumbs here</Typography>
				</h4>
			</div>

			<div className={BusinessUnitStyle.contentContainer}>
				<div className={BusinessUnitStyle.contentHolder}>
					<div
						style={{
							backgroundColor: "transparent",
							// borderBottomLeftRadius: "8px",
							// borderBottomRightRadius: "8px",
							height: "100%",
						}}
					>
						<BusinessUnitTable />
					</div>
				</div>
			</div>
		</div>
	);
}
