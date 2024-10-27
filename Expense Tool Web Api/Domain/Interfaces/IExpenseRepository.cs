using Expense_Tool_Web_Api.Domain.Entities;

namespace Expense_Tool_Web_Api.Domain.Interfaces
{
    public interface IExpenseRepository
    {
        Task<PaginatedList<Expense>> GetPaginatedExpensesAsync(int pageIndex, int pageSize);
        Task<Expense> AddExpenseAsync(Expense expense);
    }
}