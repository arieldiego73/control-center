import { call, put, takeEvery } from "redux-saga/effects";
import { createAction } from "@reduxjs/toolkit";
import { GridRowId, GridValidRowModel } from "@mui/x-data-grid";
import axios from "axios";
import { getSectionFetch, getSectionSuccess, setMessage, setIsLoading } from "../state/sectionState";

// GET ALL
function* fetchSection(): any {
	const section = yield call(() =>
		axios.get("http://localhost:8080/section/all").then((res) => res.data)
	);
	yield put(getSectionSuccess(section));
}

export function* sectionSaga() {
	yield takeEvery("section/getSectionFetch", fetchSection);
}





// UPDATE
const apiUpdate = async (
	section_id: number,
	section_name: string,
	section_sh_name: string,
	dept_id: number,
	section_desc: string
): Promise<any> => {
	try {
		const url = "http://localhost:8080/section/edit/" + section_id;
		return axios.put(url, {
			section_name,
			section_sh_name,
			dept_id,
			section_desc
		});
	} catch (error) {
		return error
	}
};

export const updateSection = createAction<{
	sectionData: GridValidRowModel;
}>("section/updateSection");

export function* sectionSagaUpdate() {
	yield takeEvery(updateSection.type, updateSaga);
}

function* updateSaga(action: ReturnType<typeof updateSection>): any {
	try {
		yield put(setIsLoading(true))
		const response = yield call(
			apiUpdate,
			action.payload.sectionData.section_id,
			action.payload.sectionData.section_name,
			action.payload.sectionData.section_sh_name,
			action.payload.sectionData.dept_id,
			action.payload.sectionData.section_desc
		);
		yield call(validate, response);
	} catch (error) {
		yield call(catchErr, error);
	}
}





// ADD
const apiAdd = async (
	section_name: string,
	section_sh_name: string,
	dept_id: number,
	section_desc: string,
	): Promise<any> => {
	try {
		const url = "http://localhost:8080/section/add";
		return axios.post(url, {
			section_name,
			section_sh_name,
			dept_id,
			section_desc
		});
	} catch (error) {
		return error
	}
};

export const addSection = createAction<{
	sectionData: GridValidRowModel;
}>("section/addSection");

export function* sectionSagaAdd() {
	yield takeEvery(addSection.type, addSaga);
}

function* addSaga(action: ReturnType<typeof addSection>): any {
	try {
		yield put(setIsLoading(true))
		const response = yield call(
			apiAdd,
			action.payload.sectionData.section_name,
			action.payload.sectionData.section_sh_name,
			action.payload.sectionData.dept_id,
			action.payload.sectionData.section_desc,
		);
		yield call(validate, response);
	} catch (error) {
		yield call(catchErr, error);
	}
}





// DELETE
const apiDelete = async (section_id: number): Promise<any> => {
	try {
		const url = "http://localhost:8080/section/delete/" + section_id;
		return axios.put(url);
	} catch (error) {
		return error
	}
};

export const deleteSection = createAction<{
	section_id: number;
}>("section/deleteSection");

export function* sectionSagaDelete() {
	yield takeEvery(deleteSection.type, deleteSaga);
}

function* deleteSaga(action: ReturnType<typeof deleteSection>): any {
	try {
		yield put(setIsLoading(true))
		const response = yield call(apiDelete, action.payload.section_id);
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
		const url = `http://localhost:8080/section/delete-multiple?${params}`
		return axios.put(url);
	} catch (error) {
		return error;
	}
};

function* deleteBatchSaga(action: ReturnType<typeof deleteSectionBatch>): any {
	try {
		yield put(setIsLoading(true))
		const response = yield call(apiBatchDelete, action.payload.batchId);
		yield call(validate, response);
	} catch (error) {
		yield call(catchErr, error);
	}
}

export const deleteSectionBatch = createAction<{
	batchId: Set<GridRowId>;
}>("section/deleteSectionBatch");

export function* sectionSagaDeleteBatch() {
	yield takeEvery(deleteSectionBatch.type, deleteBatchSaga);
}



// VALIDATE THE RESPONSE
function* validate(res: any) {
	if (res?.request?.status === 200) {
		yield put(getSectionFetch());
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
	yield put(getSectionFetch());
	yield put(
		setMessage({
			message: err?.response?.data,
			severity: "error",
		})
	);
}