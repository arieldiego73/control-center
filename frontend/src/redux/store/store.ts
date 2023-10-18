import createSagaMiddleware from "redux-saga";
import { configureStore } from "@reduxjs/toolkit";
import rootSaga from "../saga/rootSaga";
import userReducer from "../state/userState";
import sessionReducer from "../state/sessionState";
import roleReducer from "../state/roleState";
import departmentReducer from "../state/departmentState";
import devPhaseReducer from "../state/devPhaseState";
import positionReducer from "../state/positionState";
import projectStatusReducer from "../state/projectStatusState"
import employeeStatusReducer from "../state/employeeStatusState"
import sectionReducer from "../state/sectionState"
import technologyReducer from "../state/technologyState"
import projectReducer from "../state/projectState"
import clientReducer from "../state/clientState"
import devTypeReducer from "../state/devTypeState"
import activityLog from "../state/historyState"
import graphsData from "../state/graphState"
import formSlice from "../state/formSlice";
import dialogSlice from "../state/dialogSlice";

const saga = createSagaMiddleware();
const store = configureStore({
	reducer: {
		userReducer: userReducer,
		projectReducer: projectReducer,
		sessionReducer: sessionReducer,
		roleReducer: roleReducer,
		deptReducer: departmentReducer,
		devPhaseReducer: devPhaseReducer,
		positionReducer: positionReducer,
		projectStatusReducer: projectStatusReducer,
		employeeStatusReducer: employeeStatusReducer,
		sectionReducer: sectionReducer,
		techReducer: technologyReducer,
		clientReducer: clientReducer,
		devTypeReducer: devTypeReducer,
		activityLog: activityLog,
		graphsData: graphsData,
		pageAbandonmentPrevention: formSlice,
		dialogListener: dialogSlice
		// add more reducers here
	},
	middleware: [saga],
});

saga.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export default store;
