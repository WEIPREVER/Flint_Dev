import {createSlice} from "@reduxjs/toolkit";
import {Grid, TextField, Typography} from "@mui/material";
import React from "react";

const initialState = {
    startingBudget:0.00,
    remainingBudget:0.00,
    distributedBudget:0.00
}

let budgetSlice = createSlice({
    name:"budget",
    initialState,
    reducers:{
        setter: function (state,action){
            state.startingBudget = state.startingBudget + action.payload
        },
        calculateRemainingBudget: function (state,action){
            state.remainingBudget = state.remainingBudget - action.payload
        },
        calculateDistributedBudget: function (state,action){
            state.distributedBudget = state.distributedBudget + action.payload
        }
    }

})

export const {setter, calculateRemainingBudget, calculateDistributedBudget} = budgetSlice.actions;
export default budgetSlice.reducer;