import React, { useEffect, useState } from "react";
import { Expense } from "../interfaces/expense";
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { getExpenses } from "../services/api";

/**
 * @returns A table that dynamically displays displays the list of expenses from the REST endpoint
 */
const ExpenseList: React.FC<{ updateFlag: boolean }> = ({ updateFlag }) => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [pageIndex, setPageIndex] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(10);
  const [hasNextPage, setHasNextPage] = useState<boolean>(false);
  const [hasPreviousPage, setHasPreviousPage] = useState<boolean>(false);

  // useEffect to render the component when updated by the parent
  useEffect(() => {
    // if add new expense, start on first page
    getExpenseList(1);
  }, [updateFlag]);

  const getExpenseList = async (newPage: number) => {
    try {
      const response = await getExpenses(newPage, 10);
      setExpenses(response.items);
      setPageIndex(response.pageIndex);
      setTotalPages(response.totalPages);
      setHasNextPage(response.hasNextPage);
      setHasPreviousPage(response.hasPreviousPage);
    } catch (err) {
      //log error for unsuccessful calls
      console.log(err);
    }
  };

  const handleNextPage = () => {
    if (pageIndex < totalPages) {
      getExpenseList(pageIndex + 1);
    }
  };

  const handlePreviousPage = () => {
    if (pageIndex > 1) {
      getExpenseList(pageIndex - 1);
    }
  };

  return (
    <>
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

      <div style={{ padding: "10px" }}>
        <Button onClick={handlePreviousPage} disabled={!hasPreviousPage} variant="outlined">
          {"<"}
        </Button>
        <Button onClick={handleNextPage} disabled={!hasNextPage} variant="outlined">
          {">"}
        </Button>
        <p>
          Page {pageIndex} of {totalPages}
        </p>
      </div>
    </>
  );
};

export default ExpenseList;
