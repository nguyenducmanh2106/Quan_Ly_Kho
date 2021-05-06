using Application.MODELS;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Services.ChiTietKhoSerVices

{
    public interface IChiTietKhoServices
    {
        Task CreateOrUpdate(List<ChiTietKhos> obj);
        Task DieuDong(List<ChiTietKhos> obj);
    }
}
