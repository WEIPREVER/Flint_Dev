import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from "./components/Login/Login";
import {Link} from "react-router-dom";
import homeLogo from "./components/images/test.png";



const App = () => {
  return (
    <div className="container-fluid text-center" style={{position: 'relative', minHeight: '100vh'}}>
      <div style={{display:'flex', justifyContent:'center', alignItems:'center', height:'100vh'}}>
        <div className={'container'}>
      <Link to={""} ><img className={"container-fluid text-center"} src={homeLogo} alt={"The Flint logo: A flame"}/></Link>
      <Login/>
    </div>
        </div>
    </div>
  );
};
export default App;
