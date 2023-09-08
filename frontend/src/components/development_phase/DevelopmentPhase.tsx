import DevStyle from "./DevelopmentPhase.module.css";
import DevelopmentPhaseTable from "./DevelopmentPhaseTable";
import AccountTreeOutlinedIcon from "@mui/icons-material/AccountTreeOutlined";

import * as React from "react";
import { Alert, AlertColor, Snackbar } from "@mui/material";

//for breadcrumbs
import { Link } from "react-router-dom";
import Breadcrumbs from "@mui/material/Breadcrumbs";

//for breadcrumbs
function handleClick(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
	event.preventDefault();
	console.info("You clicked a breadcrumb.");
}

export interface SnackbarMessage {
	message: string;
	key: number;
}

export interface State {
	open: boolean;
	snackPack: readonly SnackbarMessage[];
	messageInfo?: SnackbarMessage;
}

// interface SnackbarState extends SnackbarOrigin {
// 	info: string;
// }

export default function DevelopmentPhase() {
	// const [origin, setOrigin] = React.useState<SnackbarState>({
	// 	info: "",
	// 	vertical: "top",
	// 	horizontal: "right",
	// });
	// const { vertical, horizontal, info } = origin;
	const [snackPack, setSnackPack] = React.useState<
		readonly SnackbarMessage[]
	>([]);
	const [severity, setSeverity] = React.useState<AlertColor>("error");
	const [open, setOpen] = React.useState(false);
	const [messageInfo, setMessageInfo] = React.useState<
		SnackbarMessage | undefined
	>(undefined);

	React.useEffect(() => {
		if (snackPack.length && !messageInfo) {
			// Set a new snack when we don't have an active one
			setMessageInfo({ ...snackPack[0] });
			setSnackPack((prev) => prev.slice(1));
			setOpen(true);
		} else if (snackPack.length && messageInfo && open) {
			// Close an active snack when a new one is added
			setOpen(false);
		}
	}, [snackPack, messageInfo, open]);

	const handleClickSnackpack =
		(message: string, severity: AlertColor) => () => {
			setSnackPack((prev) => [
				...prev,
				{ message, key: new Date().getTime() },
			]);
			setSeverity(severity);
		};

	const handleClose = (event: React.SyntheticEvent | Event) => {
		setOpen(false);
	};

	const handleExited = () => {
		setMessageInfo(undefined);
	};

	return (
		<div className={DevStyle.mainContainer}>
			<div style={{ width: "97%", paddingBottom: "1%" }}>
				<div className={DevStyle.pageTitle}>
					<span>
						<AccountTreeOutlinedIcon fontSize="large" />
					</span>
					<span
						style={{
							fontSize: "1.8rem",
							color: "black",
							fontWeight: "600",
						}}
					>
						{" "}
						DEVELOPMENT PHASE{" "}
					</span>
				</div>
			</div>

			<div className={DevStyle.contentContainer}>
				<div className={DevStyle.midContent}>
					{/* for breadcrumbs */}
					<div
						style={{
							// border: "1px solid red",
							paddingBottom: "1%",
							width: "80%",
							height: "75%",
							paddingLeft: "1%",
							position: "relative",
							top: "3%",
							alignSelf: "center",
						}}
						role="presentation"
						onClick={handleClick}
					>
						<Breadcrumbs maxItems={2} aria-label="breadcrumb">
							<Link
								to="/DevelopmentPhase"
								className={`${DevStyle["custom-link"]}`}
								style={{ color: "inherit" }}
							>
								Development Phase
							</Link>
						</Breadcrumbs>
					</div>
				</div>

				<div className={DevStyle.contentHolder}>
					<div
						style={{
							backgroundColor: "transparent",
							// borderBottomLeftRadius: "8px",
							// borderBottomRightRadius: "8px",
							height: "100%",
						}}
					>
						<DevelopmentPhaseTable createSnackpack={handleClickSnackpack} />
					</div>
				</div>
			</div>

			<Snackbar
				key={messageInfo ? messageInfo.key : undefined}
				open={open}
				autoHideDuration={2000}
				onClose={handleClose}
				TransitionProps={{ onExited: handleExited }}
				// anchorOrigin={{ vertical, horizontal }}
			>
				<Alert
					onClose={handleClose}
					severity={severity}
					sx={{ width: "100%" }}
					variant="filled"
				>
					{messageInfo ? messageInfo.message : undefined}
				</Alert>
			</Snackbar>
		</div>
	);
}
