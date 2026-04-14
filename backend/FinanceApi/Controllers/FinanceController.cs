using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using FinanceApi.Data;
using FinanceApi.Models;
using System.Security.Claims;

namespace FinanceApi.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize] // Это значит, что только вошедшие пользователи могут пользоваться этими методами
public class FinanceController : ControllerBase
{
    private readonly ApiDbContext _context;

    public FinanceController(ApiDbContext context) => _context = context;

    // Получить все транзакции текущего пользователя
    [HttpGet("transactions")]
    public async Task<ActionResult<IEnumerable<Transaction>>> GetTransactions()
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        return await _context.Transactions
            .Where(t => t.UserId == userId)
            .OrderByDescending(t => t.Date)
            .ToListAsync();
    }

    // Добавить новый расход
    [HttpPost("transactions")]
    public async Task<ActionResult<Transaction>> AddTransaction(Transaction transaction)
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        transaction.UserId = userId; // Привязываем расход к конкретному юзеру
        transaction.Date = DateTime.UtcNow;

        _context.Transactions.Add(transaction);
        await _context.SaveChangesAsync();

        return Ok(transaction);
    }
}