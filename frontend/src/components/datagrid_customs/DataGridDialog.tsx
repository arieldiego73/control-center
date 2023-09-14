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
    ask: boolean;
    setAsk: (value: React.SetStateAction<boolean>) => void;
    dialogTitle: string;
    dialogContentText: string;
    isBatch: boolean | undefined;
    proceedWithDeleteBatch: () => void;
    proceedWithDelete: () => void;
}

const DataGridDialog: React.FC<DataGridDialogProps> = (props) => {
    const  {
        ask,
        setAsk,
        dialogTitle,
        dialogContentText,
        isBatch,
        proceedWithDeleteBatch,
        proceedWithDelete
    } = props;

    const theme = useTheme();
	const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

	return (
		<Dialog
			fullScreen={fullScreen}
			open={ask}
			onClose={() => {
				setAsk(false);
			}}
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
					onClick={
						isBatch ? proceedWithDeleteBatch : proceedWithDelete
					}
					autoFocus
				>
					Delete
				</Button>

				<Button
					onClick={() => {
						setAsk(false);
					}}
				>
					Cancel
				</Button>
			</DialogActions>
		</Dialog>
	);
};

export default DataGridDialog;
