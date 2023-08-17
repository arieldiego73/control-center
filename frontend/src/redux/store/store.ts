import createSagaMiddleware from "redux-saga";
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../state/userState";
import sessionReducer from "../state/sessionState";
import rootSaga from "../saga/rootSaga";

const saga = createSagaMiddleware();
const store = configureStore({
	reducer: {
		userReducer: userReducer,
		sessionReducer: sessionReducer,
		// add more reducers here
	},
	middleware: [saga],
});

saga.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export default store;
