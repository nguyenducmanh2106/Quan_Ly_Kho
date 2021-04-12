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

    }
}
