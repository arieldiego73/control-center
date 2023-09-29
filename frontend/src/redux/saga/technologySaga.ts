import { call, put, takeEvery } from "redux-saga/effects";
import { createAction } from "@reduxjs/toolkit";
import { GridRowId, GridValidRowModel } from "@mui/x-data-grid";
import {
	getTechnologyFetch,
	getTechnologySuccess,
	setMessage,
	setIsLoading
} from "../state/technologyState";
import axios from "axios";

// GET ALL
function* fetchTechnology(): any {
	const technology = yield call(() =>
		axios.get("http://localhost:8080/technology/all").then((res) => res.data)
	);
	yield put(getTechnologySuccess(technology));
}

export function* technologySaga() {
	yield takeEvery("technology/getTechnologyFetch", fetchTechnology);
}

// UPDATE
const apiUpdate = async (
	tech_id: number,
	tech_name: string,
	tech_sh_name: string
): Promise<any> => {
	try {
		const url = "http://localhost:8080/technology/edit/" + tech_id;
		return axios.put(url, {
			tech_name,
			tech_sh_name,
		});
	} catch (error) {
		return error;
	}
};

export const updateTechnology = createAction<{
	technologyData: GridValidRowModel;
}>("technology/updateTechnology");

export function* technologySagaUpdate() {
	yield takeEvery(updateTechnology.type, updateSaga);
}

function* updateSaga(action: ReturnType<typeof updateTechnology>): any {
	try {
		yield put(setIsLoading(true))
		const response = yield call(
			apiUpdate,
			action.payload.technologyData.tech_id,
			action.payload.technologyData.tech_name,
			action.payload.technologyData.tech_sh_name
		);
		yield call(validate, response);
	} catch (error) {
		yield call(catchErr, error);
	}
}

// ADD
const apiAdd = async (
	tech_name: string,
	tech_sh_name: string
): Promise<any> => {
	try {
		const url = "http://localhost:8080/technology/add";
		return axios.post(url, {
			tech_name,
			tech_sh_name
		});
	} catch (error) {
		return error
	}
};

export const addTechnology = createAction<{
	technologyData: GridValidRowModel;
}>("technology/addTechnology");

export function* technologySagaAdd() {
	yield takeEvery(addTechnology.type, addSaga);
}

function* addSaga(action: ReturnType<typeof addTechnology>): any {
	try {
		yield put(setIsLoading(true))
		const response = yield call(
			apiAdd,
			action.payload.technologyData.tech_name,
			action.payload.technologyData.tech_sh_name
		);
		yield call(validate, response);
	} catch (error) {
		yield call(catchErr, error);
	}
}

// DELETE
const apiDelete = async (tech_id: number): Promise<any> => {
	try {
		const url = "http://localhost:8080/technology/delete/" + tech_id;
		return axios.put(url);
	} catch (error) {
		console.error("An error occurred:", error);
	}
};

export const deleteTechnology = createAction<{
	tech_id: number;
}>("technology/deleteTechnology");

export function* technologySagaDelete() {
	yield takeEvery(deleteTechnology.type, deleteSaga);
}

function* deleteSaga(action: ReturnType<typeof deleteTechnology>): any {
	try {
		yield put(setIsLoading(true))
		const response = yield call(apiDelete, action.payload.tech_id);
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
		const url = `http://localhost:8080/technology/delete-multiple?${params}`
		return axios.put(url);
	} catch (error) {
		return error
	}
};

function* deleteBatchSaga(action: ReturnType<typeof deleteTechnologyBatch>): any {
	try {
		yield put(setIsLoading(true))
		const response = yield call(apiBatchDelete, action.payload.batchId);
		yield call(validate, response);
	} catch (error) {
		yield call(catchErr, error);
	}
}

export const deleteTechnologyBatch = createAction<{
	batchId: Set<GridRowId>;
}>("technology/deleteRolesBatch");

export function* technologySagaDeleteBatch() {
	yield takeEvery(deleteTechnologyBatch.type, deleteBatchSaga);
}

// VALIDATE THE RESPONSE
function* validate(res: any) {
	if (res?.request?.status === 200) {
		yield put(getTechnologyFetch());
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
	yield put(getTechnologyFetch());
	yield put(
		setMessage({
			message: err?.response?.data,
			severity: "error",
		})
	);
}
