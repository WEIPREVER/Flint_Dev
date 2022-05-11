import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class UserComponent extends React.Component {
    constructor(props) {
      super(props);
      this.state = {};
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        axios
          .post('api/users', {
            
            id: 0,
            userName: this.state.userName,
            email: this.state.email,
            password: this.state.password,
          })
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });
          window.location.href = "/bankaccount";
          // window.location.reload(false);
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
                  <h1>Sign Up</h1>
                  <div>
                    <h6>Enter Details</h6>
                    <form className="form-inline" >
                      <div className="input-group mb-3">
                        <div className="input-group-prepend">
                          <span className="input-group-text" id="inputGroup-sizing-default">
                            Username
                          </span>
                        </div>
                        <input
                          type="text"
                          name="userName"
                          value={this.state.userName || ''}
                          onChange={this.handleChange}
                          className="form-control bg-transparent"
                          aria-label="Sizing example input"
                          aria-describedby="inputGroup-sizing-default"
                        ></input>
                      </div>
                      <div className="input-group mb-3">
                        <div className="input-group-prepend bg-transparent">
                          <span className="input-group-text" id="inputGroup-sizing-default">
                            Email
                          </span>
                        </div>
                        <input
                          type="text"
                          name="email"
                          value={this.state.email || ''}
                          onChange={this.handleChange}
                          className="form-control bg-transparent"
                          aria-label="Sizing example input"
                          aria-describedby="inputGroup-sizing-default"
                        ></input>
                      </div>
                      <div className="input-group mb-3">
                        <div className="input-group-prepend">
                          <span className="input-group-text" id="inputGroup-sizing-default">
                            Password
                          </span>
                        </div>
                        <input
                          type="text"
                          name="password"
                          value={this.state.password || ''}
                          onChange={this.handleChange}
                          className="form-control bg-transparent"
                          aria-label="Sizing example input"
                          aria-describedby="inputGroup-sizing-default"
                        ></input>
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
    export default UserComponent;