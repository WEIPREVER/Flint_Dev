import React from 'react';
import { Button, Table } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';

class Transactions extends React.Component {
  state = {
    isLoading: true,
    transactions: [],
  };

  async componentDidMount() {
    const response = await fetch('api/transactions');
    const body = await response.json();
    this.setState({ transactions: body, isLoading: false });
  }

  render() {
    const { transactions, isLoading } = this.state;

    if (isLoading) {
      return <p>Loading...</p>;
    }

    return (
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
                  <Button tag={Link} to={`/transactions/${transaction.id}`} color="link" size="sm">
                    {transaction.id}
                  </Button>
                </td>
                <td>{format(new Date(transaction.dateOfTransaction), 'yyyy/MM/dd kk:mm:ss')}</td>
                <td>{transaction.typeOfTransaction}</td>
                <td><Button tag={Link} to={`/bankaccount/${transaction.primaryAccountNumber}`} color="link" size="sm">
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
        !isLoading && <div>No Transactions found</div>
      )}
    </div>
    )
}}

export default Transactions;
