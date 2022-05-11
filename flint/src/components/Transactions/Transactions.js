import React from 'react';
import { Button, Table } from 'reactstrap';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import AccountSelection from '../AccountComp/AccountSelection';
import Chart from '../AccountComp/Chart';

class Transactions extends React.Component {


  state = {
    transactions: [],
  };

  async componentDidMount() {
    if (sessionStorage.getItem('accountNumber') != null) {
      const response = await fetch('api/bankAccount/' + sessionStorage.getItem('accountNumber') + '/transactions');
      const body = await response.json();
      this.setState({ transactions: body });
    }
  }

  render() {
    const { transactions } = this.state;

    return (
      <div className="container-fluid text-center">
        <div className="row content">
          <div className="col-sm-2 sidenav">
            <Link to="/bankaccount">
              <button className="btn-sm btn-danger" style={{ margin: 5 }}>
                Back
              </button>
            </Link>
          </div>
          <div className="col-sm-8 text-left ">
            <h1>Account</h1>
            <div className=" container-fluid">
              <h6>Balances</h6>
              <Chart />
            </div>
            <hr></hr>
            <div className="container-fluid">
              <div className="table-responsive">
                {transactions && transactions.length > 0 ? (
                  <Table responsive>
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Date Of Transaction</th>
                        <th>Type Of Transaction</th>
                        <th>Account</th>
                        <th>Amount</th>
                        <th />
                      </tr>
                    </thead>
                    <tbody>
                      {transactions.map((transaction, i) => (
                        <tr key={`entity-${i}`} data-cy="entityTable">
                          <td>
                            <Button tag={Link} to={`/transactions/${transaction.id}`} color="black" size="small">
                              {transaction.id}
                            </Button>
                          </td>
                          <td>{format(new Date(transaction.dateOfTransaction), "yyyy-MM-dd hh:mm aaaaa'm'")}</td>
                          <td>{transaction.typeOfTransaction}</td>
                          <td><Button tag={Link} to={`/bankaccount`} color="black" size="small">
                            {transaction.primaryAccountNumber}
                          </Button></td>
                          <td>
                            {transaction.transactionAmount}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                ) : (
                  <div>No Transactions found</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Transactions;
