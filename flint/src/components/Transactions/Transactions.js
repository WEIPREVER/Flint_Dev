import React from 'react';
import { Button, Table } from 'reactstrap';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import AccountSelection from '../AccountComp/AccountSelection';

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
      <><div className="table-responsive">
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
                  <td><Button tag={Link} to={`/bankaccount/`} color="black" size="small" onClick={sessionStorage.setItem("accountNumber", transaction.primaryAccountNumber)}>
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
      </div><AccountSelection /></>
    )
  }
}

export default Transactions;
