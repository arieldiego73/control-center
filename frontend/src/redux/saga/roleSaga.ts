import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import { getRolesSuccess } from "../state/roleState";
import { createAction } from "@reduxjs/toolkit";

function* fetchRoles(): any {
	const roles = yield call(() =>
		fetch("http://localhost:8080/role/all").then((res) => res.json())
	);
	yield put(getRolesSuccess(roles));
}

const apiUpdate = async (
	role_id: number,
	title: string,
	role_sh_name: string,
	role_user_level: number
): Promise<any> => {
	try {
		const url = "http://localhost:8080/role/edit/" + role_id;
		const response = await fetch(url, {
			method: "PUT",
			body: JSON.stringify({ title, role_sh_name, role_user_level }),
			headers: {
				"Content-Type": "application/json",
			},
		});
		if (response.ok) {
			const data = await response.json();
			return data;
		} else {
			return null;
		}
	} catch (error) {
		console.error("An error occurred:", error);
	}
};

const apiAdd = async (
	title: string,
	role_sh_name: string,
	role_user_level: number,
	reg_id: string,
	update_id: string
): Promise<any> => {
	try {
		const url = "http://localhost:8080/role/add";
		const response = await fetch(url, {
			method: "POST",
			body: JSON.stringify({
				title,
				role_sh_name,
				role_user_level,
				reg_id,
				update_id,
			}),
			headers: {
				"Content-Type": "application/json",
			},
		});
		console.log("response:", response);
		if (response.ok) {
			const data = await response.json();
			return data;
		} else {
			return null;
		}
	} catch (error) {
		console.error("An error occurred:", error);
	}
};

const apiDelete = async (role_id: number): Promise<any> => {
	try {
		const url = "http://localhost:8080/role/delete/" + role_id;
		const response = await fetch(url, {
			method: "PUT",
		});
		if (response.ok) {
			const data = await response.json();
			return data;
		} else {
			return null;
		}
	} catch (error) {
		console.error("An error occurred:", error);
	}
};

function* updateSaga(action: ReturnType<typeof updateRoles>): any {
	try {
		const roles = yield call(
			apiUpdate,
			action.payload.role_id,
			action.payload.title,
			action.payload.role_sh_name,
			action.payload.role_user_level
		);
		if (roles) yield put(getRolesSuccess(roles));
	} catch (error) {
		console.log(error);
	}
}

function* addSaga(action: ReturnType<typeof addRoles>): any {
	try {
		const roles = yield call(
			apiAdd,
			action.payload.title,
			action.payload.role_sh_name,
			action.payload.role_user_level,
			action.payload.reg_id,
			action.payload.update_id
		);
		if (roles) yield put(getRolesSuccess(roles));
	} catch (error) {
		console.log(error);
	}
}

function* deleteSaga(action: ReturnType<typeof deleteRoles>): any {
	try {
		const roles = yield call(apiDelete, action.payload.role_id);
		if (roles) yield put(getRolesSuccess(roles));
	} catch (error) {
		console.log(error);
	}
}

export const updateRoles = createAction<{
	role_id: number;
	title: string;
	role_sh_name: string;
	role_user_level: number;
}>("roles/updateRoles");

export const addRoles = createAction<{
	title: string;
	role_sh_name: string;
	role_user_level: number;
	reg_id: string;
	update_id: string;
}>("roles/addRoles");

export const deleteRoles = createAction<{
	role_id: number;
}>("roles/deleteRoles");

export function* roleSagaUpdate() {
	yield takeLatest(updateRoles.type, updateSaga);
}

export function* roleSagaAdd() {
	yield takeLatest(addRoles.type, addSaga);
}

export function* roleSagaDelete() {
	yield takeLatest(deleteRoles.type, deleteSaga);
}

export function* roleSaga() {
	yield takeEvery("roles/getRolesFetch", fetchRoles);
}
