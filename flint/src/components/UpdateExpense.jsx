import React, {Component, useState} from 'react';
import './UpdateExpense.css'

const UpdateExpense = (props) => {
  const [id, setId] = useState(props.params.id);
  const [name, setName] = useState(props.params.name);


  return (
      <div className={""}>
        <div className={"box-container container"}>
          <h1 className={"updateExpense"}> Update Expense: "{name}" (ID: {id}) </h1>
        </div>
      </div>
  )
}
export default UpdateExpense;