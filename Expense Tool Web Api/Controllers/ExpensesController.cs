using Expense_Tool_Web_Api.Domain.Interfaces;
using Expense_Tool_Web_Api.Domain.Entities;
using Microsoft.AspNetCore.Mvc;

namespace Expense_Tool_Web_Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ExpensesController : ControllerBase
    {
        private readonly IExpenseRepository _repository;

        public ExpensesController(IExpenseRepository repository)
        {
            _repository = repository;
        }

        [HttpGet]
        public async Task<ActionResult<PaginatedList<Expense>>> GetExpenses([FromQuery] int pageIndex = 1, [FromQuery] int pageSize = 10)
        {
            var expenses = await _repository.GetPaginatedExpensesAsync(pageIndex, pageSize);
            return Ok(expenses);
        }

        [HttpPost("create")]
        public async Task<ActionResult<Expense>> PostExpense(Expense expense)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            expense.CreatedAt = DateTime.UtcNow;
            expense.LastUpdated = DateTime.UtcNow;

            var createdExpense = await _repository.AddExpenseAsync(expense);
            return CreatedAtAction(nameof(PostExpense), new { id = createdExpense.Id }, createdExpense);
        }
    }
}