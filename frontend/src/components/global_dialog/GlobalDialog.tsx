import React from "react";
import {
	Dialog,
	DialogTitle,
	Typography,
	DialogContent,
	DialogContentText,
	DialogActions,
	Button,
} from "@mui/material";
interface GlobalDialogProps {
	showDialog: boolean;
	confirmNavigation: () => void;
	cancelNavigation: () => void;
}
const GlobalDialog: React.FC<GlobalDialogProps> = (props) => {
	const { showDialog, confirmNavigation, cancelNavigation } = props;
	return (
		<Dialog open={showDialog} aria-labelledby="responsive-dialog-title">
			<DialogTitle id="responsive-dialog-title">
				<Typography
					fontWeight={700}
					fontSize={20}
					display={"flex"}
					alignItems={"center"}
					gap={1}
				>
					Going away?
				</Typography>
			</DialogTitle>
			<DialogContent>
				<DialogContentText whiteSpace={"pre-line"}>
					Something...
				</DialogContentText>
			</DialogContent>
			<DialogActions>
				<Button
					onClick={confirmNavigation}
					variant="contained"
					autoFocus
				>
					Proceed
				</Button>
				<Button onClick={cancelNavigation}>Cancel</Button>
			</DialogActions>
		</Dialog>
	);
};

export default GlobalDialog;
