using Application.MODELS;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Services.DM_LoaiSanPhamSerVices
{
    public interface IDM_LoaiSanPhamServices
    {
        Task<IQueryable<DM_LoaiSanPhams>> getData(int page, int pageSize, int Status, string Name);
        Task<IQueryable<DM_LoaiSanPhams>> GetOptions(int Status, string Name);
        Task<List<DM_LoaiSanPhams>> GetAllDataActive();
        Task Create(DM_LoaiSanPhams obj);
        Task Update(DM_LoaiSanPhams obj);
        Task Delete(DM_LoaiSanPhams obj);
        Task MultiDelete(string listItemDelete);
    }
}
