import axios from "axios";

class ExpenseDataService{
  retrieveExpensesByUser(user){
    return axios.get(`http://localhost:8080/users/${user}/budget_tool`)
  }
  deleteExpensesByUserAndId(user,id){
    return axios.delete(`http://localhost:8080/users/${user}/budget_tool/${id}`)
  }
}

export default new ExpenseDataService()
