import React from 'react';
import { Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';

class TransactionDetail extends React.Component {
  state = {
    isLoading: true,
    transactions: [],
  };

  async componentDidMount() {
    const response = await fetch('api/transactions/${id}');
    const body = await response.json();
    this.setState({ transactions: body, isLoading: false });
  }

  render() {
    <Row>
    <Col md="8">
      <h2 data-cy="marketPriceDetailsHeading">MarketPrice</h2>
      <dl>
        <dd>{transactions.id}</dd>
        <dt>
          <span id="dateOfTransaction">Transaction Date</span>
        </dt>
        <dd>{format(new Date(transaction.dateOfTransaction), 'yyyy/MM/dd kk:mm:ss')}</dd>
        <dt>
          <span id="typeOfTransaction">Type of Transaction</span>
        </dt>
        <dd>{transactions.typeOfTransaction}</dd>
        <dt>
          <span id="transactionAmount">Transaction Amount</span>
        </dt>
        <dd>{transactions.transactionAmount}</dd>
        <dt>
          <span id="account">Account</span>
        </dt>
        <dd>
        <td>
            <Button tag={Link} to={`/bankaccount/${transaction.toAccountId}`} color="link" size="sm">
                {transaction.toAccountId}
            </Button>
        </td>
        </dd>
      </dl>
      <Button tag={Link} to="/transactions" replace color="info" data-cy="BackButton">
        <span className="d-none d-md-inline">Back</span>
      </Button>
    </Col>
  </Row>
}}

export default TransactionDetail;