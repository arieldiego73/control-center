import NavigationHandler from "./NavigationHandler"
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store/store";
import { RowData } from "../components/user/UserTable";
import Test from "../components/test/test2";
import { getProjectsFetch } from "../redux/state/projectState";


export default function TestHandler(){
  const dispatch = useDispatch()

  React.useEffect(() => {
    dispatch(getProjectsFetch());
  }, [dispatch]);

  const projectData: RowData[] = useSelector(
    (state: RootState) => state.projectReducer.projects
  );
  
    return (
      <div style={{ flexDirection: "column", display: "flex", }}>
      <NavigationHandler/> 
      <Test projectData={projectData} />
    </div>
    )
}