import { call, put, takeEvery } from "redux-saga/effects";
import { createAction } from "@reduxjs/toolkit";
import { GridRowId, GridValidRowModel } from "@mui/x-data-grid";
import {
	getDevPhaseFetch,
	getDevPhaseSuccess,
	setIsLoading,
	setMessage,
} from "../state/devPhaseState";
import axios from "axios";

// GET ALL
function* fetchDevPhase(): any {
	const devPhase = yield call(() =>
		axios.get("http://localhost:8080/dev-phase/all").then((res) => res.data)
	);
	yield put(getDevPhaseSuccess(devPhase));
}

export function* devPhaseSaga() {
	yield takeEvery("devPhase/getDevPhaseFetch", fetchDevPhase);
}

// UPDATE
const apiUpdate = async (
	dev_phase_id: number,
	dev_phase_name: string,
	dev_phase_sh_name: string
): Promise<any> => {
	try {
		const url = "http://localhost:8080/dev-phase/edit/" + dev_phase_id;
		return axios.put(url, {
			dev_phase_name,
			dev_phase_sh_name,
		});
	} catch (error) {
		return error;
	}
};

export const updateDevPhase = createAction<{
	devPhaseData: GridValidRowModel;
}>("devPhase/updateDevPhase");

export function* devPhaseSagaUpdate() {
	yield takeEvery(updateDevPhase.type, updateSaga);
}

function* updateSaga(action: ReturnType<typeof updateDevPhase>): any {
	try {
		yield put(setIsLoading(true))
		const response = yield call(
			apiUpdate,
			action.payload.devPhaseData.dev_phase_id,
			action.payload.devPhaseData.dev_phase_name,
			action.payload.devPhaseData.dev_phase_sh_name
		);
		yield call(validate, response);
	} catch (error) {
		yield call(catchErr, error);
	}
}

// ADD
const apiAdd = async (
	dev_phase_name: string,
	dev_phase_sh_name: string
): Promise<any> => {
	try {
		const url = "http://localhost:8080/dev-phase/add";
		return axios.post(url, {
			dev_phase_name,
			dev_phase_sh_name
		});
	} catch (error) {
		return error
	}
};

export const addDevPhase = createAction<{
	devPhaseData: GridValidRowModel;
}>("devPhase/addDevPhase");

export function* devPhaseSagaAdd() {
	yield takeEvery(addDevPhase.type, addSaga);
}

function* addSaga(action: ReturnType<typeof addDevPhase>): any {
	try {
		yield put(setIsLoading(true))
		const response = yield call(
			apiAdd,
			action.payload.devPhaseData.dev_phase_name,
			action.payload.devPhaseData.dev_phase_sh_name
		);
		yield call(validate, response);
	} catch (error) {
		yield call(catchErr, error);
	}
}

// DELETE
const apiDelete = async (dev_phase_id: number): Promise<any> => {
	try {
		const url = "http://localhost:8080/dev-phase/delete/" + dev_phase_id;
		return axios.put(url);
	} catch (error) {
		console.error("An error occurred:", error);
	}
};

export const deleteDevPhase = createAction<{
	dev_phase_id: number;
}>("devPhase/deleteDevPhase");

export function* devPhaseSagaDelete() {
	yield takeEvery(deleteDevPhase.type, deleteSaga);
}

function* deleteSaga(action: ReturnType<typeof deleteDevPhase>): any {
	try {
		yield put(setIsLoading(true))
		const response = yield call(apiDelete, action.payload.dev_phase_id);
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
		const url = `http://localhost:8080/dev-phase/delete-multiple?${params}`
		return axios.put(url);
	} catch (error) {
		return error
	}
};

function* deleteBatchSaga(action: ReturnType<typeof deleteDevPhaseBatch>): any {
	try {
		yield put(setIsLoading(true))
		const response = yield call(apiBatchDelete, action.payload.batchId);
		yield call(validate, response);
	} catch (error) {
		yield call(catchErr, error);
	}
}

export const deleteDevPhaseBatch = createAction<{
	batchId: Set<GridRowId>;
}>("devPhase/deleteRolesBatch");

export function* devPhaseSagaDeleteBatch() {
	yield takeEvery(deleteDevPhaseBatch.type, deleteBatchSaga);
}

// VALIDATE THE RESPONSE
function* validate(res: any) {
	if (res?.request?.status === 200) {
		yield put(getDevPhaseFetch());
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
	yield put(getDevPhaseFetch());
	yield put(
		setMessage({
			message: err?.response?.data,
			severity: "error",
		})
	);
}
