using Application.MODELS;
using Application.MODELS.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Services.DM_NhapHangSerVices
{
    public interface IDM_NhapHangServices
    {
        Task<List<DM_NhapHangs>> getData(DM_NhapHangFilterModel inputModel);
        Task<DM_NhapHangs> Create(DM_NhapHangs obj);
        Task Update(DM_NhapHangs obj);
        Task<DM_NhapHangs> Delete(DM_NhapHangs obj);
        Task MultiDelete(string listItemDelete);
        Task<DM_NhapHangs> FindById(string Code);
        Task ToggleStatus(DM_NhapHangs obj);
        Task<long> ToTalCount(DM_NhapHangFilterModel inputModel);
        Task TuChoi(DM_NhapHangs obj);
        Task PheDuyet(DM_NhapHangs obj);
        Task HoanThanh(DM_NhapHangs obj);
        Task NhanHang(DM_NhapHangs obj);
    }
}
