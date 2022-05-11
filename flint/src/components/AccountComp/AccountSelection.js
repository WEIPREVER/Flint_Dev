import React from 'react';

class AccountSelection extends React.Component {
    constructor(props) {
        super(props);;
        this.handleChange = this.handleChange.bind(this);
    }

    state = {
        current: "",
        accounts: []
    }

    async componentDidMount() {
        console.log(sessionStorage.getItem('accountNumber'))
        const response = await fetch('api/bankaccount/');
        const body = await response.json();
        if (sessionStorage.getItem('accountNumber') == null) {
            this.setState({ current: body[0].id, accounts: body })
            sessionStorage.setItem('accountNumber', body[0].id)
            console.log(sessionStorage.getItem('accountNumber'))
            window.location.reload();
        } else {
            this.setState({ current: sessionStorage.getItem('accountNumber'), accounts: body });
        }
        console.log(sessionStorage.getItem('accountNumber'))
    }

    handleChange(event) {
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
                            bankAccount.id == this.state.current ? "" : (
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