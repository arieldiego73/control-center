import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import { createAction } from "@reduxjs/toolkit";
import { GridRowId, GridValidRowModel } from "@mui/x-data-grid";
import { getDevPhaseFetch, getDevPhaseSuccess, setErrorMessage } from "../state/devPhaseState";

// GET ALL
function* fetchDevPhase(): any {
	const devPhase = yield call(() =>
		fetch("http://localhost:8080/dev-phase/all").then((res) => res.json())
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
		const response = await fetch(url, {
			method: "PUT",
			body: JSON.stringify({ dev_phase_name, dev_phase_sh_name }),
			headers: {
				"Content-Type": "application/json",
			},
		});
		return response;
	} catch (error) {
		console.error("An error occurred:", error);
	}
};

export const updateDevPhase = createAction<{
	devPhaseData: GridValidRowModel;
}>("devPhase/updateDevPhase");

export function* devPhaseSagaUpdate() {
	yield takeLatest(updateDevPhase.type, updateSaga);
}

function* updateSaga(action: ReturnType<typeof updateDevPhase>): any {
	try {
		const response = yield call(
			apiUpdate,
			action.payload.devPhaseData.dev_phase_id,
			action.payload.devPhaseData.dev_phase_name,
			action.payload.devPhaseData.dev_phase_sh_name,
		);
		if (response.ok) {
			yield put(getDevPhaseFetch());
		} else {
			yield put(setErrorMessage(response.text));
		}
	} catch (error) {
		console.log(error);
	}
}





// ADD
const apiAdd = async (
	dev_phase_name: string,
	dev_phase_sh_name: string,
): Promise<any> => {
	try {
		const url = "http://localhost:8080/dev-phase/add";
		const response = await fetch(url, {
			method: "POST",
			body: JSON.stringify({
				dev_phase_name,
				dev_phase_sh_name,
			}),
			headers: {
				"Content-Type": "application/json",
			},
		});
		return response;
	} catch (error) {
		console.error("An error occurred:", error);
	}
};

export const addDevPhase = createAction<{
	devPhaseData: GridValidRowModel;
}>("devPhase/addDevPhase");

export function* devPhaseSagaAdd() {
	yield takeLatest(addDevPhase.type, addSaga);
}

function* addSaga(action: ReturnType<typeof addDevPhase>): any {
	try {
		const response = yield call(
			apiAdd,
			action.payload.devPhaseData.dev_phase_name,
			action.payload.devPhaseData.dev_phase_sh_name
		);
		// if (position) yield put(getPositionSuccess(position));
		if (response.ok) {
			yield put(getDevPhaseFetch());
		} else {
			yield put(setErrorMessage(response.text));
		}
	} catch (error) {
		console.log(error);
	}
}





// DELETE
const apiDelete = async (dev_phase_id: number): Promise<any> => {
	try {
		const url = "http://localhost:8080/dev-phase/delete/" + dev_phase_id;
		const response = await fetch(url, {
			method: "PUT",
		});
		return response;
	} catch (error) {
		console.error("An error occurred:", error);
	}
};

export const deleteDevPhase = createAction<{
	dev_phase_id: number;
}>("devPhase/deleteDevPhase");

export function* devPhaseSagaDelete() {
	yield takeLatest(deleteDevPhase.type, deleteSaga);
}

function* deleteSaga(action: ReturnType<typeof deleteDevPhase>): any {
	try {
		const response = yield call(apiDelete, action.payload.dev_phase_id);
		if (response.ok) {
			yield put(getDevPhaseFetch());
		} else {
			yield put(setErrorMessage(response.text));
		}
	} catch (error) {
		console.log(error);
	}
}





// BATCH DELETE
const apiBatchDelete = async (batchId: Set<GridRowId>): Promise<any> => {
	try {
		const params = new URLSearchParams();
		batchId.forEach((id) => {
			params.append("ids", id.toString());
		});
		const response = await fetch(
			`http://localhost:8080/dev-phase/delete-multiple?${params}`,
			{
				method: "PUT",
			}
		).catch((error) => {
			console.log(error);
		});
		return response;
	} catch (error) {
		console.error("An error occurred:", error);
	}
};

function* deleteBatchSaga(action: ReturnType<typeof deleteDevPhaseBatch>): any {
	try {
		const response = yield call(apiBatchDelete, action.payload.batchId);
		if (response?.ok) {
			yield put(getDevPhaseFetch());
		} else {
			yield put(setErrorMessage(response?.text));
		}
	} catch (error) {
		console.log(error);
	}
}

export const deleteDevPhaseBatch = createAction<{
	batchId: Set<GridRowId>;
}>("devPhase/deleteRolesBatch");

export function* devPhaseSagaDeleteBatch() {
	yield takeLatest(deleteDevPhaseBatch.type, deleteBatchSaga);
}