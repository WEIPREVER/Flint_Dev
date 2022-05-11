import React from 'react';
import { format } from 'date-fns';
import { Button } from 'reactstrap';
import { Link, Navigate } from 'react-router-dom';

class TransactionDetail extends React.Component {
  state = {
    isLoading: true,
    transactions: [],
  };

  async componentDidMount() {
    const response = await fetch('/api/' + window.location.pathname);
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
        {(
          <ul class="list-group  bg-transparent">
            <li class="list-group-item  bg-transparent">Date of Transaction : {format(new Date(transactions.dateOfTransaction), "yyyy-MM-dd hh:mm aaaaa'm'")}</li>
            <li class="list-group-item  bg-transparent">Type of Transaction : {transactions.typeOfTransaction}</li>
            <li class="list-group-item  bg-transparent">Transaction Amount : {transactions.transactionAmount}$</li>
            <li class="list-group-item  bg-transparent">Account Number :
              <Button tag={Link} to={`/bankaccount`} color="black" size="small" onClick={sessionStorage.setItem("accountNumber", transactions.primaryAccountNumber)}>
                {transactions.primaryAccountNumber}
              </Button></li>
            {transactions.category ? <li class="list-group-item  bg-transparent">{transactions.category}</li> : ""}
          </ul>
        )}
        <Button tag={Link} to={`/transactions`} color="black" size="small">
                    Back
        </Button>
      </div>
    )
  }
}

export default TransactionDetail;