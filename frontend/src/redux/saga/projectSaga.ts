import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
// import { createAction } from "@reduxjs/toolkit";
import axios from "axios";
import {
	getProjectsFetch,
	getProjectsSuccess,
	setMessage,
} from "../state/projectState";

// interface Data {
// 	emp_id: string;
// 	username: string;
// 	fname: string;
// 	mname: string;
// 	lname: string;
// 	position_id: number;
// 	email: string;
// 	section_id: number;
// 	dept_id: number;
// 	selectedRoles: number[];
// }

function* workGetProjectsFetch(): any {
	const projects = yield call(() =>
		axios.get("http://localhost:8080/project/project-table").then((res) => res.data)
	);
	yield put(getProjectsSuccess(projects));
}

function* projectSaga() {
	yield takeEvery("project/getProjectsFetch", workGetProjectsFetch);
}

// VALIDATE THE RESPONSE
function* validate(res: any) {
	if (res?.request?.status === 200) {
		yield put(getProjectsFetch());
		yield put(
			setMessage({
				message: res?.data,
				severity: "success",
			})
		);
	} else if (res?.request?.status > 200) {
		yield put(
			setMessage({
				message: res?.response?.data,
				severity: "error",
			})
		);
	} else {
		yield put(
			setMessage({
				message: res,
				severity: "error",
			})
		);
	}
}

// CATCH ERROR
function* catchErr(err: any) {
	yield put(getProjectsFetch());
	yield put(
		setMessage({
			message: err?.response?.data,
			severity: "error",
		})
	);
}

export default projectSaga;
