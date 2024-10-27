using Expense_Tool_Web_Api.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Expense_Tool_Web_Api.Persistance
{
    public class ExpenseDbContext : DbContext
    {
        public ExpenseDbContext(DbContextOptions<ExpenseDbContext> options)
            : base(options)
        {
        }

        public DbSet<Expense> Expenses { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Expense>()
                .Property(e => e.Amount)
                .HasColumnType("decimal")
                .HasPrecision(18, 2);
        }
    }
}