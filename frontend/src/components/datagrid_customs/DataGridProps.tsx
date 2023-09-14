import { AlertColor } from "@mui/material";

export default interface DataGridProps {
	createSnackpack: (message: string, severity: AlertColor) => () => void;
}