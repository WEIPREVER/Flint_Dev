import React, {Component, useEffect, useState} from 'react';
import './ExpenseReport.css';
import { FormGroup } from 'reactstrap';
import { Link } from 'react-router-dom';
import ExpenseReportService from "../api/ExpenseReportService";
import ExpenseDataService from "../api/ExpenseDataService";
import AuthenticationService from "../services/AuthenticationService";
import moment from "moment";
import {Dialog, DialogActions, DialogContent, TextField} from "@mui/material";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContentText from "@mui/material/DialogContentText";
import Button from "@mui/material/Button";
import {Form, useFormik} from "formik";
import * as Yup from "yup";
import BudgetTabs from "./BudgetTabs";


function Formik(props: { children: (e?: (React.FormEvent<HTMLFormElement> | undefined)) => void }) {
    return null;
}

const ExpenseReport = (props) => {
    const [grabBudgets, setGrabBudgets] = useState([])
    const [message, setMessage] = useState(null)

    function deleteExpenseClicked(id, name) {
        let user = AuthenticationService.getUser()
        ExpenseDataService.deleteExpensesByUserAndId(user, id)
            .then(
                () => setMessage(`Successfully Deleted Expense: "${name}" (ID #${id})`)
            )
             refreshExpenses()
      }


      function updateExpenseClicked(id, name) {
        console.log(`Update Expense: "${name}" (ID #${id})`)
        props.navigate(`/expenseReport/${name}/${id}`)


      }


      function addExpenseClicked() {
        console.log(`Add a new Expense:`)
        props.navigate(`/expenseReport/addExpense`)
      }
    function setBudgetClicked() {
        console.log(`Set Budget`)
        props.navigate(`/expenseReport/setBudget`)
    }

      useEffect(() => {
          refreshExpenses()

      },[]);

      function refreshExpenses() {
        let user = AuthenticationService.getUser()
        ExpenseDataService.retrieveExpensesByUser(user)
            .then(response => {
              handleSuccessfulResponse(response)
            })
            .catch(error => console.log(error))
      }


      return (
          <div className={'expenseForm'}>
            <div className={'container'}>
              <h1 className={'mt-3'} style={{fontFamily: 'Helvetica Neue', fontWeight: 'bold', color: 'black'}}>
                {' '}
                Welcome to Your Budgeting Tool:
              </h1>
              <h4 className={'mt-3'} style={{fontFamily: 'Helvetica Neue', fontStyle: 'italic', color: 'black'}}>Add your
                expenses and stick to a pre-set budget.</h4>
              {message != null && <div className={"alert alert-success"}><b>{message}</b></div>}

              <div className={'row mt-3'}>
                  <BudgetTabs />

                <div className={'container'}>
              <span className={'col-sm'}>

      <button onClick={() => setBudgetClicked()} className={'alert alert-info'} style={{fontWeight: 'bold' }}>
        Set Budget
      </button>
              </span>
                  <span className={'col-sm'}>
                <button type={"button"} style={{marginRight: '16px', marginLeft: '16px', fontWeight: 'bold'}}
                        className={'alert alert-success'} onClick={() => addExpenseClicked()}>Add Expense</button>

              </span>
                  <span className={'col-sm'}>
                <button type={"button"} style={{marginRight: '16px', marginLeft: '16px', fontWeight: 'bold'}}
                        className={'alert alert-success'} onClick={() => refreshExpenses()}>Generate Report</button>

              </span>
                  <div className={"container"}>
                    <table className={'table'}>
                      <thead>
                      <tr className={"tableHeader"}>
                        <th>Name:</th>
                        <th>Amount:</th>
                        <th>Category:</th>
                        <th> Date:</th>

                      </tr>
                      </thead>
                      <tbody>
                      {
                        grabBudgets.map(
                            expense =>
                                <tr key={expense.id}>
                                    {console.log(expense.nameOfExpense)}
                                  <td className={"tableData"}>{expense.nameOfExpense}</td>
                                  <td className={"tableData"}>${expense.amountSpent}</td>
                                  <td className={"tableData"}>{expense.category}</td>
                                  <td className={"tableData"}>{expense.dateOfExpense}</td>
                                  <td>

                                    <button type={"button"} style={{width: "250px"}} className={"btn btn-danger"}
                                            onClick={() => deleteExpenseClicked(expense.id, expense.nameOfExpense)}>Delete
                                    </button>
                                  </td>
                                  <td>
                                    <button type={"button"} style={{width: "250px"}} className={"btn btn-warning"}
                                            onClick={() => updateExpenseClicked(expense.id, expense.nameOfExpense)}>Update
                                    </button>
                                  </td>
                                </tr>
                        )
                      }

                      </tbody>
                    </table>

                  </div>
                </div>
              </div>
            </div>




          </div>
      )


      function retrieveBudgets() {
        let user = AuthenticationService.getUser();
        ExpenseReportService.executeExpenseReportService(user)
            .then(response => handleSuccessfulResponse(response))
            .catch(error => console.log(error))

      }

      function handleSuccessfulResponse(response) {
        setGrabBudgets(response.data)
      }
    }
;
export default ExpenseReport;

