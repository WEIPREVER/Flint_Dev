import React, {Component} from 'react';
import './UpdateExpense.css'

class UpdateExpense extends Component{
  constructor(props) {
    super(props)

    this.state = {
      id: this.props.params.id,
    }
  }

  render(){
  return (
  <div className={""}>
    <div className={"box-container container"}>
      <h1 className={"updateExpense"}> Update Expense: "{this.props.params.name}" (ID: {this.props.params.id}) </h1>
    </div>
  </div>
  )
}
}

export default UpdateExpense;
