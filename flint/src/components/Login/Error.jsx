import React from 'react';
import "./Error.css";

function Error (){

  return (
    <div className={'container'}>
      <h1 className={"largeError"} style={{display:'flex', justifyContent:'center', alignItems:'center', height:'40vh'}}>404</h1>
      <h2 className={"smallError"}>The page you are looking for is not here!</h2>
    </div>
  )
}
export default Error;
