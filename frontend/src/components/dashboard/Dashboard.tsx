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
            <div style={{height:"100%", width:"50%", display:"flex", justifyContent:"center", }}>
              <ProjectGraph />
            </div>
            
            <div style={{display:'flex', height:"100%", width:"50%", justifyContent:"center", }}>
              <EmpStatusGraph />
            </div>
          </div>

          <div className={DashboardStyle.tableHolder}>
            <div style={{height:"100%", width:"49%", display:"flex", justifyContent:"center",alignItems:"flex-end", paddingLeft:'.5%' }}>
              <ActivityLogDashboardTable />
            </div>
            
            <div style={{display:'flex', height:"100%", width:"50%", justifyContent:"center",  }}>
              <UserGraph />
            </div>
          </div>
        </div>
      </div> 
    </div>
  );
};
