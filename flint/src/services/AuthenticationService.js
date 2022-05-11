class AuthenticationService {
  registerSuccessfulLogin(username,password){
    console.log("login registered")
    sessionStorage.setItem('authenticatedUser', username)
  }
  logout(){
    sessionStorage.clear()
  }
  isLoggedIn(){
    let user = sessionStorage.getItem("authenticatedUser")
    if(user === null) {
      return false;
    } else {
      return true;
    }
  }
  getUser(){
    let user = sessionStorage.getItem("authenticatedUser")
    if(user === null){
      return ''
    } else {
      return user
    }
  }
}

export default new AuthenticationService();
