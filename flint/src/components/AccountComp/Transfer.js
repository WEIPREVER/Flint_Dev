import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'
import AuthenticationService from '../../services/AuthenticationService';

class Transfer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
     accounts: [],
    };
    this.handleChange = this.handleChange.bind(this);
     this.handleSubmit = this.handleSubmit.bind(this);
  }

  async componentDidMount() {
    const user = AuthenticationService.getUser();
    const response = await fetch('users/' + user + '/bankaccount');
    const body = await response.json();
    this.setState({ accounts: body });
    console.log(body);
  }

  

  handleSubmit(event) {
    event.preventDefault();
    let user = AuthenticationService.getUser();
    axios.post('/users/' + user + '/transfer', {
      id: 0,
      secondaryAccountNumber: this.state.toAccountNumber,
      primaryAccountNumber: this.state.fromAccountNumber,
      transactionAmount: this.state.amount
    })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
    
    window.location.href = "/bankaccount";
  }
  
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
   }

  render() {
    return (
      <>
        <div className="container-fluid text-center">
          <div className="row content">
            <div className="col-sm-2 sidenav">
              <Link to="/bankaccount">
                <button className="btn-sm btn-danger" style={{ margin: 5 }}>
                  Back
                </button>
              </Link>
            </div>
            <div className="col-sm-8 text-left">
              <h1>Transfer Funds</h1>
              <div>
                <h6>Transfer</h6>
                <form className="form-inline">
                  <div className="input-group mb-3">
                    <div className="input-group-prepend">
                      <span className="input-group-text" id="inputGroup-sizing-default">
                        From Account
                      </span>
                    </div>
                    <select name="fromAccountNumber"
                      value={this.state.fromAccountNumber}
                      onChange={this.handleChange}>
                      <option>Select an Account</option>
                      {this.state.accounts.map(bankAccount => (
                        <option
                          value={bankAccount.id}
                          key={bankAccount.id}>
                          {bankAccount.accountName}
                           </option>
                      ))} 
                    </select>
                    
                  </div>
                  <div className="input-group mb-3">
                    <div className="input-group-prepend">
                      <span className="input-group-text" id="inputGroup-sizing-default ">
                        To Account
                      </span>
                    </div>
                    <select name="toAccountNumber"
                      value={this.state.toAccountNumber}
                      onChange={this.handleChange}>
                      <option>Select an Account</option>
                      {this.state.accounts.map(bankAccount => (
                        <option
                        value={bankAccount.id}
                          key={bankAccount.id}>
                          {bankAccount.accountName}
                           </option>
                      ))} 
                    </select>
                    
                  </div>
                  <div className="input-group mb-3">
                    <div className="input-group-prepend ">
                      <span className="input-group-text" id="inputGroup-sizing-default">
                        Amount
                      </span>
                    </div>
                    <input
                      type="text"
                      name="amount"
                      value={this.state.amount || ''}
                       onChange = { this.handleChange}
                      className="form-control"
                      aria-label="Sizing example input"
                      aria-describedby="inputGroup-sizing-default"
                    ></input>
                  </div>
                  <button type="submit" onClick={this.handleSubmit} className="btn btn-danger mb-2">
                    Submit
                  </button>
                </form>
              </div>
              <hr></hr>
              <h3></h3>
              <p></p>
            </div>
            <div className="col-sm-2 sidenav">
              <div className="well">
                <p></p>
              </div>
              <div className="well">
                <p></p>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
export default Transfer;
