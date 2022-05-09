import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from "./components/Login/Login";
import {Link} from "react-router-dom";
import homeLogo from './components/images/test.png';
import AuthenticationService from "./services/AuthenticationService";



const App = () => {
  const isLoggedIn = AuthenticationService.isLoggedIn();

  return (
    <div className="container-fluid text-center" style={{position: 'relative', minHeight: '100vh'}}>
      <div style={{display:'flex', justifyContent:'center', alignItems:'center', height:'100vh'}}>
        <div className={'container'}>
          {isLoggedIn && <Link to={"/"}><img className={"container-fluid text-center"} src={homeLogo}
                                   alt={"The Flint logo: A flame"}/></Link>
          }
          {!isLoggedIn && <Link to={'login'}><img className={"container-fluid text-center"} src={homeLogo}
                                                 alt={"The Flint logo: A flame"}/></Link>
          }
    </div>
        </div>
    </div>
  );
};
export default App;