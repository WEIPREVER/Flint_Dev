import React from 'react';
import { Form } from "reactstrap";

class AccountSelection extends React.Component {
    constructor(props) {
        super(props);;
        this.handleChange = this.handleChange.bind(this);
    }

    state = {
        current : 0,
        accounts : []
    }

    async componentDidMount() {
        const response = await fetch('api/bankaccount/');
        const body = await response.json();
        this.setState({ current: sessionStorage.getItem('accountNumber'), accounts: body});
      }

    handleChange(event) {
        sessionStorage.removeItem('accountNumber')
        sessionStorage.setItem('accountNumber', event.target.value)
        window.location.reload();
    }

    render() {
        return (
            <div>
                    <label>
                        Account Selection
                        <select onChange={this.handleChange}>
                            <option value={this.state.current}>
                            {this.state.current}
                            </option>
                            {this.state.accounts.map(bankAccount => (
                                bankAccount.id == this.state.current ? "": (
                                    <option value={bankAccount.id} key={bankAccount.id}>
                                        {bankAccount.id}
                                    </option>
                                )
                                ))
                            }
                        </select>
                    </label>
            </div>
        )
    }
}

export default AccountSelection;