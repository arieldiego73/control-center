  import DashboardStyle from "./Dashboard.module.css";
  import ActivityLogDashboardTable from "./ActivityLogDashboardTable";
  import ProjectGraph from "./project_graph/ProjectGraph";
  import UserGraph from "./user_graph/UserGraph";
  import EmpStatusGraph from "./employeestatus_graph/EmployeeStatusGraph";
  import { useDispatch, useSelector } from "react-redux";
  import { getGraphsDataFetch } from "../../redux/state/graphState";
  import React from "react";
  import { RootState } from "../../redux/store/store";

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

    const dispatch = useDispatch()

    React.useEffect(() => {
      dispatch(getGraphsDataFetch())
    }, [dispatch])

    const graphsData = useSelector((state: RootState) => state.graphsData.graphsData)

    React.useEffect(() => {
    }, [graphsData])

    return (
      <div className={DashboardStyle.mainContainer}>
        <div className={DashboardStyle.contentContainer}>
          <div className={DashboardStyle.contentHolder}>
            <div className={DashboardStyle.graphHolder}>
              <div  className={DashboardStyle.projGraph}>
                <ProjectGraph  graphData={graphsData} />
              </div>
              
              <div  className={DashboardStyle.projGraph}>
                <EmpStatusGraph graphData={graphsData} />
              </div>
            </div>

            <div className={DashboardStyle.tableHolder}>
              <div style={{height:"100%", width:"49%", display:"flex", justifyContent:"center", paddingLeft:'.5%' }}>
                <ActivityLogDashboardTable />
              </div>
              
              <div style={{display:'flex', height:"100%", width:"50%", justifyContent:"center",  }}>
                <UserGraph  graphData={graphsData} />
              </div>
            </div>
          </div>
        </div> 
      </div>
    );
  };
