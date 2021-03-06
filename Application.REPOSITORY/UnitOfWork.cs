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
        IDM_NhomThuocTinhRepository DM_NhomThuocTinhRepository { get; }
        IDM_ThuocTinhRepository DM_ThuocTinhRepository { get; }
        IDM_SanPhamRepository DM_SanPhamRepository { get; }
        IDM_ThuocTinhSPRepository DM_ThuocTinhSPRepository { get; }
        IDM_LoaiDeNghiRepository DM_LoaiDeNghiRepository { get; }
        IDM_DeNghiDieuDongRepository DM_DeNghiDieuDongRepository { get; }
        IDM_ChiTietDeNghiDieuDongRepository DM_ChiTietDeNghiDieuDongRepository { get; }
        IDM_ChiTietNhapHangRepository DM_ChiTietNhapHangRepository { get; }
        IDM_NhapHangRepository DM_NhapHangRepository { get; }
        IThanhToanDonHangRepository ThanhToanDonHangRepository { get; }
        IChiTietKhoRepository ChiTietKhoRepository { get; }
        IDM_XuatHangRepository DM_XuatHangRepository { get; }
        IDM_ChiTietXuatHangRepository DM_ChiTietXuatHangRepository { get; }
        IDM_KiemKeRepository DM_KiemKeRepository { get; }
        IDM_ChiTietKiemKeRepository DM_ChiTietKiemKeRepository { get; }
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
            DM_NhomThuocTinhRepository = new DM_NhomThuocTinhRepository(_dbContext);
            DM_ThuocTinhRepository = new DM_ThuocTinhRepository(_dbContext);
            DM_SanPhamRepository = new DM_SanPhamRepository(_dbContext);
            DM_ThuocTinhSPRepository = new DM_ThuocTinhSPRepository(_dbContext);
            DM_LoaiDeNghiRepository = new DM_LoaiDeNghiRepository(_dbContext);
            DM_DeNghiDieuDongRepository = new DM_DeNghiDieuDongRepository(_dbContext);
            DM_ChiTietDeNghiDieuDongRepository = new DM_ChiTietDeNghiDieuDongRepository(_dbContext);
            DM_ChiTietNhapHangRepository = new DM_ChiTietNhapHangRepository(_dbContext);
            DM_NhapHangRepository = new DM_NhapHangRepository(_dbContext);
            ThanhToanDonHangRepository = new ThanhToanDonHangRepository(_dbContext);
            ChiTietKhoRepository = new ChiTietKhoRepository(_dbContext);
            DM_XuatHangRepository = new DM_XuatHangRepository(_dbContext);
            DM_ChiTietXuatHangRepository = new DM_ChiTietXuatHangRepository(_dbContext);
            DM_KiemKeRepository = new DM_KiemKeRepository(_dbContext);
            DM_ChiTietKiemKeRepository = new DM_ChiTietKiemKeRepository(_dbContext);
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

        public IDM_NhomThuocTinhRepository DM_NhomThuocTinhRepository { get; }

        public IDM_ThuocTinhRepository DM_ThuocTinhRepository { get; }

        public IDM_SanPhamRepository DM_SanPhamRepository { get; }

        public IDM_ThuocTinhSPRepository DM_ThuocTinhSPRepository { get; }

        public IDM_LoaiDeNghiRepository DM_LoaiDeNghiRepository { get; }

        public IDM_DeNghiDieuDongRepository DM_DeNghiDieuDongRepository { get; }

        public IDM_ChiTietDeNghiDieuDongRepository DM_ChiTietDeNghiDieuDongRepository { get; }

        public IDM_ChiTietNhapHangRepository DM_ChiTietNhapHangRepository { get; }

        public IDM_NhapHangRepository DM_NhapHangRepository { get; }

        public IThanhToanDonHangRepository ThanhToanDonHangRepository { get; }

        public IChiTietKhoRepository ChiTietKhoRepository { get; }

        public IDM_XuatHangRepository DM_XuatHangRepository { get; }

        public IDM_ChiTietXuatHangRepository DM_ChiTietXuatHangRepository { get; }

        public IDM_KiemKeRepository DM_KiemKeRepository { get; }

        public IDM_ChiTietKiemKeRepository DM_ChiTietKiemKeRepository { get; }
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
