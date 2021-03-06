import React, { useState, useEffect } from 'react';
import Chart from './Chart';
import { Link } from 'react-router-dom';
import AuthenticationService from '../../services/AuthenticationService';
import { Table } from 'reactstrap';
import AccountSelection from './AccountSelection';


class BankAccounts extends React.Component {
  state = {
    isLoading: true,
    bankAccounts: [],
    accountNumber: '',
  };

  async componentDidMount() {
    let user = AuthenticationService.getUser();
    const response = await fetch('/users/' + user + '/bankaccount');
    const body = await response.json();
    if (sessionStorage.getItem('accountNumber') == null || sessionStorage == undefined) {
      
      sessionStorage.setItem('accountNumber', body[0].id)
      window.location.reload();
  } 
    console.log(body);
    this.setState({ bankAccounts: body, isLoading: false, accountNumber: sessionStorage.getItem('accountNumber') });
  }

  render() {
    const { bankAccounts } = this.state;
    let user = AuthenticationService.getUser();
    

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
            <div className=" container-fluid" style={{ margin: 5 }}>
              <h6>Balances</h6>             
                <Chart />                
            </div>
            <hr></hr>
            <div className="container-fluid" style={{ margin: "10%" }}>
              <div className="table-responsive" style={{color:'white'}}>
                {bankAccounts && bankAccounts.length > 0 ? (
                  <><Table responsive>
                    <thead>
                      <tr>
                        <th>Account Name</th>
                        <th>Balance</th>
                        <th />
                      </tr>
                    </thead>
                    <tbody>
                      {bankAccounts.map((bankaccount, i) => (
                        <tr key={`entity-${i}`} data-cy="entityTable">
                          <td><Link to={'/transactions?value='+ bankaccount.id} style={{color:'#000000'}}>{bankaccount.accountName}</Link></td>
                          <td>{bankaccount.balance}</td>
                        </tr>
                      ))}
                    </tbody>
                  </Table></>
                ) : (
                  <div>No Bank Accounts for {user} found</div>
                )}
              </div>
            </div>
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
    );
  }
}

export default BankAccounts;
