using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using mobadir_API_1.Models;
using System.Text;
using System.Text.Json.Serialization;

internal class Program
{
    private static void Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);

        // Add services to the container.
        builder.Services.AddControllers().AddJsonOptions(x =>
                x.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles);
       

        // dbcontext injection
        var connectionString = builder.Configuration.GetConnectionString("MobadrDB");
        builder.Services.AddDbContextPool<Mobadr_DbContext>(
            option => option.UseSqlServer(connectionString));

        // ----------------- Jwt configuration starts here
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
                policy.AllowAnyOrigin() //.WithOrigins("http://localhost:4200")
                .AllowAnyHeader()
                .AllowAnyMethod();
                //.SetIsOriginAllowedToAllowWildcardSubdomains();
                //.AllowCredentials();
            });
        });

        // new
        // Add configuration from appsettings.json
        builder.Configuration.AddJsonFile("constants.json", optional: false, reloadOnChange: true);


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

        // for the deployment
        app.UseStaticFiles(); // for the wwwroot folder

        app.UseAuthentication();

        app.UseAuthorization();

        app.MapFallbackToFile("index.html");

        app.MapControllers();

        app.Run();
    }
}