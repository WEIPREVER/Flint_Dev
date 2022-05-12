import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {setter, calculateRemainingBudget, calculateDistributedBudget} from "./budgetSlice"
import Button from "@mui/material/Button";
import {
    Autocomplete,
    Container,
    Dialog,
    DialogActions,
    DialogContent,
    Grid,
    Stack,
    TextField,
    Typography
} from "@mui/material";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContentText from "@mui/material/DialogContentText";
import {Form, Formik, useFormik} from "formik";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFns";
import {DatePicker} from "@mui/x-date-pickers/DatePicker";
import * as Yup from "yup";
import moment from "moment";
import ExpenseDataService from "../api/ExpenseDataService";
import {makeStyles} from "material-ui-core/styles";

const useStyles = makeStyles((theme) => ({
    formWrapper: {
        marginTop: theme.spacing(5),
        marginBottom: theme.spacing(8),
    },
}));

const UpdateBudget = (props) => {
    let dispatch = useDispatch();
    let budgetState = useSelector((state)=> {
        return state["budget"];
    })
    let startingBudget = budgetState.startingBudget;
    let remainingBudget = budgetState.remainingBudget;
    let distributedBudget = budgetState.distributedBudget;

    const formik = useFormik({
        initialValues: {
            budget: 0.0,
        },
        validationSchema: Yup.object().shape({
            budget: Yup.string()
                .matches(/^[0-9]+\.[0-9]{2}$/)
                .typeError('Please enter a monetary amount')
                .required('Required'),
        }),
        onSubmit: (values) => {

            navigateAway()
        }
    })

    function navigateAway(){
        props.navigate(`/expenseReport`)
    }
    const classes = useStyles();

    return (
        <Grid container className={'box-container'}>
            <Grid item xs={6}>
                <h1 className={"updateExpense"}> Set a Budget </h1>
            </Grid>
            <Grid item xs={6}>
                <Container maxWidth={'md'}>
                    <div className={classes.formWrapper}>
                        <Formik>
                            <Form onSubmit={formik.handleSubmit}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <Typography>
                                           New Starting Budget Amount:
                                        </Typography>
                                        <TextField
                                            id={"budget"}
                                            name={"budget"}
                                            type={"text"}
                                            placeholder={"Name of Expense"}
                                            onChange={formik.handleChange}
                                            value={formik.values.budget}
                                        />
                                        {formik.errors.startingBudget ? <p style={{color:"red"}}>Required: Name of Expense must contain only letters, numbers, and spaces.</p> : null}
                                    </Grid>
                                    <Grid item xs={12}>
                                        <div className={"container"}  style={{textAlign:"right"}}>
                                            <button style={{ margin:"10%", width:"200px"}} type={"submit"} className={"btn btn-primary"}>Submit</button>
                                        </div>
                                    </Grid>
                                </Grid>
                            </Form>
                        </Formik>
                    </div>
                </Container>
            </Grid>
        </Grid>

    )
}
export default UpdateBudget;