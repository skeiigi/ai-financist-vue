using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using FinanceApi.Data; // Убедись, что создал папку Data и контекст

var builder = WebApplication.CreateBuilder(args);

// 1. Подключение PostgreSQL
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
builder.Services.AddDbContext<ApiDbContext>(options =>
    options.UseNpgsql(connectionString));

// 2. Настройка Авторизации (Identity)
builder.Services.AddAuthorization();
builder.Services.AddIdentityApiEndpoints<IdentityUser>()
    .AddEntityFrameworkStores<ApiDbContext>();

// 3. Настройка CORS (чтобы Vue на Vercel мог слать запросы)
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowVueApp", policy =>
    {
        policy.AllowAnyOrigin() // Для начала разрешим всем, потом впишешь адрес своего Vercel
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});

builder.Services.AddControllers();
builder.Services.AddOpenApi();

var app = builder.Build();

// Настройка пайплайна
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseCors("AllowVueApp");
app.UseHttpsRedirection();

// Эндпоинты для регистрации и логина (создаются автоматически одной строкой)
app.MapIdentityApi<IdentityUser>();

app.MapControllers(); // Чтобы работали твои FinanceController и другие

app.Run();