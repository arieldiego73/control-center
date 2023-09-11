import createSagaMiddleware from "redux-saga";
import { configureStore } from "@reduxjs/toolkit";
import rootSaga from "../saga/rootSaga";
import userReducer from "../state/userState";
import sessionReducer from "../state/sessionState";
import roleReducer from "../state/roleState";
import departmentReducer from "../state/departmentState";
import devPhaseReducer from "../state/devPhaseState";
import positionReducer from "../state/positionState";
import businessUnitReducer from "../state/businessUnitState"
import projectStatusReducer from "../state/projectStatusState"

const saga = createSagaMiddleware();
const store = configureStore({
	reducer: {
		userReducer: userReducer,
		sessionReducer: sessionReducer,
		roleReducer: roleReducer,
		deptReducer: departmentReducer,
		devPhaseReducer: devPhaseReducer,
		positionReducer: positionReducer,
		businessUnitReducer: businessUnitReducer,
		projectStatusReducer: projectStatusReducer,
		// add more reducers here
	},
	middleware: [saga],
});

saga.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export default store;
