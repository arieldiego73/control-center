// saga.ts
import { takeLatest, put, select } from 'redux-saga/effects';
import { RootState } from '../store/store';
import { showDialog } from '../state/dialogSlice';

function* checkForUnsavedChanges() {
    const isDirty: boolean = yield select((state: RootState) => state.pageAbandonmentPrevention.isDirty);

    if (isDirty) {
        yield put(showDialog());
    }
}

export function* watchNavigationEvents() {
  yield takeLatest('NAVIGATE', checkForUnsavedChanges);
}