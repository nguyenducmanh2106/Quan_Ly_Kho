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
        Task<List<DM_SanPhams>> getAllActive();
        Task<List<DM_SanPhams>> FindByName(string name);
        Task<List<DM_SanPhams>> FindByNameById_Kho(string name,int Id_kho);
        Task<DM_SanPhams> Create(DM_SanPhams obj);
        Task Update(DM_SanPhams obj);
        Task ToggleStatus(DM_SanPhams obj);
        Task<DM_SanPhams> Delete(DM_SanPhams obj);
        Task MultiDelete(string listItemDelete);
        Task<DM_SanPhams> FindById(string Code);
        Task<long> ToTalCount(SanPhamFilterModel inputModel);
    }
}
