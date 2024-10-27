using Expense_Tool_Web_Api.Domain.Interfaces;
using Expense_Tool_Web_Api.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Expense_Tool_Web_Api.Persistance.Repositories
{
    public class ExpenseRepository : IExpenseRepository
    {
        private readonly ExpenseDbContext _context;

        public ExpenseRepository(ExpenseDbContext context)
        {
            _context = context;
        }

    public async Task<PaginatedList<Expense>> GetPaginatedExpensesAsync(int pageIndex, int pageSize)
    {
        return await PaginatedList<Expense>.CreateAsync(
            _context.Expenses.AsNoTracking().OrderByDescending(e => e.Date),
            pageIndex,
            pageSize);
    }

        public async Task<Expense> AddExpenseAsync(Expense expense)
        {
            _context.Expenses.Add(expense);
            await _context.SaveChangesAsync();
            return expense;
        }
    }
}