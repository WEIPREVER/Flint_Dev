import React, {Component, useState} from 'react';
import {Formik, Form, Field, ErrorMessage, useFormik} from 'formik';
import './UpdateExpense.css'
import moment from "moment";

const UpdateExpense = (props) => {
  const [id, setId] = useState(props.params.id);
  const [nameOfExpense, setNameOfExpense] = useState(props.params.name);
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState(props.params.amount);
  const [date, setDate] = useState(moment().format("YYYY-MM-DD"))

  const formik = useFormik({
      initialValues:{
          nameOfExpense: nameOfExpense,
          category: "",
          amount: amount,
          date: moment().format("YYYY-MM-DD")

      }
  })



  return (
      <div className={""}>
        <div className={"box-container"}>
          <h1 className={"updateExpense"}> Update Expense: "{nameOfExpense}" (ID: {id}) </h1>

        </div>
      </div>
  )
}
export default UpdateExpense;