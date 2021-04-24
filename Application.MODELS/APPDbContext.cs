using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Reflection;
using System.Text;

namespace Application.MODELS
{
    public class APPDbContext : DbContext
    {
        private static readonly MethodInfo _propertyMethod = typeof(EF).GetMethod(nameof(EF.Property), BindingFlags.Static | BindingFlags.Public).MakeGenericMethod(typeof(bool));
        public APPDbContext(DbContextOptions options) : base(options)
        {
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {

            //optionsBuilder.UseOracle(@"User Id=disanhd;Password=oracle;Data Source=(DESCRIPTION =(ADDRESS_LIST =(ADDRESS = (PROTOCOL = TCP)(HOST = localhost)(PORT = 1521)))(CONNECT_DATA = (SERVICE_NAME = DISANHAIDUONG)));");w
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {

        }
        public DbSet<Users> Users { get; set; }
        public DbSet<DM_DonVis> DM_DonVis { get; set; }
        public DbSet<DM_ChucVus> DM_ChucVus { get; set; }
        public DbSet<Roles> Roles { get; set; }
        public DbSet<Menus> Menus { get; set; }
        public DbSet<Permissions> Permissions { get; set; }
        public DbSet<UserGroups> UserGroups { get; set; }
        public DbSet<DM_DonViHanhChinhs> DM_DonViHanhChinhs { get; set; }
        public DbSet<DM_NhaCungCaps> DM_NhaCungCaps { get; set; }
        public DbSet<DM_ThuongHieus> DM_ThuongHieus { get; set; }
        public DbSet<DM_LoaiSanPhams> DM_LoaiSanPhams { get; set; }
        public DbSet<DM_XuatXus> DM_XuatXus { get; set; }
        public DbSet<DM_DonViTinhs> DM_DonViTinhs { get; set; }
        public DbSet<DM_NhomThuocTinhs> DM_NhomThuocTinhs { get; set; }
        public DbSet<DM_ThuocTinhs> DM_ThuocTinhs { get; set; }
        public DbSet<DM_SanPhams> DM_SanPhams { get; set; }
        public DbSet<DM_ThuocTinhSPs> DM_ThuocTinhSPs { get; set; }
        public DbSet<DM_LoaiDeNghis> DM_LoaiDeNghis { get; set; }
        public DbSet<DM_DeNghiDieuDongs> DM_DeNghiDieuDongs { get; set; }

    }
}
