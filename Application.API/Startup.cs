using Application.DependencyInjection;
using Application.MODELS;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.API
{
    public class Startup
    {
        public readonly string DevCorsPolicyName = "QuanLyKho";
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        [Obsolete]
        public void ConfigureServices(IServiceCollection services)
        {
            //services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_3_0);
            //services.AddDbContext<APPDbContext>(opt => opt.UseOracle(Configuration.GetConnectionString("connectionString")));
            //services.AddDbContext<APPDbContext>(options =>
            //      options.UseSqlServer(Configuration.GetConnectionString("connectionString")));
            services.AddDbContext<APPDbContext>(options =>
                   options.UseSqlServer(Configuration.GetConnectionString("connectionString"),
                   sqlServerOptionsAction: sqlOptions =>
                   {
                       sqlOptions.EnableRetryOnFailure(
                       maxRetryCount: 1000,
                       maxRetryDelay: TimeSpan.FromMinutes(30),
                       errorNumbersToAdd: null)
                       .CommandTimeout(60).UseRowNumberForPaging();
                   }), ServiceLifetime.Transient);
            services.AddCors(setupAction =>
            {
                setupAction.AddPolicy(DevCorsPolicyName,
                    builder =>
                    {
                        builder.WithOrigins("*").AllowAnyHeader().AllowAnyMethod();
                    });
            });
            services.AddControllers();
            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
            .AddJwtBearer(options =>
            {
                options.RequireHttpsMetadata = false;
                options.SaveToken = true;
                options.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuer = true,
                    ValidateAudience = true,
                    ValidateLifetime = true,
                    ValidateIssuerSigningKey = true,
                    ValidIssuer = Configuration["Jwt:Issuer"],
                    ValidAudience = Configuration["Jwt:Audience"],
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Configuration["Jwt:SecretKey"])),
                    ClockSkew = TimeSpan.Zero
                };
                //services.AddAuthorization(config =>
                //{
                //    config.AddPolicy(Policies.Admin, Policies.AdminPolicy());
                //    config.AddPolicy(Policies.User, Policies.UserPolicy());
                //});

            });
            IOCConfig.Register(services, Configuration);
            //services.ConfigureSwaggerGen(c =>
            //{
            //    c.SwaggerDoc("v3", new OpenApiInfo
            //    {
            //        Title = "GTrackAPI",
            //        Version = "v3"
            //    });
            //});
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseCors(DevCorsPolicyName);
            app.UseHttpsRedirection();
            app.UseRouting();
            app.UseAuthentication();
            app.UseAuthorization();
            //app.UseSwagger();
            //app.UseSwaggerUI(c =>
            //{
            //    c.SwaggerEndpoint("/swagger/v1/swagger.json", "My API V1");
            //    c.RoutePrefix = string.Empty;
            //});
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
