using Application.MODELS;
using Microsoft.EntityFrameworkCore.Storage;
using Application.Data;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Application.REPOSITORY
{
    public interface IUnitOfWork : IDisposable
    {
        IUserRepository UserRepository { get; }
        IDM_ChucVuRepository DM_ChucVuRepository { get; }
        IDM_DonViRepository DM_DonViRepository { get; }
        IRoleRepository RoleRepository { get; }
        IMenuRepository MenuRepository { get; }
        IPermissionRepository PermissionRepository { get; }
        IUserGroupRepository UserGroupRepository { get; }
        IDM_DonViHanhChinhRepository DM_DonViHanhChinhRepository { get; }
        IDM_NhaCungCapRepository DM_NhaCungCapRepository { get; }
        IDM_ThuongHieuRepository DM_ThuongHieuRepository { get; }
        IDM_LoaiSanPhamRepository DM_LoaiSanPhamRepository { get; }
        IDM_XuatXuRepository DM_XuatXuRepository { get; }
        IDM_DonViTinhRepository DM_DonViTinhRepository { get; }
        Task CreateTransaction();
        Task Commit();
        Task Rollback();
        Task SaveChange();
    }
    public class UnitOfWork : IUnitOfWork
    {
        APPDbContext _dbContext;
        IDbContextTransaction _transaction;

        public UnitOfWork(IDbContextFactory<APPDbContext> dbContextFactory, Microsoft.AspNetCore.Http.IHttpContextAccessor httpContextAccessor)
        {
            _dbContext = dbContextFactory.GetContext();
            UserRepository = new UserRepository(_dbContext);
            DM_ChucVuRepository = new DM_ChucVuRepository(_dbContext);
            DM_DonViRepository = new DM_DonViRepository(_dbContext);
            RoleRepository = new RoleRepository(_dbContext);
            MenuRepository = new MenuRepository(_dbContext);
            PermissionRepository = new PermissionRepository(_dbContext);
            UserGroupRepository = new UserGroupRepository(_dbContext);
            DM_DonViHanhChinhRepository = new DM_DonViHanhChinhRepository(_dbContext);
            DM_NhaCungCapRepository = new DM_NhaCungCapRepository(_dbContext);
            DM_ThuongHieuRepository = new DM_ThuongHieuRepository(_dbContext);
            DM_LoaiSanPhamRepository = new DM_LoaiSanPhamRepository(_dbContext);
            DM_XuatXuRepository = new DM_XuatXuRepository(_dbContext);
            DM_DonViTinhRepository = new DM_DonViTinhRepository(_dbContext);
        }
        public IUserRepository UserRepository { get; }

        public IDM_ChucVuRepository DM_ChucVuRepository { get; }

        public IDM_DonViRepository DM_DonViRepository { get; }

        public IRoleRepository RoleRepository { get; }


        public IMenuRepository MenuRepository { get; }

        public IPermissionRepository PermissionRepository { get; }

        public IUserGroupRepository UserGroupRepository { get; }

        public IDM_DonViHanhChinhRepository DM_DonViHanhChinhRepository { get; }

        public IDM_NhaCungCapRepository DM_NhaCungCapRepository { get; }

        public IDM_ThuongHieuRepository DM_ThuongHieuRepository { get; }

        public IDM_LoaiSanPhamRepository DM_LoaiSanPhamRepository { get; }

        public IDM_XuatXuRepository DM_XuatXuRepository { get; }

        public IDM_DonViTinhRepository DM_DonViTinhRepository { get; }
        #region Transaction
        public async Task CreateTransaction()
        {
            _transaction = await _dbContext.Database.BeginTransactionAsync();
        }

        public async Task Commit()
        {
            await _transaction.CommitAsync();
        }

        public async Task Rollback()
        {
            await _transaction.RollbackAsync();
        }

        public async Task SaveChange()
        {
            await _dbContext.SaveChangesAsync();
        }

        #endregion

        private bool disposedValue = false; // To detect redundant calls

        protected virtual void Dispose(bool disposing)
        {
            if (!disposedValue)
            {
                if (disposing)
                {
                    // TODO: dispose managed state (managed objects).
                }

                // TODO: free unmanaged resources (unmanaged objects) and override a finalizer below.
                // TODO: set large fields to null.

                disposedValue = true;
            }
        }

        public void Dispose()
        {
            Dispose(true);
        }
    }
}
