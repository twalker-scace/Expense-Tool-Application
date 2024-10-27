import axios from "axios";
import { Expense, CreateExpenseDto, ExpenseListDto } from "../interfaces/expense";

// Set URL for your rest application on this switch, this assumes REST is accessible through web URL or local host.
switch (window.location.hostname.toLowerCase()) {
  case "localhost":
    axios.defaults.baseURL = "https://localhost:7028/api";
    break;
  //Put REST URL below for production environment
  default:
    axios.defaults.baseURL = "";
    break;
}

export const getExpenses = async (): Promise<ExpenseListDto> => {
  const response = await axios.get<ExpenseListDto>(`/expenses`);
  return response.data;
};

export const createExpense = async (expense: CreateExpenseDto): Promise<Expense> => {
  const response = await axios.post<Expense>(`/expenses/create`, expense);
  return response.data;
};
