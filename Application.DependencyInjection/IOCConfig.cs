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
using Application.Services.DM_DonViSerVices;
using Application.Services.PermissionSerVices;
using Application.Services.UserGroupSerVices;
using Application.Services.DM_DonViHanhChinhSerVices;
using Application.Services.DM_NhaCungCapSerVices;
using Application.Services.DM_ThuongHieuSerVices;
using Application.Services.DM_LoaiSanPhamSerVices;
using Application.Services.DM_XuatXuSerVices;
using Application.Services.DM_DonViTinhSerVices;
using Application.Services.DM_NhomThuocTinhSerVices;
using Application.Services.DM_ThuocTinhSerVices;
using Application.Services.DM_SanPhamSerVices;
using Application.Services.DM_ThuocTinhSPSerVices;
using Application.Services.DM_LoaiDeNghiSerVices;
using Application.Services.DM_DeNghiDieuDongSerVices;
using Application.Services.DM_ChiTietDeNghiDieuDongSerVices;

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
            services.AddTransient<IDM_NhaCungCapServices, DM_NhaCungCapServices>();
            services.AddTransient<IDM_ThuongHieuServices, DM_ThuongHieuServices>();
            services.AddTransient<IDM_LoaiSanPhamServices, DM_LoaiSanPhamServices>();
            services.AddTransient<IDM_XuatXuServices, DM_XuatXuServices>();
            services.AddTransient<IDM_DonViTinhServices, DM_DonViTinhServices>();
            services.AddTransient<IDM_NhomThuocTinhServices, DM_NhomThuocTinhServices>();
            services.AddTransient<IDM_ThuocTinhServices, DM_ThuocTinhServices>();
            services.AddTransient<IDM_SanPhamServices, DM_SanPhamServices>();
            services.AddTransient<IDM_ThuocTinhSPServices, DM_ThuocTinhSPServices>();
            services.AddTransient<IDM_LoaiDeNghiServices, DM_LoaiDeNghiServices>();
            services.AddTransient<IDM_DeNghiDieuDongServices, DM_DeNghiDieuDongServices>();
            services.AddTransient<IDM_ChiTietDeNghiDieuDongServices, DM_ChiTietDeNghiDieuDongServices>();
        }
    }
}
