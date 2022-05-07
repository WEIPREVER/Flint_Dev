import React, { useState, useEffect } from 'react';
import Chart from './Chart';
import { Link } from 'react-router-dom';

class BankAccounts extends React.Component {
  state = {
    isLoading: true,
    bankAccounts: [],
  };

  async componentDidMount() {
    const response = await fetch('api/bankaccount');
    const body = await response.json();
    this.setState({ bankAccounts: body, isLoading: false });
  }
  

  render() {
    const { bankAccounts, isLoading } = this.state;
    if (isLoading) {
      return <p>Loading...</p>;
    }

    return (
      <>
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
            <div className="col-sm-8 text-left">
              <h1>Accounts</h1>
              <div>
                <h6>Balances</h6>
                <Chart />
              </div>
              <hr></hr>
              <h3>Banking text</h3>
              <p>Some kind of account text</p>
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
      </>
    );
  }
}

export default BankAccounts;
