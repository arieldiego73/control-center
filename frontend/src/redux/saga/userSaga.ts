import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import {
	getUserInfoSuccess,
	getUsersFetch,
	getUsersSuccess,
	setMessage,
} from "../state/userState";
import { createAction } from "@reduxjs/toolkit";
import axios from "axios";

interface Data {
	emp_id: string;
	username: string;
	fname: string;
	mname: string;
	lname: string;
	position_id: number;
	email: string;
	section_id: number;
	dept_id: number;
	selectedRoles: string[];
}


function* workGetUsersFetch(): any {
	const users = yield call(() =>
		fetch("http://localhost:8080/user/all").then((res) => res.json())
	);
	yield put(getUsersSuccess(users));
}

function* userSaga() {
	yield takeEvery("users/getUsersFetch", workGetUsersFetch);
}

// FETCH A SINGLE USER
function* fetchUserInfoSaga(action: ReturnType<typeof getUserInfo>): any {
	try {
		const res = yield call(apiFetchUserInfo, action.payload.userId);
		if (res?.request?.status === 200) {
			yield put(getUserInfoSuccess(res?.data));
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
	} catch (err: any) {
		yield put(
			setMessage({
				message: err?.response?.data,
				severity: "error",
			})
		);
	}
}

export function* userSagaFetchUserInfo() {
	yield takeLatest(getUserInfo.type, fetchUserInfoSaga);
}

const apiFetchUserInfo = async (userId: any): Promise<any> => {
	try {
		return axios.get(`http://localhost:8080/user/info/${userId}`);
	} catch (error) {
		return error;
	}
};

export const getUserInfo = createAction<{
	userId: any;
}>("users/getUserInfo");



// ADD
const apiAdd = async (data: Data): Promise<any> => {
	try {
		const params = new URLSearchParams();
		data.selectedRoles.forEach((id) => {
			params.append("role_ids", id);
		});
		const url = `http://localhost:8080/user/create-account?${params}`;
		return axios.post(url, {
			emp_id: data.emp_id,
			username: data.username,
			fname: data.fname,
			mname: data.mname,
			lname: data.lname,
			position_id: data.position_id,
			email: data.email,
			section_id: data.section_id,
			dept_id: data.dept_id,
			status_code: "TRA",
			password: "tsukiden+",
			img_src: "sample_img"
		});
	} catch (error) {
		return error;
	}
};

export const addUserInfo = createAction<{
	data: Data;
}>("users/addUserInfo");

export function* userSagaAdd() {
	yield takeLatest(addUserInfo.type, addSaga);
}

function* addSaga(action: ReturnType<typeof addUserInfo>): any {
	try {
		const response = yield call(apiAdd, action.payload.data);
		yield call(validate, response);
	} catch (error) {
		yield call(catchErr, error);
	}
}


// VALIDATE THE RESPONSE
function* validate(res: any) {
	if (res?.request?.status === 200) {
		yield put(getUsersFetch());
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
	yield put(getUsersFetch());
	yield put(
		setMessage({
			message: err?.response?.data,
			severity: "error",
		})
	);
}

export default userSaga;
