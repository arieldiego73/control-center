import {
	Dialog,
	DialogTitle,
	Typography,
	DialogContent,
	DialogContentText,
	DialogActions,
	Button,
    useMediaQuery,
    useTheme,
} from "@mui/material";
import HelpIcon from "@mui/icons-material/Help";
import React from "react";

interface DataGridDialogProps {
    open: boolean;
    handleClose: (value: React.SetStateAction<boolean>) => void;
    dialogTitle: string;
    dialogContentText: string;
    confirmAction: () => void;
}

const DataGridActionDialog: React.FC<DataGridDialogProps> = (props) => {
    const  {
        open,
        handleClose,
        dialogTitle,
        dialogContentText,
        confirmAction,
    } = props;

    const theme = useTheme();
	const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

	return (
		<Dialog
			fullScreen={fullScreen}
			open={open}
			aria-labelledby="responsive-dialog-title"
		>
			<DialogTitle id="responsive-dialog-title">
				<Typography
					fontWeight={700}
					fontSize={20}
					display={"flex"}
					alignItems={"center"}
					gap={1}
				>
					<HelpIcon
						accentHeight={100}
						color="error"
						fontSize="large"
						alignmentBaseline="middle"
					/>
					{dialogTitle}
				</Typography>
			</DialogTitle>
			<DialogContent>
				<DialogContentText whiteSpace={"pre-line"}>
					{dialogContentText}
				</DialogContentText>
			</DialogContent>
			<DialogActions>
				<Button
					variant="contained"
					onClick={confirmAction}
					autoFocus
				>
					Proceed
				</Button>

				<Button
					onClick={() => {
						handleClose(false);
					}}
				>
					Cancel
				</Button>
			</DialogActions>
		</Dialog>
	);
};

export default DataGridActionDialog;
