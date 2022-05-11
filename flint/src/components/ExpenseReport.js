import React, {Component} from 'react';
import './ExpenseReport.css';
import { FormGroup } from 'reactstrap';
import { Link } from 'react-router-dom';
import ExpenseReportService from "../api/ExpenseReportService";
import ExpenseDataService from "../api/ExpenseDataService";
import AuthenticationService from "../services/AuthenticationService";
import moment from "moment";


class ExpenseReport extends Component {
  constructor(props){
    super(props)
    this.state = {
      grabBudgets: [],
      message:null,
      startingBudget:0.00,
      remainingBudget: 0.00,
      distributedBudget: 0.00
    }

    this.retrieveBudgets = this.retrieveBudgets.bind(this)
    this.handleSuccessfulResponse = this.handleSuccessfulResponse.bind(this)
    this.deleteExpenseClicked = this.deleteExpenseClicked.bind(this)
    this.updateExpenseClicked = this.updateExpenseClicked.bind(this)
    this.refreshExpenses = this.refreshExpenses.bind(this)

  }

   deleteExpenseClicked(id,name){
    let user = AuthenticationService.getUser()
     ExpenseDataService.deleteExpensesByUserAndId(user, id)
       .then (
       response => {
         this.setState({message: `Successfully Deleted Expense: "${name}" (ID #${id})`})
         this.refreshExpenses();
       })

  }

  updateExpenseClicked(id,name){
    console.log(`Update Expense: "${name}" (ID #${id})`)
    this.props.navigate(`/expenseReport/${name}/${id}`)


  }

  addExpenseClicked(){
    console.log(`Add a new Expense:`)
    this.props.navigate(`/expenseReport/addExpense`)
  }

  componentDidMount(){
    this.refreshExpenses()
    console.log(this.state)
  }

  refreshExpenses(){
    let user = AuthenticationService.getUser()
    ExpenseDataService.retrieveExpensesByUser(user)
      .then(response => {this.handleSuccessfulResponse(response)})
      .catch(error => console.log(error))
  }

  render(){


    return (
      <div className={'expenseForm'}>
        <div className={'container'}>
          <h1 className={'mt-3'} style={{ fontFamily: 'Helvetica Neue', fontWeight: 'bold', color: 'black' }}>
            {' '}
            Welcome to Your Budgeting Tool:
          </h1>
          <h4 className={'mt-3'} style={{ fontFamily: 'Helvetica Neue', fontStyle: 'italic', color: 'black' }}>Add your expenses and stick to a pre-set budget.</h4>
          {this.state.message && <div className={"alert alert-success"}><b>{this.state.message}</b></div>}

          <div className={'row mt-3'}>


            <div className={'container'} >
              <span className={'col-sm'}>
                <button className={'alert alert-info'} style={{fontWeight: 'bold' }} onClick={this.retrieveBudgets}>
                  Set Budget
                </button>
              </span>
              <span className={'col-sm'}>
                <button type={"button"} style={{ marginRight: '16px',  marginLeft: '16px', fontWeight: 'bold' }} className={'alert alert-success'} onClick={() => this.addExpenseClicked()}>Add Expense</button>

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
                  this.state.grabBudgets.map (
                    expense =>
                      <tr key = {expense.id}>
                        <td className={"tableData"}>{expense.nameOfExpense}</td>
                        <td className={"tableData"}>${expense.amountSpent}</td>
                        <td className={"tableData"}>{expense.category}</td>
                        <td className={"tableData"}>{expense.dateOfExpense}</td>
                        <td><button type={"button"} style={{width:"250px"}}  className={"btn btn-danger"} onClick={() => this.deleteExpenseClicked(expense.id, expense.nameOfExpense)}>Delete</button></td>
                        <td><button type={"button"} style={{width:"250px"}} className={"btn btn-warning"} onClick={() => this.updateExpenseClicked(expense.id, expense.nameOfExpense)}>Update</button></td>
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
    );
  }


  retrieveBudgets(){
    let user = AuthenticationService.getUser();
    ExpenseReportService.executeExpenseReportService(user)
      .then(response => this.handleSuccessfulResponse(response))
      .catch(error => console.log(error))

  }
  handleSuccessfulResponse(response){
    this.setState({grabBudgets:response.data})
  }

}
;
export default ExpenseReport;

