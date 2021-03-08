using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Data
{
    public abstract class DbContextBase : DbContext
    {
        protected DbContextBase() : base()
        {

        }

        protected DbContextBase(DbContextOptions options) : base(options)
        {

        }
    }

}
