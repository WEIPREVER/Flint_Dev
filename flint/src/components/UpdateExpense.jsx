import React, {Component, useEffect, useState} from 'react';
import {Formik, Form, Field, ErrorMessage, useFormik} from 'formik';
import './UpdateExpense.css'
import moment from "moment";
import AutocompleteCategory from "./AutocompleteCategory";
import {Alert, Typography, Grid, Container, TextField, Autocomplete, Stack} from "@mui/material";
import {makeStyles} from "material-ui-core/styles";
import enLocale from 'date-fns/locale/en-US';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import * as Yup from "yup";
import AuthenticationService from "../services/AuthenticationService";
import ExpenseDataService from "../api/ExpenseDataService";
import DateTimePicker from "./Date";
import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFns";

const useStyles = makeStyles((theme) => ({
    formWrapper: {
        marginTop: theme.spacing(5),
        marginBottom: theme.spacing(8),
    },
}));

const UpdateExpense = (props) => {
    const [id, setId] = useState(props.params.id)
    const [nameOfExpense, setNameOfExpense] = useState(props.params.name)
    const [amount, setAmount] = useState("")
    const [date, setDate] = useState(Date)
    const [values, setValues] = useState([])
    const [category, setNewCategory] = useState("")
    const [expense,setExpense] = useState({})

    const user = AuthenticationService.getUser();
    const classes = useStyles();



    useEffect(() => {
        ExpenseDataService.retrieveCategoriesByUser(user)
            .then((response) => setValues(response.data.map(item => item.name)))
    }, [] )

const formik = useFormik({
    initialValues: {
        amount: '',
        nameOfExpense: nameOfExpense
    },
    validationSchema: Yup.object().shape({
        nameOfExpense: Yup.string()
            .matches(/^[a-zA-Z0-9\s]*$/)
            .required('Required'),

        amount: Yup.string()
            .matches(/^[0-9]+\.[0-9]{2}$/)
            .typeError('Please enter a monetary amount')
            .required('Required'),
    }),
    onSubmit: (values) => {
        setExpense({
            id:id,
            user:user,
            amountSpent:values.amount,
            nameOfExpense:values.nameOfExpense,
            dateOfExpense:moment(date).format("YYYY-MM-DD"),
            category:category
        })
        ExpenseDataService.updateExpense(user, id, {
            id:id,
            user:user,
            amountSpent:values.amount,
            nameOfExpense:values.nameOfExpense,
            dateOfExpense:moment(date).format("YYYY-MM-DD"),
            category:category
        })
            .then(
                () => props.navigate(`/expenseReport`)

            )
            .catch((error) => console.log(error))
    }
})
    console.log(expense)


  return (

      <Grid container className={'box-container'}>
          <Grid item xs={6}>
              <h1 className={"updateExpense"}> Update Expense: "{nameOfExpense}" (ID: {id}) </h1>
          </Grid>
          <Grid item xs={6}>
              <Container maxWidth={'md'}>
                  <div className={classes.formWrapper}>
                      <Formik>
                          <Form onSubmit={formik.handleSubmit}>
                              <Grid container spacing={2}>
                                  <Grid item xs={12}>
                                      <Typography>
                                          Name of Expense:
                                      </Typography>
                                      <TextField
                                          id={"nameOfExpense"}
                                          name={"nameOfExpense"}
                                          type={"text"}
                                          placeholder={"Name of Expense"}
                                          onChange={formik.handleChange}
                                          value={formik.values.nameOfExpense}
                                      />
                                      {formik.errors.nameOfExpense ? <p style={{color:"red"}}>Required: Name of Expense must contain only letters, numbers, and spaces.</p> : null}
                                  </Grid>
                                  <Grid item xs={12}>
                                      <Typography>
                                          Date of Expense:
                                      </Typography>
                                      <LocalizationProvider dateAdapter={AdapterDateFns}>
                                          <DatePicker
                                              label="Basic example"
                                              value={date}
                                              onChange={(newValue) => {
                                                  setDate(newValue);
                                              }}
                                              renderInput={(params) => <TextField {...params} />}
                                          />
                                      </LocalizationProvider>
                                  </Grid>
                                  <Grid item xs={12}>
                                      <Typography>
                                          Amount Spent:
                                      </Typography>
                                      <TextField
                                          id={"amount"}
                                          name={"amount"}
                                          type={"text"}
                                          placeholder={"Amount Spent"}
                                          onChange={formik.handleChange}
                                          value={formik.values.amount}
                                      />
                                      {formik.errors.amount ? <p style={{color:"red"}}>Amount must match the following format: "0.00"</p> : null}

                                  </Grid>

                                  <Grid item xs={12}>
                                      <Typography>
                                          Category:
                                      </Typography>
                                      <Stack spacings={2} width='300px'>
                                          <Autocomplete
                                              selectOnFocus
                                              clearOnBlur
                                              handleHomeEndKeys
                                              id="category-dropdown"
                                              options={values}
                                              sx={{ width: 300 }}
                                              renderInput={(params) => <TextField {...params} label=" "/>}
                                              category={category}
                                              onChange={(event: any, newInput: string | null ) => setNewCategory(newInput)}
                                          />

                                      </Stack>
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
export default UpdateExpense;