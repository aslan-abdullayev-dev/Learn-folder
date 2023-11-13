import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import createSagaMiddleware from "redux-saga";

import ordersReducer from "./reducers/orders";
import waitersReducer from "./reducers/waiters";
import tablesReducer from "./reducers/tables";
import foodMenuReducer from "./reducers/foodMenu";
import { watcherSaga } from "./sagas/rootSaga";

const allReducers = combineReducers({
  orders: ordersReducer,
  waiters: waitersReducer,
  tables: tablesReducer,
  foodMenu: foodMenuReducer,
});

const sagaMiddleware = createSagaMiddleware();

export const store = createStore(allReducers, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(watcherSaga);


