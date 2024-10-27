import React, { useState } from "react";
import ExpenseTable from "./components/ExpenseTable";
import ExpenseCreationForm from "./components/ExpenseCreationForm";

const App: React.FC = () => {
  const [updateFlag, setUpdateFlag] = useState(false);

  const handleExpenseAdded = () => {
    setUpdateFlag((prev) => !prev);
  };

  return (
    <div style={{ margin: "50px" }}>
      <h1 style={{ marginBottom: "40px" }}>Expense Logger</h1>
      <ExpenseCreationForm onExpenseAdded={handleExpenseAdded} />
      <br />
      <ExpenseTable updateFlag={updateFlag} />
    </div>
  );
};

export default App;
