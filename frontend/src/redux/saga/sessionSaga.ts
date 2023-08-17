// src/sagas/sessionSaga.ts
import { put, takeLatest, call } from "redux-saga/effects";
import { setUser } from "../state/sessionState";
import { createAction } from "@reduxjs/toolkit";

// Simulate API call
const apiLogin = async (username: string, password: string): Promise<any> => {
	try {
		const response = await fetch("http://localhost:8080/api/user/login", {
			method: "POST",
			body: JSON.stringify({ username, password }),
			headers: {
				"Content-Type": "application/json",
			},
		});

		if (response.ok) {
			const data = await response.json();
			console.log(data); // Log the data received from the server
			return data; // Return the data to the caller
		} else {
			console.log("Login failed");
			throw new Error("Login failed");
		}
	} catch (error) {
		console.error("An error occurred:", error);
		throw error; // Re-throw the error to the caller
	}
};

function* loginSaga(action: ReturnType<typeof login>): any {
	try {
		const user = yield call(
			apiLogin,
			action.payload.username,
			action.payload.password
		);
		yield put(setUser(user));
	} catch (error) {
		// Handle error
	}
}

// Create your login action
export const login = createAction<{ username: string; password: string }>(
	"session/login"
);

// Create your root saga
export function* sessionSaga() {
	yield takeLatest(login.type, loginSaga);
}
