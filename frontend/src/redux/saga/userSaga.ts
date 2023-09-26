import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import {
	addUserSuccess,
	getUserInfoSuccess,
	getUserRolesSuccess,
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
	selectedRoles: number[];
	status_code: string;
}

function* workGetUsersFetch(): any {
	const users = yield call(() =>
		fetch("http://localhost:8080/user/user-table").then((res) => res.json())
	);
	yield put(getUsersSuccess(users));
}

function* userSaga() {
	yield takeEvery("users/getUsersFetch", workGetUsersFetch);
}

// FETCH A SINGLE USER
function* fetchUserInfoSaga(action: ReturnType<typeof getUserInfo>): any {
	try {
		const responseUserInfo = yield call(
			apiFetchUserInfo,
			action.payload.userId
		);
		yield call(validate, responseUserInfo, "info");
	} catch (error) {
		yield call(catchErr, error);
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

// FETCH A SINGLE USER'S ROLES
function* fetchUserRolesSaga(action: ReturnType<typeof getUserRoles>): any {
	try {
		const responseUserRoles = yield call(
			apiFetchUserRoles,
			action.payload.userId
		);
		yield call(validate, responseUserRoles, "roles");
	} catch (error) {
		yield call(catchErr, error);
	}
}

export function* userSagaFetchUserRoles() {
	yield takeLatest(getUserRoles.type, fetchUserRolesSaga);
}

const apiFetchUserRoles = async (userId: any): Promise<any> => {
	try {
		return axios.get(`http://localhost:8080/user/roles/${userId}`);
	} catch (error) {
		return error;
	}
};

export const getUserRoles = createAction<{
	userId: any;
}>("users/getUserRoles");

// ADD
const apiAdd = async (data: Data): Promise<any> => {
	try {
		const params = new URLSearchParams();
		data.selectedRoles.forEach((id) => {
			params.append("role_ids", id.toString());
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
			status_code: data.status_code,
			password: "tsukiden+",
			img_src: "sample_img",
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
		yield call(validate, response, "add");
	} catch (error) {
		yield call(catchErr, error);
	}
}

// UPDATE
const apiUpdate = async (data: Data): Promise<any> => {
	try {
		const params = new URLSearchParams();
		data.selectedRoles.forEach((id) => {
			params.append("role_ids", id.toString());
		});
		const url = `http://localhost:8080/user/edit-account/${data.emp_id}?${params}`;
		return axios.put(url, {
			emp_id: data.emp_id,
			username: data.username,
			fname: data.fname,
			mname: data.mname,
			lname: data.lname,
			position_id: data.position_id,
			email: data.email,
			section_id: data.section_id,
			dept_id: data.dept_id,
			status_code: data.status_code,
			password: "tsukiden+",
			img_src: "sample_img",
		});
	} catch (error) {
		return error;
	}
};

export const updateUserInfo = createAction<{
	data: Data;
}>("users/updateUserInfo");

export function* userSagaUpdate() {
	yield takeLatest(updateUserInfo.type, updateSaga);
}

function* updateSaga(action: ReturnType<typeof updateUserInfo>): any {
	try {
		const response = yield call(apiUpdate, action.payload.data);
		yield call(validate, response, "update");
	} catch (error) {
		yield call(catchErr, error);
	}
}

// VALIDATE THE RESPONSE
function* validate(res: any, action?: string) {
	if (res?.request?.status === 200) {
		switch (action) {
			case "add":
				yield put(
					setMessage({
						message: res?.data + " Redirecting...",
						severity: "success",
					})
				);
				yield put(addUserSuccess()); // if the action is Add User, change the state of isAddSuccess to true
				break;
			case "info":
				yield put(getUserInfoSuccess(res?.data));
				break;
			case "roles":
				yield put(getUserRolesSuccess(res?.data));
				break;
			case "update":
				yield put(
					setMessage({
						message: res?.data + " Redirecting...",
						severity: "success",
					})
				);
				yield put(getUsersFetch());
				yield put(addUserSuccess());
				break;
			default:
				yield put(
					setMessage({
						message: res?.data,
						severity: "success",
					})
				);
				yield put(getUsersFetch());
				break;
		}
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
