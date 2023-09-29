import { call, put, takeEvery } from "redux-saga/effects";
import { createAction } from "@reduxjs/toolkit";
import { GridRowId, GridValidRowModel } from "@mui/x-data-grid";
import {
	getProjectStatusFetch,
	getProjectStatusSuccess,
	setMessage,
	setIsLoading
} from "../state/projectStatusState";
import axios from "axios";

// GET ALL
function* fetchProjectStatus(): any {
	const projectStatus = yield call(() =>
		axios.get("http://localhost:8080/project-status/all").then((res) => res.data)
	);
	yield put(getProjectStatusSuccess(projectStatus));
}

export function* projectStatusSaga() {
	yield takeEvery("projectStatus/getProjectStatusFetch", fetchProjectStatus);
}

// UPDATE
const apiUpdate = async (
	proj_status_id: number,
	proj_status_name: string,
	proj_status_description: string
): Promise<any> => {
	try {
		const url = "http://localhost:8080/project-status/edit/" + proj_status_id;
		return axios.put(url, {
			proj_status_name,
			proj_status_description
		});
	} catch (error) {
		return error
	}
};

export const updateProjectStatus = createAction<{
	projectStatusData: GridValidRowModel;
}>("projectStatus/updateProjectStatus");

export function* projectStatusSagaUpdate() {
	yield takeEvery(updateProjectStatus.type, updateSaga);
}

function* updateSaga(action: ReturnType<typeof updateProjectStatus>): any {
	try {
		yield put(setIsLoading(true))
		const response = yield call(
			apiUpdate,
			action.payload.projectStatusData.proj_status_id,
			action.payload.projectStatusData.proj_status_name,
			action.payload.projectStatusData.proj_status_description
		);
		yield call(validate, response);
	} catch (error) {
		yield call(catchErr, error);
	}
}

// ADD
const apiAdd = async (
	proj_status_name: string,
	proj_status_description: string
): Promise<any> => {
	try {
		const url = "http://localhost:8080/project-status/add";
		return axios.post(url, {
			proj_status_name,
			proj_status_description,
		});
	} catch (error) {
		return error
	}
};

export const addProjectStatus = createAction<{
	projectStatusData: GridValidRowModel;
}>("projectStatus/addProjectStatus");

export function* projectStatusSagaAdd() {
	yield takeEvery(addProjectStatus.type, addSaga);
}

function* addSaga(action: ReturnType<typeof addProjectStatus>): any {
	try {
		yield put(setIsLoading(true))
		const response = yield call(
			apiAdd,
			action.payload.projectStatusData.proj_status_name,
			action.payload.projectStatusData.proj_status_description
		);
		yield call(validate, response);
	} catch (error) {
		yield call(catchErr, error);
	}
}

// DELETE
const apiDelete = async (proj_status_id: number): Promise<any> => {
	try {
		const url = "http://localhost:8080/project-status/delete/" + proj_status_id;
		return axios.put(url);
	} catch (error) {
		return error
	}
};

export const deleteProjectStatus = createAction<{
	proj_status_id: number;
}>("projectStatus/deleteProjectStatus");

export function* projectStatusSagaDelete() {
	yield takeEvery(deleteProjectStatus.type, deleteSaga);
}

function* deleteSaga(action: ReturnType<typeof deleteProjectStatus>): any {
	try {
		yield put(setIsLoading(true))
		const response = yield call(apiDelete, action.payload.proj_status_id);
		yield call(validate, response);
	} catch (error) {
		yield call(catchErr, error);
	}
}

// BATCH DELETE
const apiBatchDelete = async (batchId: Set<GridRowId>): Promise<any> => {
	try {
		const params = new URLSearchParams();
		batchId.forEach((id) => {
			params.append("ids", id.toString());
		});
		const url = `http://localhost:8080/project-status/delete-multiple?${params}`
		return axios.put(url);
	} catch (error) {
		return error
	}
};

function* deleteBatchSaga(
	action: ReturnType<typeof deleteProjectStatusBatch>
): any {
	try {
		yield put(setIsLoading(true))
		const response = yield call(apiBatchDelete, action.payload.batchId);
		yield call(validate, response);
	} catch (error) {
		yield call(catchErr, error);
	}
}

export const deleteProjectStatusBatch = createAction<{
	batchId: Set<GridRowId>;
}>("projectStatus/deleteProjectStatusBatch");

export function* projectStatusSagaDeleteBatch() {
	yield takeEvery(deleteProjectStatusBatch.type, deleteBatchSaga);
}



// VALIDATE THE RESPONSE
function* validate(res: any) {
	if (res?.request?.status === 200) {
		yield put(getProjectStatusFetch());
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
	yield put(getProjectStatusFetch());
	yield put(
		setMessage({
			message: err?.response?.data,
			severity: "error",
		})
	);
}