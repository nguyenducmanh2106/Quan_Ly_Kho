using Microsoft.EntityFrameworkCore.Storage;
using System;
using System.Collections.Generic;
using System.Text;

namespace Application.Data
{
    public class Transaction : ITransaction
    {
        private IDbContextTransaction _inner;

        public Transaction(IDbContextTransaction transaction)
        {
            _inner = transaction;
        }

        public void Dispose()
        {
            _inner.Dispose();
            _inner = null;
            GC.SuppressFinalize(this);
        }

        public void Commit()
        {
            _inner.Commit();
        }

        public void Rollback()
        {
            _inner.Rollback();
        }
    }
}
