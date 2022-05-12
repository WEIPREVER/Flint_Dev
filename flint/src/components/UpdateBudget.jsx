import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
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
import AuthenticationService from "../services/AuthenticationService";

const useStyles = makeStyles((theme) => ({
    formWrapper: {
        marginTop: theme.spacing(5),
        marginBottom: theme.spacing(8),
    },
}));

const UpdateBudget = (props) => {
    const [expense,setExpense] = useState({})


    const user = AuthenticationService.getUser();
    const classes = useStyles();

    const formik = useFormik({
        initialValues: {
            sb: '',
        },
        validationSchema: Yup.object().shape({
            sb: Yup.string()
                .matches(/^[0-9]+\.[0-9]{2}$/)
                .typeError('Please enter a monetary amount')
                .required('Required'),
        }),
        onSubmit: (values) => {
            setExpense({
                id:1,
                user:user,
                startBudget:values.sb,
            })
            console.log(values.sb)
            ExpenseDataService.updateStartBudget(user, 1, expense)

                .then(
                    () => props.navigate(`/expenseReport`)
                )
                .catch((error) => console.log(error))

        }
    })



    return (

        <Grid container className={'box-container'}>
            <Grid item xs={6}>
                <h1 className={"updateExpense"}> Set Starting Budget </h1>
            </Grid>
            <Grid item xs={6}>
                <Container maxWidth={'md'}>
                    <div className={classes.formWrapper}>
                        <Formik>
                            <Form onSubmit={formik.handleSubmit}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <Typography>
                                            Set Starting Budget:
                                        </Typography>
                                        <TextField
                                            id={"sb"}
                                            name={"sb"}
                                            type={"text"}
                                            placeholder={"Amount Spent"}
                                            onChange={formik.handleChange}
                                            value={formik.values.sb}
                                        />
                                        {formik.errors.sb ? <p style={{color:"red"}}>Amount must match the following format: "0.00"</p> : null}

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