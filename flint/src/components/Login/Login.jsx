import React, { Component } from 'react'
import "./Login.css";
import AuthenticationService from "../../services/AuthenticationService";

class Login extends Component {

  constructor(props){
    super(props)
    this.state = {
      username:"",
      password:"",
      showFailMessage: false,
      showSuccessMessage: false,
      loginAuthen: false
    }
    this.handleUsernameChange = this.handleUsernameChange.bind(this)
    this.handlePasswordChange = this.handlePasswordChange.bind(this)
    this.loginClicked = this.loginClicked.bind(this)
  }

  handleUsernameChange (event) {
    this.setState({
      username:event.target.value
    })
  }
  handlePasswordChange (event) {
    this.setState({

      password:event.target.value
    })
  }

  async loginAuth(){
    const response = await fetch('/api/users/userAuthentication?user='+this.state.username+'&password='+this.state.password);
    const body = await response.json();
    if (body == true){
      return true;
    }
}

  loginClicked () {
    const boo = this.loginAuth();
    if(this.state.username==='veer' && this.state.password==='admin') {
      AuthenticationService.registerSuccessfulLogin(this.state.username, this.state.password);
      // this.props.navigate(`/welcome/${this.state.username}`)
      window.location.replace(`/welcome/${this.state.username}`)

    }  else if (boo){
      AuthenticationService.registerSuccessfulLogin(this.state.username, this.state.password);
      // this.props.navigate(`/welcome/${this.state.username}`)
      window.location.replace(`/welcome/${this.state.username}`)
    }
    else {
      this.setState({showSuccessMessage:false})
      this.setState({hasLoginFailed:true})
    }
    

console.log(this.state)

  }

  render() {
    return (
      <div className="container-fluid text-center" style={{position: 'relative', minHeight: '100vh'}}>
        <div style={{display:'flex', justifyContent:'center', alignItems:'center', height:'100vh'}}>
          <div className={'container'}>
      <form className={"formBg"}>
        {this.state.hasLoginFailed && <div className="alert alert-warning">Invalid Credentials</div>}

        <h3>Sign In</h3>
        <div className="mb-3">
          <label>Username</label>
          <input
            onChange={this.handleUsernameChange}
            type="text"
            className="form-control"
            placeholder="Enter username"
            defaultValue=""
            autoComplete ='off'

          />
        </div>
        <div className="mb-3">
          <label>Password</label>
          <input
            onChange={this.handlePasswordChange}
            type="password"
            className="form-control"
            placeholder="Enter password"
            defaultValue=""
            autoComplete ='off'
          />
        </div>
        <div className="mb-3">
        </div>
        <div className="d-grid">
          <button type={"button"} className={"loginButton"} onClick={this.loginClicked} >
            Login
          </button>
        </div>
      </form>
          </div>
        </div>
      </div>
    )
  }
}
export default Login


