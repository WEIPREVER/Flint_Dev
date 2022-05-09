import React, {Component} from 'react';
import './ExpenseReport.css';
import { FormGroup } from 'reactstrap';
import { Link } from 'react-router-dom';
import ExpenseReportService from "../api/ExpenseReportService";
import ExpenseDataService from "../api/ExpenseDataService";
import AuthenticationService from "../services/AuthenticationService";


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

  // componentDidMount(){
  //   this.refreshExpenses()
  //   console.log(this.state)
  // }

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
            Welcome to Your Expense Report:
          </h1>
          {this.state.message && <div className={"alert alert-success"}><b>{this.state.message}</b></div>
          }          <div className={'row mt-3'}>
            <div className={'col-sm'}>
              <div className={'alert alert-secondary'}>
                <span style={{fontWeight:'bold'}}>Starting Budget: $3000 </span>
              </div>            </div>
            <div className={'col-sm'}>
              <div className={'alert alert-success'}>
                <span style={{fontWeight: 'bold'}}>Remaining Budget: $1000</span>
              </div>
            </div>
            <div className={'col-sm'}>
              <div className={'alert alert-primary'}>
                <span style={{fontWeight:'bold'}}> Distributed Budget: $2000 </span>
              </div>
            </div>
            <form className="row g-3">
              <FormGroup>
                <label htmlFor={'category'}>
                  <h3>Name:</h3>
                </label>
                <input
                  name={'name'}
                  id={'name'}
                  className="form-control form-control-lg mb-3"
                  type="text"
                  placeholder="Add Name of Expense..."
                  aria-label=".form-control-lg"
                />
              </FormGroup>

              <FormGroup>
                <label htmlFor={'category'}>
                  <h3>Category:</h3>
                </label>
                <select name={'category'} id={'category'} className="form-select form-select-lg mb-3" aria-label="Default select example">
                  <option defaultValue>"Student Loans 🤡"</option>
                  <option value="1">Shopping 🤑</option>
                  <option value="2">Vacation 🛳</option>
                  <option value="3">Car Payment 🚗 </option>
                </select>
              </FormGroup>

              <FormGroup>
                <label htmlFor={'dateOfExpense'}>
                  <h3>Date:</h3>
                </label>

              </FormGroup>
              <FormGroup>
                <span className={'col-sm'}>
                  <button type="submit" className={'alert alert-primary'} style={{ marginRight: '16px', fontWeight: 'bold' }}>
                    Submit
                  </button>
                </span>

                <span className={'col-sm'}>
                  <Link to={'/'}>
                    <button type="cancel" className={'alert alert-warning'} style={{ marginRight: '16px', fontWeight: 'bold' }}>
                      Cancel
                    </button>
                    </Link>
                </span>


              </FormGroup>
            </form>
            <div className={'container'} >
              <span className={'col-sm'}>
                <button className={'alert alert-success'} style={{ fontWeight: 'bold' }} onClick={this.retrieveBudgets}>
                  Generate my Report
                </button>
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
                        <td className={"tableData"}>{expense.categoryId}</td>
                        <td className={"tableData"}>{expense.dateOfExpense}</td>
                        <td><button type={"button"} className={"btn btn-danger"} onClick={() => this.deleteExpenseClicked(expense.id, expense.nameOfExpense)}>Delete</button></td>
                        <td><button type={"button"} className={"btn btn-warning"} onClick={() => this.updateExpenseClicked(expense.id, expense.nameOfExpense)}>Update</button></td>
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

