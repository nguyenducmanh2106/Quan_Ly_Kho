﻿using Application.MODELS;
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
        IUser_DonViRepository User_DonViRepository { get; }
        IRoleRepository RoleRepository { get; }
        IMenuRepository MenuRepository { get; }
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
            User_DonViRepository = new User_DonViRepository(_dbContext);
            RoleRepository = new RoleRepository(_dbContext);
            MenuRepository = new MenuRepository(_dbContext);
        }
        public IUserRepository UserRepository { get; }

        public IDM_ChucVuRepository DM_ChucVuRepository { get; }

        public IUser_DonViRepository User_DonViRepository { get; }

        public IRoleRepository RoleRepository { get; }


        public IMenuRepository MenuRepository { get; }
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