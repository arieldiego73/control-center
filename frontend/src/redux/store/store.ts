import createSagaMiddleware from "redux-saga";
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../state/userState";
import userSaga from "../saga/userSaga";

const saga = createSagaMiddleware();
const store = configureStore({
	reducer: {
		userReducer: userReducer,
	},
	middleware: [saga],
});

saga.run(userSaga);

export type RootState = ReturnType<typeof store.getState>;
export default store;
