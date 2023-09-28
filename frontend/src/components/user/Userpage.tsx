import React from "react";
import UserStyle from "./User.module.css";
import { getUsersFetch } from "../../redux/state/userState";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store/store";
import UserTable from "./UserTable";
import Button from "@mui/material/Button";
import SearchIcon from "@mui/icons-material/Search";
import {
	Box,
	FormLabel,
	TextField,
	FormControl,
	AlertColor,
	Snackbar,
	Alert,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

//for breadcrumbs
import { Link } from "react-router-dom";

// Define the type for your row data
interface RowData {
	emp_id: number;  
	username: string;
	fname: string;
	lname: string;
	position_sh_name: string;
	email: string;
	section_name: string;
	dept_name: string;
	reg_date: Date;
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

export default function Userpage() {
	const dispatch = useDispatch();

	const notice = useSelector((state: RootState) => state.userReducer.notice);
	const isInitialAmount = React.useRef(true);
	React.useEffect(() => {
		if (!isInitialAmount.current) {
			if (notice.message && notice.severity) {
				handleClickSnackpack(
					notice.message,
					notice.severity as AlertColor
				)();
			}
		} else {
			isInitialAmount.current = false;
		}
	}, [notice]);

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

	React.useEffect(() => {
		dispatch(getUsersFetch());
	}, [dispatch]);

	const userData: RowData[] = useSelector(
		(state: RootState) => state.userReducer.users
	);

	const [data, setData] = React.useState(userData);
	const [searchQuery, setSearchQuery] = React.useState({
		name: "",
		businessUnit: "",
		position: "",
		department: "",
	});

	React.useEffect(() => {
		setData(userData);
	}, [userData]);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.currentTarget;
		setSearchQuery((prevQuery) => ({
			...prevQuery,
			[name]: value,
		}));
	};

	const performSearch = () => {
		const filteredData = userData.filter((employee) => {
			const nameMatch =
				employee.fname
					.toLowerCase()
					.includes(searchQuery.name.toLowerCase()) ||
				employee.lname
					.toLowerCase()
					.includes(searchQuery.name.toLowerCase()) ||
				employee.fname
					.concat(" " + employee.lname)
					.toLowerCase()
					.includes(searchQuery.name.toLowerCase());

			const businessUnitMatch = employee.section_name
				.toLowerCase()
				.includes(searchQuery.department.toLowerCase());
			const positionMatch = employee.position_sh_name
				.toLowerCase()
				.includes(searchQuery.position.toLowerCase());
			const departmentMatch = employee.dept_name
				.toLowerCase()
				.includes(searchQuery.businessUnit.toLowerCase());

			return (
				nameMatch &&
				businessUnitMatch &&
				positionMatch &&
				departmentMatch
			);
		});

		// Use the filteredData as needed, such as displaying it in a table
		setData(filteredData);
	};

	return (
		<div className={UserStyle.outermost}> 
			<div className={UserStyle.addButton}>
				<Link
					to="/user/add-new-user"
					style={{ textDecoration: "none", color: "black" }}
				>
					<Button
						variant="contained"
						color="primary"
						startIcon={<AddIcon />}
						className={UserStyle.button}
					>
						Add User
					</Button>
				</Link>
			</div>

			<div className={UserStyle.mainContainer}>
				<div className={UserStyle.mainHolder}>
					<div className={UserStyle.contentHolder}>
						<Box
							component="form"
							onKeyDown={(e) => {
								if (e.key.match("Enter")) performSearch();
							}}
							className={UserStyle.searchBarContainer}
							autoComplete="off"
							noValidate
						>
							{/* Start of Seach Bar */}
							<div className={UserStyle.searchBarCol}>
								<div className={UserStyle.searchBarColLeft}>
									<FormControl sx={{ display: "flex", flexDirection: "row", alignItems: "flex-end", flex: 1, gap: "10px", justifyContent: "flex-end" }}>
										<FormLabel
											sx={{
												color: "black",
												fontWeight: "400",
												whiteSpace: "nowrap",
											}}
										>
											Name :
										</FormLabel>
										<TextField
											variant="outlined"
											size="small"
											value={searchQuery.name}
											onChange={handleInputChange}
											name="name"
											sx={{ flex: 1, display: "flex" }}
											inputProps={{
												autoComplete: "chrome-off",
											}}
										/>
									</FormControl>
									<FormControl sx={{ display: "flex", flexDirection: "row", alignItems: "flex-end", flex: 1, gap: "10px", justifyContent: "flex-end" }}>
										<FormLabel
											sx={{
												color: "black",
												fontWeight: "400",
												whiteSpace: "nowrap",
											}}
										>
											Position :
										</FormLabel>
										<TextField
											variant="outlined"
											size="small"
											value={searchQuery.position}
											onChange={handleInputChange}
											name="position"
											sx={{ flex: 1, display: "flex" }}

										/>
									</FormControl>
								</div>
								<div className={UserStyle.searchBarColRight}>
									<FormControl sx={{ display: "flex", flexDirection: "row", alignItems: "flex-end", flex: 1, gap: "10px", justifyContent: "flex-end" }}>

										<FormLabel
											sx={{
												color: "black",
												fontWeight: "400",
												whiteSpace: "nowrap",
											}}
										>
											Business Unit :
										</FormLabel>
										<TextField
											variant="outlined"
											size="small"
											value={searchQuery.businessUnit}
											onChange={handleInputChange}
											name="businessUnit"
											sx={{ flex: 1, display: "flex" }}

										/>
									</FormControl>
									<FormControl sx={{ display: "flex", flexDirection: "row", alignItems: "flex-end", flex: 1, gap: "10px", justifyContent: "flex-end" }}>

										<FormLabel
											sx={{
												color: "black",
												fontWeight: "400",
												whiteSpace: "nowrap",
											}}
										>
											Department :
										</FormLabel>
										<TextField
											variant="outlined"
											size="small"
											value={searchQuery.department}
											onChange={handleInputChange}
											name="department"
											sx={{ flex: 1, display: "flex" }}

										/>
									</FormControl>
								</div>
								<div className={UserStyle.searchBarColButton}>
									<Button
										variant="contained"
										color="inherit"
										startIcon={<SearchIcon />}
										className={UserStyle.button}
										onClick={performSearch}
										style={{ height: "40px" }}
									>
										Search
									</Button>
								</div>
							</div>
						</Box>

						{/* Start of Table */}
						<div className={UserStyle.userTableContainer}>
							<UserTable data={data} />
						</div>
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
