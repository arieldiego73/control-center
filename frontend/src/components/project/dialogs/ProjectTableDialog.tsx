import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { ReactJSXElement } from "@emotion/react/types/jsx-namespace";
import { Check } from "@mui/icons-material";

interface ProjectTableProps {
	open: boolean;
	dialogTitle: string;
	onClickCancel: React.MouseEventHandler<HTMLButtonElement>;
	onClickSave: React.MouseEventHandler<HTMLButtonElement>;
	table: ReactJSXElement;
}

const ProjectTableDialog: React.FC<ProjectTableProps> = (props) => {
	const { open, dialogTitle, onClickCancel, onClickSave, table } = props;
	return (
		<Dialog open={open}>
			<DialogTitle fontWeight={900} fontSize={24}>
				{dialogTitle}
			</DialogTitle>
			<DialogContent>{table}</DialogContent>
			<DialogActions>
				<Button variant="contained" startIcon={
                    <Check />
                } onClick={onClickSave}>
					Submit
				</Button>
				<Button onClick={onClickCancel}>Cancel</Button>
			</DialogActions>
		</Dialog>
	);
};

export default ProjectTableDialog;
