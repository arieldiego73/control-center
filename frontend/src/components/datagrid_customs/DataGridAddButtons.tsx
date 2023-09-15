import React from "react";
import SaveIcon from "@mui/icons-material/Save";
import { Button } from "@mui/material";

interface DataGridAddButtonsProps {
    handleAddContinue: () => void;
    handleAdd: () => void;
    handleClosing: () => void;
}

const DataGridAddButtons: React.FC<DataGridAddButtonsProps> = (props) => {
    const { handleAddContinue, handleAdd, handleClosing } = props;
	return (
		<div
			style={{
				flexDirection: "row",
				display: "flex",
				alignItems: "center",
				height: "100%",
				gap: "10px",
			}}
		>
			<Button
				variant="contained"
				color="primary"
				startIcon={<SaveIcon />}
				style={{
					textTransform: "none",
					height: "50%",
				}}
				onClick={handleAddContinue}
			>
				Save and Continue
			</Button>
			<Button
				variant="contained"
				color="primary"
				startIcon={<SaveIcon />}
				style={{
					textTransform: "none",
					height: "50%",
				}}
				onClick={handleAdd}
			>
				Save
			</Button>
			<Button
				style={{
					height: "50%",
				}}
				onClick={handleClosing}
			>
				Close
			</Button>
		</div>
	);
};

export default DataGridAddButtons;
