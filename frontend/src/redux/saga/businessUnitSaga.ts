import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import { createAction } from "@reduxjs/toolkit";
import { GridRowId, GridValidRowModel } from "@mui/x-data-grid";
import { getBusinessUnitSuccess } from "../state/businessUnitState";

function* fetchBusinessUnit(): any {
	const businessUnit = yield call(() =>
		fetch("http://localhost:8080/business-unit/all").then((res) => res.json())
	);
	yield put(getBusinessUnitSuccess(businessUnit));
}

const apiUpdate = async (
	business_unit_id: number,
	business_unit_name: string,
	business_unit_sh_name: string
): Promise<any> => {
	try {
		const url = "http://localhost:8080/business-unit/edit/" + business_unit_id;
		const response = await fetch(url, {
			method: "PUT",
			body: JSON.stringify({ business_unit_name, business_unit_sh_name }),
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
	business_unit_name: string,
	business_unit_sh_name: string,
): Promise<any> => {
	try {
		const url = "http://localhost:8080/dev-phase/add";
		const response = await fetch(url, {
			method: "POST",
			body: JSON.stringify({
                business_unit_name,
                business_unit_sh_name,
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

const apiDelete = async (business_unit_id: number): Promise<any> => {
	try {
		const url = "http://localhost:8080/business-unit/delete/" + business_unit_id;
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
			`http://localhost:8080/business-unit/delete-multiple?${params}`,
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

function* updateSaga(action: ReturnType<typeof updateBusinessUnit>): any {
	try {
		const businessUnit = yield call(
			apiUpdate,
			action.payload.businessUnitData.business_unit_id,
			action.payload.businessUnitData.business_unit_name,
			action.payload.businessUnitData.business_unit_sh_name,
		);
		if (businessUnit) yield put(getBusinessUnitSuccess(businessUnit));
	} catch (error) {
		console.log(error);
	}
}

function* addSaga(action: ReturnType<typeof addBusinessUnit>): any {
	try {
		const businessUnit = yield call(
			apiAdd,
            action.payload.businessUnitData.business_unit_name,
			action.payload.businessUnitData.business_unit_sh_name,
		);
		if (businessUnit) yield put(getBusinessUnitSuccess(businessUnit));
	} catch (error) {
		console.log(error);
	}
}

function* deleteSaga(action: ReturnType<typeof deleteBusinessUnit>): any {
	try {
		const businessUnit = yield call(apiDelete, action.payload.business_unit_id);
		if (businessUnit) yield put(getBusinessUnitSuccess(businessUnit));
	} catch (error) {
		console.log(error);
	}
}

function* deleteBatchSaga(action: ReturnType<typeof deleteBusinessUnitBatch>): any {
	try {
		const businessUnit = yield call(apiBatchDelete, action.payload.batchId);
		if (businessUnit) yield put(getBusinessUnitSuccess(businessUnit));
	} catch (error) {
		console.log(error);
	}
}

export const updateBusinessUnit = createAction<{
	businessUnitData: GridValidRowModel;
}>("businessUnit/updateBusinessUnit");

export const addBusinessUnit = createAction<{
	businessUnitData: GridValidRowModel;
}>("businessUnit/addBusinessUnit");

export const deleteBusinessUnit = createAction<{
	business_unit_id: number;
}>("businessUnit/deleteBusinessUnit");

export const deleteBusinessUnitBatch = createAction<{
	batchId: Set<GridRowId>;
}>("businessUnit/deleteBusinessUnitBatch");

export function* businessUnitSagaUpdate() {
	yield takeLatest(updateBusinessUnit.type, updateSaga);
}

export function* businessUnitSagaAdd() {
	yield takeLatest(addBusinessUnit.type, addSaga);
}

export function* businessUnitSagaDelete() {
	yield takeLatest(deleteBusinessUnit.type, deleteSaga);
}

export function* businessUnitSagaDeleteBatch() {
	yield takeLatest(deleteBusinessUnitBatch.type, deleteBatchSaga);
}

export function* businessUnitSaga() {
	yield takeEvery("businessUnit/getBusinessUnitFetch", fetchBusinessUnit);
}
