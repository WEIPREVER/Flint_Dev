import React from 'react';
import { Form } from "reactstrap";

class AccountSelection extends React.Component {
    constructor(props) {
        super(props);;
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    state = {
        current : sessionStorage.getItem('accountNumber'),
        accounts : []
    }

    async componentDidMount() {
        const response = await fetch('api/bankaccount/');
        const body = await response.json();
        this.setState({ accounts: body});
      }

    handleChange(event) {
        this.setState({ current: event.target.value });
    }
    handleSubmit(event) {
        sessionStorage.setItem("accountNumber", this.state.current)
    }

    render() {
        return (
            <div>
                <Form onSubmit={this.handleSubmit}>
                    <label>
                        Account Selection
                        <select>
                            <option value="" key="0" />
                            {this.state.accounts
                                ? this.state.accounts.map(bankAccount => (
                                    <option value={bankAccount.id} key={bankAccount.id}>
                                        {bankAccount.id}
                                    </option>
                                ))
                                : null}
                        </select>
                    </label>
                    <input type="submit" value="Submit" />
                </Form>
            </div>
        )
    }
}

export default AccountSelection;