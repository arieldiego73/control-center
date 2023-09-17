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

const saga = createSagaMiddleware();
const store = configureStore({
	reducer: {
		userReducer: userReducer,
		sessionReducer: sessionReducer,
		roleReducer: roleReducer,
		deptReducer: departmentReducer,
		devPhaseReducer: devPhaseReducer,
		positionReducer: positionReducer,
		projectStatusReducer: projectStatusReducer,
		employeeStatusReducer: employeeStatusReducer,
		sectionReducer: sectionReducer,
		techReducer: technologyReducer,
		// add more reducers here
	},
	middleware: [saga],
});

saga.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export default store;
