import React, { Component } from 'react';
import NavigationBar from './NavigationBar';
import { Link } from 'react-router-dom';



class Home extends Component {
  render() {
    return (
      <div>
        <NavigationBar/>
      </div>
    );
  }
}

export default Home;
