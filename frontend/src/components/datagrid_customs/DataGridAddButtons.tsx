import React, { useEffect, useState } from "react";
import SaveIcon from "@mui/icons-material/Save";
import { Button } from "@mui/material";

interface DataGridAddButtonsProps {
    handleAddContinue: () => void;
    handleAdd: () => void;
    handleClosing: () => void;
}

const DataGridAddButtons: React.FC<DataGridAddButtonsProps> = (props) => {


	const [screenWidth, setScreenWidth] = useState(window.innerWidth);
	// Add an event listener to update the screenWidth state when the window is resized
	useEffect(() => {
	  const handleResize = () => {
		setScreenWidth(window.innerWidth);
	  };
	  window.addEventListener('resize', handleResize);
	  return () => {
		window.removeEventListener('resize', handleResize);
	  };
	}, []);


    const { handleAddContinue, handleAdd, handleClosing } = props;
	return (
		<div
			style={{
				flexDirection: "row",
				display: "flex",
				alignItems: "end",
				justifyContent:"end",
				height: "100%",
				gap: "10px",
				width: screenWidth < 1050 ? '50%' : '45%',
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
