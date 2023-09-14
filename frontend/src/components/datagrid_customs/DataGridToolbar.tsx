import { Button } from "@mui/material";
import { GridToolbarContainer, GridToolbar, GridRowId } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import React from "react";

interface EditToolbarProps {
	setAsk: (value: React.SetStateAction<boolean>) => void;
	setIsBatch: (value: React.SetStateAction<boolean | undefined>) => void;
	setDialogContentText: (value: React.SetStateAction<string>) => void;
	setDialogTitle: (value: React.SetStateAction<string>) => void;
	selectedId: Set<GridRowId>;
}

const DataGridEditToolbar: React.FC<EditToolbarProps> = (props) => {
	const {
		setAsk,
		setIsBatch,
		setDialogContentText,
		setDialogTitle,
		selectedId,
	} = props;
	const handleDeleteBatch = () => {
		setAsk(true);
		setIsBatch(true);
		setDialogContentText(
			"Be warned that deleting records is irreversible. \nPlease, proceed with caution."
		);
		setDialogTitle(
			`Delete ${
				selectedId.size > 1 ? `these ${selectedId.size}` : "this"
			} record${selectedId.size > 1 ? "s" : ""}?`
		);
	};

	return (
		<GridToolbarContainer
			sx={{
				display: "flex",
				justifyContent: "space-between",
				alignItems: "baseline",
			}}
		>
			<Button
				color="error"
				variant="contained"
				startIcon={<DeleteIcon />}
				onClick={handleDeleteBatch}
				disabled={selectedId.size === 0}
				sx={{
					marginLeft: 1.5,
					// visibility: `${
					// 	selectedId.size !== 0 ? "visible" : "hidden"
					// }`,
				}}
			>
				DELETE BATCH
			</Button>
			<div>
				<GridToolbar />
			</div>
		</GridToolbarContainer>
	);
};

export default DataGridEditToolbar;
