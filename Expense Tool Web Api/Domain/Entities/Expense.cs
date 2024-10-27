using System;
using System.ComponentModel.DataAnnotations;

namespace Expense_Tool_Web_Api.Domain.Entities
{
    public class Expense
    {
        public int Id { get; set; }

        [Required]
        public DateTime Date { get; set; }

        [Required]
        [MaxLength(50)]
        public string? ExpenseType { get; set; }

        [Required]
        public string? Description { get; set; }

        [Required]
        [Range(0.00, double.MaxValue)]
        public decimal Amount { get; set; }

        [Required]
        [MaxLength(3)]
        public string? Currency { get; set; }

        public DateTime CreatedAt { get; set; }
        public DateTime LastUpdated { get; set; }
    }
}