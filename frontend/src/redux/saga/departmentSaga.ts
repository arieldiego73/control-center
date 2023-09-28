import { call, put, takeEvery } from "redux-saga/effects";
import { createAction } from "@reduxjs/toolkit";
import { GridRowId, GridValidRowModel } from "@mui/x-data-grid";
import axios from "axios";
import { getDepartmentFetch, getDepartmentSuccess, setIsLoading, setMessage } from "../state/departmentState";

// GET ALL
function* fetchDepartment(): any {
	const department = yield call(() =>
		axios.get("http://localhost:8080/department/all").then((res) => res.data)
	);
	yield put(getDepartmentSuccess(department));
}

export function* departmentSaga() {
	yield takeEvery("department/getDepartmentFetch", fetchDepartment);
}





// UPDATE
const apiUpdate = async (
	dept_id: number,
	dept_name: string,
	dept_sh_name: string,
	dept_desc: string
): Promise<any> => {
	try {
		const url = "http://localhost:8080/department/edit/" + dept_id;
		return axios.put(url, {
			dept_name,
			dept_sh_name,
			dept_desc
		});
	} catch (error) {
		return error
	}
};

export const updateDepartment = createAction<{
	departmentData: GridValidRowModel;
}>("department/updateDepartment");

export function* departmentSagaUpdate() {
	yield takeEvery(updateDepartment.type, updateSaga);
}

function* updateSaga(action: ReturnType<typeof updateDepartment>): any {
	try {
		yield put(setIsLoading(true))
		const response = yield call(
			apiUpdate,
			action.payload.departmentData.dept_id,
			action.payload.departmentData.dept_name,
			action.payload.departmentData.dept_sh_name,
			action.payload.departmentData.dept_desc,
		);
		yield call(validate, response);
	} catch (error) {
		yield call(catchErr, error);
	}
}





// ADD
const apiAdd = async (
	dept_name: string,
	dept_sh_name: string,
	dept_desc: string,
): Promise<any> => {
	try {
		const url = "http://localhost:8080/department/add";
		return axios.post(url, {
			dept_name,
			dept_sh_name,
			dept_desc,
		});
	} catch (error) {
		return error
	}
};

export const addDepartment = createAction<{
	departmentData: GridValidRowModel;
}>("department/addDepartment");

export function* departmentSagaAdd() {
	yield takeEvery(addDepartment.type, addSaga);
}

function* addSaga(action: ReturnType<typeof addDepartment>): any {
	try {
		yield put(setIsLoading(true))
		const response = yield call(
			apiAdd,
			action.payload.departmentData.dept_name,
			action.payload.departmentData.dept_sh_name,
			action.payload.departmentData.dept_desc,
		);
		yield call(validate, response);
	} catch (error) {
		yield call(catchErr, error);
	}
}





// DELETE
const apiDelete = async (dept_id: number): Promise<any> => {
	try {
		const url = "http://localhost:8080/department/delete/" + dept_id;
		return axios.put(url);
	} catch (error) {
		return error
	}
};

export const deleteDepartment = createAction<{
	dept_id: number;
}>("department/deleteDepartment");

export function* departmentSagaDelete() {
	yield takeEvery(deleteDepartment.type, deleteSaga);
}

function* deleteSaga(action: ReturnType<typeof deleteDepartment>): any {
	try {
		yield put(setIsLoading(true))
		const response = yield call(apiDelete, action.payload.dept_id);
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
		const url = `http://localhost:8080/department/delete-multiple?${params}`
		return axios.put(url);
	} catch (error) {
		return error;
	}
};

function* deleteBatchSaga(action: ReturnType<typeof deleteDepartmentBatch>): any {
	try {
		yield put(setIsLoading(true))
		const response = yield call(apiBatchDelete, action.payload.batchId);
		yield call(validate, response);
	} catch (error) {
		yield call(catchErr, error);
	}
}

export const deleteDepartmentBatch = createAction<{
	batchId: Set<GridRowId>;
}>("department/deleteDepartmentBatch");

export function* departmentSagaDeleteBatch() {
	yield takeEvery(deleteDepartmentBatch.type, deleteBatchSaga);
}



// VALIDATE THE RESPONSE
function* validate(res: any) {
	if (res?.request?.status === 200) {
		yield put(getDepartmentFetch());
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
	yield put(getDepartmentFetch());
	yield put(
		setMessage({
			message: err?.response?.data,
			severity: "error",
		})
	);
}