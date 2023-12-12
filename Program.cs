using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using mobadir_API_1.Models;
using System.Text;

internal class Program
{
    private static void Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);

        // Add services to the container.
        builder.Services.AddControllers();

        // dbcontext injection
        var connectionString = builder.Configuration.GetConnectionString("MobadrDB");
        builder.Services.AddDbContextPool<Mobadr_DbContext>(
            option => option.UseSqlServer(connectionString));

        // ----------------- Jwt configuration starts here
        //var jwtIssuer = builder.Configuration.GetSection("Jwt:Issuer").Get<string>();
        //var jwtKey = builder.Configuration.GetSection("testsecretkey").Get<string>();
        builder.Services.AddAuthentication(x =>
        {
            x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
            x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
        })
        .AddJwtBearer(x =>
        {
            x.RequireHttpsMetadata = false;
            x.SaveToken = true;
            x.TokenValidationParameters = new TokenValidationParameters
            {
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("your_secure_secret_key")),
                ValidateAudience = false,
                ValidateIssuer = false,
                // for make specific time for the authorized user
                ClockSkew = TimeSpan.Zero 
                //ValidateLifetime = true,
            };
        });
        // -------------------- Jwt configuration ends here


        builder.Services.AddEndpointsApiExplorer();
        builder.Services.AddSwaggerGen();

        // for enabling angular to call the api - configure cors - add policy
        builder.Services.AddCors(options =>
        {
            options.AddDefaultPolicy(policy =>
            {
                policy.AllowAnyOrigin() // or .WithOrigins("http://localhost:4200")
                .AllowAnyHeader()
                .AllowAnyMethod()
                .AllowAnyOrigin();
            });
        });

        var app = builder.Build();

        // Configure the HTTP request pipeline.
        if (app.Environment.IsDevelopment())
        {
            app.UseSwagger();
            app.UseSwaggerUI();
        }

        // for enabling angular to call the api - enable policy
        app.UseCors();

        app.UseHttpsRedirection();

        //new
        app.UseAuthentication();

        app.UseAuthorization();

        // for the deployment
        app.UseStaticFiles();
        app.MapFallbackToFile("index.html");

        app.MapControllers();

        app.Run();
    }
}