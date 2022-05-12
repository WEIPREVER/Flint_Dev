import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import axios from 'axios';
import UseContext, {Context} from '../../UseContext';
import AuthenticationService from '../../services/AuthenticationService';

class Chart extends React.Component {
  state = {
    balances: [], 
  }

  async componentDidMount() {
    let user = AuthenticationService.getUser();
    console.log('/users/' + user + '/balances/' + sessionStorage.getItem('accountNumber'))
    const response = await fetch('/users/' + user + '/balances/' + sessionStorage.getItem('accountNumber'));
    const body = await response.json();
    this.setState({ balances: body, isLoading: false });
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

 

  render() {
    return (
      <UseContext>
      <div className="container-fluid" id="charting">
        <LineChart
          width={600}
          height={400}
          data={this.state.balances}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
            <XAxis dataKey="timeStamp" tickCount={5} stroke='yellow'/>
          <YAxis tickCount={10} stroke='yellow'/>
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="balances" stroke="#FFFF00" strokeWidth={2} activeDot={{ r: 8 }} />
        </LineChart>
        
        </div>
        </UseContext>
    );
  }
}

export default Chart;
