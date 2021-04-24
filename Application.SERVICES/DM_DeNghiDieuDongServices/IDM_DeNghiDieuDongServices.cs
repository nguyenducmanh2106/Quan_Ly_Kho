using Application.MODELS;
using Application.MODELS.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Services.DM_DeNghiDieuDongSerVices
{
    public interface IDM_DeNghiDieuDongServices
    {
        Task<List<DM_DeNghiDieuDongs>> getData(DeNghiDieuDongFilterModel inputModel);
        Task<DM_DeNghiDieuDongs> Create(DM_DeNghiDieuDongs obj);
        Task Update(DM_DeNghiDieuDongs obj);
        Task<DM_DeNghiDieuDongs> Delete(DM_DeNghiDieuDongs obj);
        Task MultiDelete(string listItemDelete);
        Task<DM_DeNghiDieuDongs> FindById(int id);
        Task<long> ToTalCount(DeNghiDieuDongFilterModel inputModel);
    }
}
