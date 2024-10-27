# Simple Expense Application

This application is for Octacom's technical interview.

The following application was made using "ASP.NET Core WebAPI" and "Create-React-App" with template from Typescript.

Thank you for reviewing this application!

## Installation

Create a local SQL server and create a database called "ExpenseDb". Once done create a table with the following command:

```bash
CREATE TABLE Expenses (
    Id INT PRIMARY KEY IDENTITY(1,1),
    Date DATE NOT NULL,
    ExpenseType NVARCHAR(50) NOT NULL,
    Description NVARCHAR(255) NOT NULL,
    Amount DECIMAL(18,2) NOT NULL,
    Currency NVARCHAR(3) NOT NULL,
    CreatedAt DATETIME2 NOT NULL DEFAULT GETDATE(),
    LastUpdated DATETIME2 NOT NULL DEFAULT GETDATE()
)
```

Install all packages for the React applicaton in the React Project root and execute command:

```bash
npm install
```

In the Expense Tool Web Api folder, please be sure to go into appsettings.json and configure the ConnectionsString to be your database connection and DB name.

## Run Locally

Start the frontend server. NOTE: Please make sure to go into ./services/api.ts file and update the REST api to match that of your REST API if you change the default port settings.

```bash
cd Expense\ Tool\ React\ Frontend\
npm run start
```

Start the REST Web API by opening in visual studio and running the solution or by executing:

```bash
cd Expense\ Tool\ Web\ Api\
dotnet watch run
```

or by opening Visual Studio and running the solution file.
