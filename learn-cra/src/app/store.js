import { applyMiddleware, createStore, combineReducers } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';
import { all, call, takeLatest, put } from 'redux-saga/effects';
import * as commonReducers from './reducers.js';
console.log('Gagan commonReducers', commonReducers);
const reducers = {
	...(commonReducers || {}),
};

console.log('Gagan reducers', reducers);
function* noop() {}

export function* actionwatcher() {
	yield takeLatest('TEST_SAGAS', noop);
}
const generateRootSaga = (actWatcher) =>
	function* rootSaga() {
		const callArray = [call(actionwatcher)];
		if (actWatcher) {
			callArray.push(call(actWatcher));
		}
		yield all(callArray);
	};

function withDevTools(mws) {
	const composeEnhancers = composeWithDevTools({ trace: true });
	return composeEnhancers(mws);
}
export const sagaMiddleware = createSagaMiddleware();

export default function configureStore(options) {
	const middlewares = [sagaMiddleware];
	const middlewareEnhancer = applyMiddleware(...middlewares);
	const rootReducer = combineReducers({
		...reducers,
		...(options?.reducers || {}),
	});

	const store = createStore(
		rootReducer,
		options?.initialState,
		withDevTools(middlewareEnhancer)
	);
	sagaMiddleware.run(generateRootSaga(options?.sagaActionwatcher));

	return store;
}
