import React, { useEffect, useState } from "react";
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
import CircularProgress from "@mui/material/CircularProgress";
import { TroubleshootRounded } from "@mui/icons-material";

function createData(
  id: number,
  date: string,
  action: string,
  user: string,
  time: string
) {
  return { id, date, action, user, time };
}

const TODAY_STR = "Today";
const YESTERDAY_STR = "Yesterday";

let todayCount = 0;
let yesterdayCount = 0;
let otherDates: string[] = [];
let otherDatesDistinct: string[] = [];
let headerHolder: string[] = [];

export default function ActivityLogDashboardTable() {
  const dispatch = useDispatch();
  const [rows, setRows] = useState([createData(0, "", "", "", "")]);

  useEffect(() => {
    dispatch(getHistoryFetch());
  }, [dispatch]);

  const history = useSelector((state: RootState) => state.activityLog.history);

  const loadingState = useSelector(
    (state: RootState) => state.graphsData.isLoading
  );
  const [isLoading, setIsLoading] = useState(false);
  // const [progressValue, setProgressValue] = useState(0);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       while (true) {
  //         // Simulate an asynchronous task that takes 3 seconds
  //         await new Promise((resolve) => setTimeout(resolve, 10000));
          
  //         // Update progressValue when each iteration of the task is complete
  //         setProgressValue(100);
  //       }
  //     } catch (error) {
  //       // Handle errors
  //     } finally {
  //       setIsLoading(false); // Set isLoading to false when data fetching is complete
  //     }
  //   };

  //   // Start the data fetching task
  //   fetchData();
  // }, []);

  useEffect(() => {
    setIsLoading(loadingState);
  }, [loadingState]);

  useEffect(() => {
    todayCount = 0;
    yesterdayCount = 0;
    otherDates = [];
    setRows(
      history.map((log) => {
        let date = "";
        const currDate = dayjs(log.log_date).get("date");

        const TODAY = dayjs();
        if (currDate === TODAY.get("date")) {
          if (todayCount === 0) {
            date = TODAY_STR;
          } else {
            date = "";
          }
          todayCount++;
        } else if (currDate === TODAY.subtract(1, "day").get("date")) {
          if (yesterdayCount === 0) {
            date = YESTERDAY_STR;
          } else {
            date = "";
          }
          yesterdayCount++;
        } else {
          const tempDate = dayjs(log.log_date).format("DD/MM/YYYY");
          otherDates.push(tempDate);
          if (otherDatesDistinct.includes(tempDate)) {
            date = "";
          } else {
            otherDatesDistinct.push(tempDate);
            date = tempDate;
          }
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
  }, [dispatch, history]);

  function determineHeader(row: {
    id: number;
    date: string;
    action: string;
    user: string;
    time: string;
  }) {
    return row.date === "" ? (
      <></>
    ) : row.date === TODAY_STR ? (
      <TableCell
        style={{
          fontWeight: "bold",
          verticalAlign: "baseline",
          fontSize:"20px",
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
          fontSize:"20px",
        }}
        rowSpan={yesterdayCount}
      >
        {row.date}
      </TableCell>
    ) : otherDatesDistinct.includes(row.date) &&
      !headerHolder.includes(row.date) ? (
      <TableCell
        style={{
          fontWeight: "bold",
          verticalAlign: "baseline",
          fontSize:"20px",
        }}
        rowSpan={otherDates.filter((date) => date === row.date).length}
      >
        {processOtherDates(row.date)}
      </TableCell>
    ) : (
      <TableCell style={{ fontWeight: "bold",  fontSize:"20px", }}>{row.date}</TableCell>
    );
  }

  function processOtherDates(date: string) {
    headerHolder.push(date);
    return date;
  }

  return (
    <div className={ActLogStyle.activityLogContainer}>
      <Paper className={ActLogStyle.paper}>
        <TableContainer className={ActLogStyle.actLogTable}>
          <Table size="small" style={{ height: "100%" }}>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.id}>
                  {determineHeader(row)}
                  <TableCell align="left" width={150} style={{ fontSize:"20px",}}>
                    {row.time}
                  </TableCell>

                  <TableCell align="left"  style={{ fontSize:"20px",}}>
                    {row.user} - {row.action}
                  </TableCell>
                </TableRow>
              ))}
              {isLoading && (
                <TableRow>
                  <TableCell colSpan={3}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        height: "100px",
                      }}
                    >
                      <CircularProgress color="warning"/>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </div>
  );
}

