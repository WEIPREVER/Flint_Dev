import {configureStore} from "@reduxjs/toolkit";
import budgetTabsReducer from "./budgetSlice"
import rootReducer from "./rootReducer";

const store = configureStore({
    reducer: rootReducer
})
export default store;