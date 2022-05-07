import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class CreateAccount extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    axios
      .post('api/bankaccount', {
        id: 0,
        accountName: this.state.accountName,
        balance: this.state.balance,
        accountType: this.state.accountType,
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
      window.location.reload(false);
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  render() {
    return (
      <>
        <div className="container-fluid text-center">
          <div className="row content">
            <div className="col-sm-2 sidenav">
              <Link to="/bankaccount">
                <button className="btn-sm btn-danger" style={{ margin: 5 }}>
                  Back
                </button>
              </Link>
            </div>
            <div className="col-sm-8 text-left">
              <h1>Create an Account</h1>
              <div>
                <h6>Enter Details</h6>
                <form className="form-inline">
                  <div className="input-group mb-3">
                    <div className="input-group-prepend">
                      <span className="input-group-text" id="inputGroup-sizing-default">
                        Name
                      </span>
                    </div>
                    <input
                      type="text"
                      name="accountName"
                      value={this.state.accountName || ''}
                      onChange={this.handleChange}
                      className="form-control"
                      aria-label="Sizing example input"
                      aria-describedby="inputGroup-sizing-default"
                    ></input>
                  </div>
                  <div className="input-group mb-3">
                    <div className="input-group-prepend">
                      <span className="input-group-text" id="inputGroup-sizing-default">
                        Initial Funds
                      </span>
                    </div>
                    <input
                      type="text"
                      name="balance"
                      value={this.state.balance || ''}
                      onChange={this.handleChange}
                      className="form-control"
                      aria-label="Sizing example input"
                      aria-describedby="inputGroup-sizing-default"
                    ></input>
                  </div>
                  <div className="input-group mb-3">
                    <div className="input-group-prepend">
                      <span className="input-group-text" id="inputGroup-sizing-default">
                        Account Type
                      </span>
                    </div>
                    <select
                      className="form-select"
                      aria-label="Disabled select example"
                      name="accountType"
                      value={this.state.accountType}
                      onChange={this.handleChange}
                    >
                      <option>Select Account Type</option>
                      <option>SAVINGS</option>
                      <option>CHECKING</option>
                    </select>
                  </div>
                  <button type="submit" onClick={this.handleSubmit} className="btn btn-danger mb-2">
                    Submit
                  </button>
                </form>
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
export default CreateAccount;
