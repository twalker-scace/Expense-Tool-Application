import React, { ChangeEvent, useState } from "react";
import { Button, Grid2 as Grid, MenuItem, TextField } from "@mui/material";
import ExpenseCreationFormProps from "../interfaces/expenseCreationFormProps";
import { createExpense } from "../services/api";

/**
 * @returns a simple form that can be used to add expenses to a database
 */
const ExpenseCreationForm: React.FC<ExpenseCreationFormProps> = ({ onExpenseAdded }) => {
  const [expense, setExpense] = useState({
    date: "",
    expenseType: "",
    description: "",
    amount: "",
    currency: "",
  });

  const currencies = [
    {
      value: "USD",
      label: "$",
    },
    {
      value: "EUR",
      label: "€",
    },
    {
      value: "BTC",
      label: "฿",
    },
    {
      value: "JPY",
      label: "¥",
    },
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setExpense({ ...expense, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createExpense({
        ...expense,
        amount: parseFloat(expense.amount),
      });
      onExpenseAdded();
      //reset form after submtiting expense for successful response call, if it fails will hit catch block
      setExpense({
        date: "",
        expenseType: "",
        description: "",
        amount: "",
        currency: "",
      });
    } catch (err) {
      //log error if axios request fails
      console.log(err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2} sx={{ maxWidth: "50%" }}>
        <Grid size={6}>
          <TextField
            type="date"
            name="date"
            label="Expense Date"
            value={expense.date}
            onChange={handleChange}
            required
            fullWidth
            slotProps={{ inputLabel: { shrink: true } }}
          />
        </Grid>
        <Grid size={6}>
          <TextField
            type="text"
            name="expenseType"
            label="Type of Expense"
            value={expense.expenseType}
            onChange={handleChange}
            required
            fullWidth
            select
          >
            <MenuItem key="expense-invoice" value="invoice">
              Invoice
            </MenuItem>
            <MenuItem key="expense-credit" value="credit">
              Credit
            </MenuItem>
          </TextField>
        </Grid>
        <Grid size={3}>
          <TextField select name="currency" label="Currency" value={expense.currency} onChange={handleChange} required fullWidth>
            {currencies.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid size={9}>
          <TextField
            type="text"
            name="amount"
            label="Amount"
            placeholder="10.00"
            value={expense.amount}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              const decimalRegex = /^\d+(\.\d{0,2})?$/;
              // Validate the input
              if (e.target.value === "" || decimalRegex.test(e.target.value)) {
                handleChange(e);
              }
            }}
            required
            fullWidth
            slotProps={{ htmlInput: { min: "0" } }}
          />
        </Grid>
        <Grid size={12}>
          <TextField
            type="text"
            name="description"
            label="Description"
            value={expense.description}
            onChange={handleChange}
            rows={4}
            multiline
            required
            fullWidth
          />
        </Grid>
        <Button variant="outlined" type="submit" sx={{ background: "blue", color: "white" }}>
          Add Expense
        </Button>
      </Grid>
    </form>
  );
};

export default ExpenseCreationForm;
