import axios from "axios";

class ExpenseReportService{
  executeExpenseReportService(){
    return axios.get(`http://localhost:8080/users/budget_tool`)
  }
}

export default new ExpenseReportService()
