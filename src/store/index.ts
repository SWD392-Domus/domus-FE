import { Action, AnyAction, Reducer, combineReducers } from "redux";

import { EnhancedStore, configureStore } from "@reduxjs/toolkit";

// Define the Reducers that will always be present in the application
const staticReducers = {};

// Extend the ToolkitStore type to include asyncReducers property
interface ToolkitStoreExtended<S = any, A extends Action = AnyAction>
    extends EnhancedStore<S, A> {
    asyncReducers?: Record<number, Reducer<any>>;
}
const store: ToolkitStoreExtended = configureStore({
    reducer: createReducer(),
});

// Add a dictionary to keep track of the registered async reducers
store.asyncReducers = {};

// This function adds the async reducer, and creates a new combined reducer
export const injectReducer = (key: any, asyncReducer: Reducer<any>) => {
    if (!store.asyncReducers) {
        store.asyncReducers = {};
    }
    store.asyncReducers[key] = asyncReducer;
    store.replaceReducer(createReducer(store.asyncReducers));
    return asyncReducer;
};

function createReducer(asyncReducers = {}) {
    if (Object.keys(asyncReducers).length === 0) {
        return (state: any) => state;
    } else {
        return combineReducers({
            ...staticReducers,
            ...asyncReducers,
        });
    }
}

export default store;
