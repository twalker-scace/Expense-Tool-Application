import React, { useEffect, useState } from "react";
import { Expense } from "../interfaces/expense";
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { getExpenses } from "../services/api";

/**
 * @returns A table that dynamically displays displays the list of expenses from the REST endpoint
 */
const ExpenseList: React.FC<{ updateFlag: boolean }> = ({ updateFlag }) => {
  const [expenses, setExpenses] = useState<Expense[]>([]);

  useEffect(() => {
    const getExpenseList = async () => {
      try {
        const response = await getExpenses();
        setExpenses(response.items);
      } catch (err) {
        //log error for unsuccessful calls
        console.log(err);
      }
    };
    getExpenseList();
  }, [updateFlag]);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ border: "solid", borderColor: "whitesmoke" }}>
        <TableHead style={{ background: "whitesmoke" }}>
          <TableRow>
            <TableCell component="th">Expense Date</TableCell>
            <TableCell component="th">Type of Expense</TableCell>
            <TableCell component="th">Currency</TableCell>
            <TableCell component="th">Amount</TableCell>
            <TableCell component="th">Description</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {expenses.length > 0 ? (
            expenses.map((expense) => (
              <TableRow key={expense.id}>
                <TableCell>{new Date(expense.date).toLocaleDateString()}</TableCell>
                <TableCell>{expense.expenseType}</TableCell>
                <TableCell>{expense.currency}</TableCell>
                <TableCell align="right">{expense.amount.toFixed(2)}</TableCell>
                <TableCell>{expense.description}</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5} style={{ textAlign: "center" }}>
                No expenses found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ExpenseList;
