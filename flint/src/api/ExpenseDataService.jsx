import axios from "axios";

class ExpenseDataService{
  retrieveExpensesByUser(user){
    return axios.get(`http://localhost:8080/users/${user}/budget_tool`)
  }
  deleteExpensesByUserAndId(user,id){
    return axios.delete(`http://localhost:8080/users/${user}/budget_tool/${id}`)
  }

  updateExpense(user, id, expense){
  return axios.put(`http://localhost:8080/users/${user}/budget_tool/${id}`,expense)
}
  addExpense(user, expense){
    return axios.post(`http://localhost:8080/users/${user}/budget_tool`, expense)
  }
  retrieveCategoriesByUser(user){
    return axios.get(`http://localhost:8080/users/${user}/category`)
  }

  updateStartBudget(user, id, expense){
    return axios.put(`http://localhost:8080/users/${user}/starting_budget/1`,expense)
  }

  getStartBudget(user){
    return axios.get(`http://localhost:8080/users/${user}/starting_budget/1`)
  }
}

export default new ExpenseDataService()
