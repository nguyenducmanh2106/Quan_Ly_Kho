using System;
using System.Collections.Generic;
using System.Text;

namespace Application.Data
{
    public interface ITransaction : IDisposable
    {
        void Commit();
        void Rollback();
    }
}
