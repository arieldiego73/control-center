import * as React from "react";
import ActLogStyle from "./Dashboard.module.css";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useDispatch, useSelector } from "react-redux";
import { getHistoryFetch } from "../../redux/state/historyState";
import { RootState } from "../../redux/store/store";
import dayjs from "dayjs";

function createData(
	id: number,
	date: string,
	action: String,
	user: string,
	time: string
) {
	return { id, date, action, user, time };
}

const TODAY_STR = "Today";
const YESTERDAY_STR = "Yesterday";

let todayCount = 0;
let yesterdayCount = 0;
 
export default function ActivityLogDashboardTable() {
	const dispatch = useDispatch();

	const [rows, setRows] = React.useState([createData(0, "", "", "", "")]);

	React.useEffect(() => {
		dispatch(getHistoryFetch());
	}, [dispatch]);

	const history = useSelector(
		(state: RootState) => state.activityLog.history
	);
	React.useEffect(() => {
		if (history) {
			todayCount = 0;
			yesterdayCount = 0;
			setRows(
				history.map((log) => {
					let date = "";

					const TODAY = dayjs();
					if (dayjs(log.log_date).get("date") === TODAY.get("date")) {
						if (todayCount === 0) {
							date = TODAY_STR;
						} else {
							date = "";
						}
						todayCount++;
					} else if (
						dayjs(log.log_date).get("date") ===
						TODAY.subtract(1, "day").get("date")
					) {
						if (yesterdayCount === 0) {
							date = YESTERDAY_STR;
						} else {
							date = "";
						}
						yesterdayCount++;
					} else {
						date = dayjs(log.log_date).format("DD/MM/YYYY");
					}

					return createData(
						log.log_id,
						date,
						log.log_desc,
						log.username,
						dayjs(log.log_date).format("h:mm A")
					);
				})
			);
		}
	}, [history]);

	return (
		<div className={ActLogStyle.activityLogContainer}>
			<Paper className={ActLogStyle.paper}>
				<TableContainer className={ActLogStyle.actLogTable}>
					<Table>
						<TableBody>
							{rows.map((row) => (
								<TableRow
									key={row.id}
									sx={{
										"&:last-child td, &:last-child th": {
											border: 0,
										},
									}}
								>
									{row.date === "" ? (
										<></>
									) : row.date === TODAY_STR ? (
										<TableCell
											style={{
												fontWeight: "bold",
												verticalAlign: "baseline",
											}}
											rowSpan={todayCount}
										>
											{row.date}
										</TableCell>
									) : row.date === YESTERDAY_STR ? (
										<TableCell
											style={{
												fontWeight: "bold",
												verticalAlign: "baseline",
											}}
											rowSpan={yesterdayCount}
										>
											{row.date}
										</TableCell>
									) : (
										<TableCell
											style={{ fontWeight: "bold" }}
										>
											{row.date}
										</TableCell>
									)}
									<TableCell align="left" width={150}>
										{row.time}
									</TableCell>

									<TableCell align="left">
										{row.user} - {row.action}
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</TableContainer>
			</Paper>
		</div>
	);
}
