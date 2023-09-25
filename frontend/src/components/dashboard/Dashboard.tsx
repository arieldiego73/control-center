import DashboardStyle from "./Dashboard.module.css";
import ActivityLogDashboardTable from "./ActivityLogDashboardTable";
import ProjectGraph from "./project_graph/ProjectGraph";
import UserGraph from "./user_graph/UserGraph";
import EmpStatusGraph from "./employeestatus_graph/EmployeeStatusGraph";

export const Dashboard = () => {
  // const navigate = useNavigate();

  /* THIS LINE IS USED TO FETCHED THE LOGGED IN USER'S INFO */
  // const loggedUser = useSelector((state: RootState) => {
  // 	return state.sessionReducer.user;
  // });

  /* VALIDATE IF A USER IS LOGGED IN */
  // useEffect(() => {
  // 	if (loggedUser === null) {
  // 		navigate("/");
  // 	}
  // });

  return (
    <div className={DashboardStyle.mainContainer}>
      <div className={DashboardStyle.contentContainer}>
        <div className={DashboardStyle.contentHolder}>
          <div className={DashboardStyle.graphHolder}>
            <ProjectGraph />
            <UserGraph />
            <EmpStatusGraph />
          </div>

          <div className={DashboardStyle.tableHolder}>
            <ActivityLogDashboardTable />
          </div>
        </div>
      </div> 
    </div>
  );
};
