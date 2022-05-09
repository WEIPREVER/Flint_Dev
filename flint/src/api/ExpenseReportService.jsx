import axios from "axios";

class ExpenseReportService{
  executeExpenseReportService(user){
    return axios.get(`http://localhost:8080/users/${user}/budget_tool`)
  }
}

export default new ExpenseReportService()
