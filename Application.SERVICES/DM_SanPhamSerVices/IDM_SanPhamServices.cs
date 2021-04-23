using Application.MODELS;
using Application.MODELS.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Services.DM_SanPhamSerVices
{
    public interface IDM_SanPhamServices
    {
        Task<List<DM_SanPhams>> getData(SanPhamFilterModel inputModel);
        Task<DM_SanPhams> Create(DM_SanPhams obj);
        Task Update(DM_SanPhams obj);
        Task ToggleStatus(DM_SanPhams obj);
        Task Delete(DM_SanPhams obj);
        Task MultiDelete(string listItemDelete);
        Task<DM_SanPhams> FindById(int id);
        Task<long> ToTalCount(SanPhamFilterModel inputModel);
    }
}
