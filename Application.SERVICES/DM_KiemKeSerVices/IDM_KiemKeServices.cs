using Application.MODELS;
using Application.MODELS.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Services.DM_KiemKeSerVices
{
    public interface IDM_KiemKeServices
    {
        Task<List<DM_KiemKes>> getData(DM_KiemKeFilterModel inputModel);
        Task<DM_KiemKes> Create(DM_KiemKes obj);
        Task<DM_KiemKes> Delete(DM_KiemKes obj);
        Task MultiDelete(string listItemDelete);
        Task<DM_KiemKes> FindById(string Code);
        Task<long> ToTalCount(DM_KiemKeFilterModel inputModel);
        Task CanBang(DM_KiemKes obj);
        Task HoanThanh(DM_KiemKes obj);
        Task KiemHang(DM_KiemKes obj);
        Task DangKiemHang(DM_KiemKes obj);
    }
}
