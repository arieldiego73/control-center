import NavigationHandler from "./NavigationHandler"
import Test, { RowData } from '../components/test/test2'
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsersFetch } from "../redux/state/userState";
import { RootState } from "../redux/store/store";

export default function TestHandler(){
  const dispatch = useDispatch()

  React.useEffect(() => {
    dispatch(getUsersFetch());
  }, [dispatch]);

  const userData: RowData[] = useSelector(
    (state: RootState) => state.userReducer.users
  );
  
    return (
      <div style={{ flexDirection: "column", display: "flex", }}>
      <NavigationHandler/> 
      <Test data={userData} />
    </div>
    )
}