using System;
using System.Collections.Generic;
using System.Text;

namespace Application.MODELS.ViewModels
{

    public partial class Menus
    {
        private readonly APPDbContext db;
        public Menus(APPDbContext db)
        {
            this.db = db;
        }
    
    }

}
