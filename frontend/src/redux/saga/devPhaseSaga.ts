import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import { getRolesSuccess } from "../state/roleState";
import { createAction } from "@reduxjs/toolkit";
import { GridRowId, GridValidRowModel } from "@mui/x-data-grid";
import { getDevPhaseSuccess } from "../state/devPhaseState";

function* fetchDevPhase(): any {
	const devPhase = yield call(() =>
		fetch("http://localhost:8080/dev-phase/all").then((res) => res.json())
	);
	yield put(getDevPhaseSuccess(devPhase));
}

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

const apiDelete = async (dev_phase_id: number): Promise<any> => {
	try {
		const url = "http://localhost:8080/dev-phase/delete/" + dev_phase_id;
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

		if (response?.ok) {
			const data = await response.json();
			return data;
		} else {
			return null;
		}
	} catch (error) {
		console.error("An error occurred:", error);
	}
};

function* updateSaga(action: ReturnType<typeof updateDevPhase>): any {
	try {
		const devPhase = yield call(
			apiUpdate,
			action.payload.devPhaseData.dev_phase_id,
			action.payload.devPhaseData.dev_phase_name,
			action.payload.devPhaseData.dev_phase_sh_name,
		);
		if (devPhase) yield put(getDevPhaseSuccess(devPhase));
	} catch (error) {
		console.log(error);
	}
}

function* addSaga(action: ReturnType<typeof addDevPhase>): any {
	try {
		const devPhase = yield call(
			apiAdd,
			action.payload.devPhaseData.dev_phase_name,
			action.payload.devPhaseData.dev_phase_sh_name
		);
		if (devPhase) yield put(getDevPhaseSuccess(devPhase));
	} catch (error) {
		console.log(error);
	}
}

function* deleteSaga(action: ReturnType<typeof deleteDevPhase>): any {
	try {
		const devPhase = yield call(apiDelete, action.payload.dev_phase_id);
		if (devPhase) yield put(getDevPhaseSuccess(devPhase));
	} catch (error) {
		console.log(error);
	}
}

function* deleteBatchSaga(action: ReturnType<typeof deleteDevPhaseBatch>): any {
	try {
		const devPhase = yield call(apiBatchDelete, action.payload.batchId);
		if (devPhase) yield put(getDevPhaseSuccess(devPhase));
	} catch (error) {
		console.log(error);
	}
}

export const updateDevPhase = createAction<{
	devPhaseData: GridValidRowModel;
}>("devPhase/updateDevPhase");

export const addDevPhase = createAction<{
	devPhaseData: GridValidRowModel;
}>("devPhase/addDevPhase");

export const deleteDevPhase = createAction<{
	dev_phase_id: number;
}>("devPhase/deleteDevPhase");

export const deleteDevPhaseBatch = createAction<{
	batchId: Set<GridRowId>;
}>("roles/deleteRolesBatch");

export function* devPhaseSagaUpdate() {
	yield takeLatest(updateDevPhase.type, updateSaga);
}

export function* devPhaseSagaAdd() {
	yield takeLatest(addDevPhase.type, addSaga);
}

export function* devPhaseSagaDelete() {
	yield takeLatest(deleteDevPhase.type, deleteSaga);
}

export function* devPhaseSagaDeleteBatch() {
	yield takeLatest(deleteDevPhaseBatch.type, deleteBatchSaga);
}

export function* devPhaseSaga() {
	yield takeEvery("devPhase/getDevPhaseFetch", fetchDevPhase);
}
