import React, { useState, useEffect } from 'react';
import Chart from './Chart';
import { Link } from 'react-router-dom';
import UseContext from '../../UseContext'
import axios from 'axios';
import AuthenticationService from '../../services/AuthenticationService';
import { Table } from 'reactstrap';

class BankAccounts extends React.Component {
  state = {
    isLoading: true,
    bankAccounts: [],
    accountNumber: '',
  };

  
  
  
  async componentDidMount() {
    let user = AuthenticationService.getUser();
    const response = axios.get(`http://localhost:8080/users/${user}/bankaccount`)
    const body = await response.data;
    this.setState({ bankAccounts: body, isLoading: false });
  }

  

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  render() {
    const { bankAccounts, isLoading } = this.state;
    if (isLoading) {
      return <p>Loading...</p>;
    }

    return (
      
        <div className="container-fluid text-center">
          <div className="row content">
            <div className="col-sm-2 sidenav">
              <Link to="/newaccount">
                <button className="btn-sm btn-danger" style={{ margin: 5 }}>
                  Create Account
                </button>
              </Link>
              <Link to="/transfer">
                <button className="btn-sm btn-danger" style={{ margin: 5 }}>
                  Transfer Funds
                </button>
              </Link>
              <Link to="/deposit">
                <button className="btn-sm btn-danger" style={{ margin: 5 }}>
                  Deposit Funds
                </button>
              </Link>
              <Link to="/withdraw">
                <button className="btn-sm btn-danger" style={{ margin: 5 }}>
                  Withdraw Funds
                </button>
              </Link>
            </div>
            <div className="col-sm-8 text-left ">
              <h1>Accounts</h1>
              <div className=" container-fluid">
                <h6>Balances</h6>
                <Chart />
                {/* <form>
          <input
            type="text"
            name="accountNumber"
            value={this.state.accountNumber || ''}
            onChange={this.handleChange}
            className="form-control bg-transparent center"
            aria-label="Sizing example input"
            aria-describedby="inputGroup-sizing-default"
          ></input>
          <button type="submit" onClick={this.handleSubmit} className="btn btn-danger mb-2">
            Submit
          </button>
        </form> */}
              </div>
              <hr></hr>
              <div className="container-fluid">
              {/* <Table>
        <thead>
          <tr>
            <th>#</th>
            <th>Account Number</th>
            <th>Account Name</th>
            <th>Account Balance</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">1</th>
            <td>{bankAccounts[0].id}</td>
                    <td>{bankAccounts.accountName}</td>
                    <td>{ bankAccounts.balance}</td>
                </tr>
              </tbody>
              </Table> */}
              </div>
              
            </div>
            <div className="col-sm-2 sidenav">
              <div className="well">
                <p>Blogger</p>
              </div>
              <div className="well">
                <p>NYCE Tube</p>
              </div>
            </div>
          </div>
        </div>
      
    );
  }
}

export default BankAccounts;
