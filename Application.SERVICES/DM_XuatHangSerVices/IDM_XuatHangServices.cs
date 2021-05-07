using Application.MODELS;
using Application.MODELS.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Services.DM_XuatHangSerVices
{
    public interface IDM_XuatHangServices
    {
        Task<List<DM_XuatHangs>> getData(DM_XuatHangFilterModel inputModel);
        Task<DM_XuatHangs> Create(DM_XuatHangs obj);
        Task Update(DM_XuatHangs obj);
        Task<DM_XuatHangs> Delete(DM_XuatHangs obj);
        Task MultiDelete(string listItemDelete);
        Task<DM_XuatHangs> FindById(string Code);
        Task ToggleStatus(DM_XuatHangs obj);
        Task<long> ToTalCount(DM_XuatHangFilterModel inputModel);
        Task TuChoi(DM_XuatHangs obj);
        Task PheDuyet(DM_XuatHangs obj);
        Task HoanThanh(DM_XuatHangs obj);
        Task XuatHang(DM_XuatHangs obj);
    }
}
