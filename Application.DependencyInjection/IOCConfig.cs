
using Application.MODELS;
using Application.REPOSITORY;
using Microsoft.AspNetCore.Mvc.Infrastructure;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Application.Data;
using System;
using System.Collections.Generic;
using System.Text;
using Application.Services.UserServices;
using Application.Services.MenuSerVices;
using Application.Services.DM_ChucVuSerVices;
using Application.Services.DM_DonViserVices;
using Application.Services.DM_DonViSerVices;
using Application.Services.PermissionSerVices;
using Application.Services.UserGroupSerVices;
using Application.Services.DM_DonViHanhChinhSerVices;

namespace Application.DependencyInjection
{
    public class IOCConfig
    {
        public static void Register(IServiceCollection services, IConfiguration configuration)
        {
            services.AddHttpContextAccessor();
            services.AddSingleton<IActionContextAccessor, ActionContextAccessor>();
            // Db
            services.AddDbContext<APPDbContext>(ServiceLifetime.Scoped, ServiceLifetime.Singleton);

            services.AddTransient<IDbContextFactory<APPDbContext>, APPDbContextFactory>();
            services.AddTransient<IUnitOfWork, UnitOfWork>();
            services.AddTransient<IUserServices, UserServices>();
            services.AddTransient<IDM_ChucVuServices, DM_ChucVuServices>();
            services.AddTransient<IMenuServices, MenuServices>();
            services.AddTransient<IDM_DonViServices, DM_DonViServices>();
            services.AddTransient<IPermissionServices, PermissionServices>();
            services.AddTransient<IUserGroupServices, UserGroupServices>();
            services.AddTransient<IDM_DonViHanhChinhService, DM_DonViHanhChinhService>();
        }
    }
}
