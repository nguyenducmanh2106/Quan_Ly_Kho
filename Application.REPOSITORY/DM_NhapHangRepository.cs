using Application.Data;
using Application.MODELS;
using Application.MODELS.ViewModels;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;
using System.Linq;
using Application.UTILS;

namespace Application.REPOSITORY
{
    public interface IDM_NhapHangRepository : IRepository<DM_NhapHangs>
    {
        List<DM_NhapHangs> getData(DM_NhapHangFilterModel inputModel);
        DM_NhapHangs FindByID_Repository(string Code);
    }
    public class DM_NhapHangRepository : Repository<DM_NhapHangs>, IDM_NhapHangRepository
    {
        private readonly APPDbContext db;
        public DM_NhapHangRepository(APPDbContext dbContext) : base(dbContext)
        {
            db = dbContext;
        }
        public DM_NhapHangs FindByID_Repository(string Code)
        {
            try
            {
                var data = (
                     from denghi in db.DM_NhapHangs
                     where (denghi.Code == Code)
                     select new DM_NhapHangs()
                     {
                         Id = denghi.Id,
                         Code = denghi.Code,
                         Created_At = denghi.Created_At,
                         Created_By = denghi.Created_By,
                         Updated_At = denghi.Updated_At,
                         Updated_By = denghi.Updated_By,
                         NgayDuyet = denghi.NgayDuyet,
                         TaiKhoanDuyet = denghi.TaiKhoanDuyet,
                         Status = denghi.Status,
                         ID_ChiNhanhNhan = denghi.ID_ChiNhanhNhan,
                         NgayHenGiao = denghi.NgayHenGiao,
                         NgayNhapKho = denghi.NgayNhapKho,
                         ID_NhaCungCap = denghi.ID_NhaCungCap,
                         Description = denghi.Description,
                         tenNhaCungCap = db.DM_NhaCungCaps.Where(g => g.Id == denghi.ID_NhaCungCap).SingleOrDefault().Name ?? "",
                         tenChiNhanhNhan = db.DM_DonVis.Where(g => g.Id == denghi.ID_ChiNhanhNhan).SingleOrDefault().Name ?? "",
                         tenNguoiDuyet = db.Users.Where(g => g.Id == denghi.TaiKhoanDuyet).SingleOrDefault().FullName ?? "",
                         tenNguoiTao = db.Users.Where(g => g.Id == denghi.Created_By).SingleOrDefault().FullName ?? "",
                         //ChiTietDeNghiDieuDongs = db.DM_ChiTietDeNghiDieuDongs.Where(g => g.ID_DeNghiDieuDong == denghi.Id).ToList()
                     }
                     ).SingleOrDefault();
                return data;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public List<DM_NhapHangs> getData(DM_NhapHangFilterModel inputModel)
        {
            try
            {
                var data = (
                    from denghi in db.DM_NhapHangs
                    where (((inputModel.Status == (int)ContentStatusEnum.All && denghi.Status != (int)ContentStatusEnum.Rollback && denghi.Status != (int)ContentStatusEnum.Revoked) || denghi.Status == inputModel.Status)
                    && (string.IsNullOrEmpty(inputModel.Name) || denghi.Code.ToLower().Contains(inputModel.Name.ToLower()))
                    && (inputModel.ID_ChiNhanhNhan == -1 || denghi.ID_ChiNhanhNhan == inputModel.ID_ChiNhanhNhan)
                    )
                    select new DM_NhapHangs()
                    {
                        Id = denghi.Id,
                        Code = denghi.Code,
                        Created_At = denghi.Created_At,
                        Created_By = denghi.Created_By,
                        Updated_At = denghi.Updated_At,
                        Updated_By = denghi.Updated_By,
                        NgayDuyet = denghi.NgayDuyet,
                        TaiKhoanDuyet = denghi.TaiKhoanDuyet,
                        Status = denghi.Status,
                        ID_ChiNhanhNhan = denghi.ID_ChiNhanhNhan,
                        NgayHenGiao = denghi.NgayHenGiao,
                        NgayNhapKho = denghi.NgayNhapKho,
                        ID_NhaCungCap = denghi.ID_NhaCungCap,
                        Description = denghi.Description,
                        tenNhaCungCap = db.DM_NhaCungCaps.Where(g => g.Id == denghi.ID_NhaCungCap).SingleOrDefault().Name ?? "",
                        tenChiNhanhNhan = db.DM_DonVis.Where(g => g.Id == denghi.ID_ChiNhanhNhan).SingleOrDefault().Name ?? "",
                        tenNguoiDuyet = db.Users.Where(g => g.Id == denghi.TaiKhoanDuyet).SingleOrDefault().FullName ?? "",
                        tenNguoiTao = db.Users.Where(g => g.Id == denghi.Created_By).SingleOrDefault().FullName ?? "",
                    }
                    );
                if (!string.IsNullOrEmpty(inputModel.nameSort))
                {
                    switch (inputModel.nameSort)
                    {
                        case "Created_At_asc":
                            data = data.OrderBy(g => g.Created_At);
                            break;
                        case "Created_At_desc":
                            data = data.OrderByDescending(g => g.Created_At);
                            break;
                        case "NgayDuyet_asc":
                            data = data.OrderBy(g => g.NgayDuyet);
                            break;
                        case "NgayDuyet_desc":
                            data = data.OrderByDescending(g => g.NgayDuyet);
                            break;
                        default:
                            data = data.OrderByDescending(g => g.Created_At);
                            break;
                    }
                }
                if (!string.IsNullOrEmpty(inputModel.NgayTao))
                {
                    var date = Convert.ToDateTime(inputModel.NgayTao).Date;
                    if (inputModel.TypeFilterNgayTao == (int)TypeFilter.Bigger_Or_Equal)
                    {
                        data = data.Where(g => g.Created_At.Date >= date);
                    }
                    if (inputModel.TypeFilterNgayTao == (int)TypeFilter.Smaller_Or_Equal)
                    {
                        data = data.Where(g => g.Created_At.Date <= date);
                    }
                    if (inputModel.TypeFilterNgayTao == (int)TypeFilter.Equal)
                    {
                        data = data.Where(g => g.Created_At.Date == date);
                    }
                }
                if (!string.IsNullOrEmpty(inputModel.NgayNhapKho))
                {
                    var date = Convert.ToDateTime(inputModel.NgayNhapKho).Date;
                    if (inputModel.TypeFilterNgayNhapKho == (int)TypeFilter.Bigger_Or_Equal)
                    {
                        data = data.Where(g => (g.NgayNhapKho.HasValue && g.NgayNhapKho >= date));
                    }
                    if (inputModel.TypeFilterNgayNhapKho == (int)TypeFilter.Smaller_Or_Equal)
                    {
                        data = data.Where(g => (g.NgayNhapKho.HasValue && g.NgayNhapKho <= date));
                    }
                    if (inputModel.TypeFilterNgayNhapKho == (int)TypeFilter.Equal)
                    {
                        data = data.Where(g => (g.NgayNhapKho.HasValue && g.NgayNhapKho == date));
                    }
                }
                if (!string.IsNullOrEmpty(inputModel.NgayDuyet))
                {
                    var date = Convert.ToDateTime(inputModel.NgayDuyet).Date;
                    if (inputModel.TypeFilterNgayDuyet == (int)TypeFilter.Bigger_Or_Equal)
                    {
                        data = data.Where(g => (g.NgayDuyet.HasValue && g.NgayDuyet >= date));
                    }
                    if (inputModel.TypeFilterNgayDuyet == (int)TypeFilter.Smaller_Or_Equal)
                    {
                        data = data.Where(g => (g.NgayDuyet.HasValue && g.NgayDuyet <= date));
                    }
                    if (inputModel.TypeFilterNgayDuyet == (int)TypeFilter.Equal)
                    {
                        data = data.Where(g => (g.NgayDuyet.HasValue && g.NgayDuyet == date));
                    }
                }
                if (!string.IsNullOrEmpty(inputModel.NgayHenGiao))
                {
                    var date = Convert.ToDateTime(inputModel.NgayHenGiao).Date;
                    if (inputModel.TypeFilterNgayHenGiao == (int)TypeFilter.Bigger_Or_Equal)
                    {
                        data = data.Where(g => (g.NgayHenGiao.HasValue && g.NgayHenGiao >= date));
                    }
                    if (inputModel.TypeFilterNgayHenGiao == (int)TypeFilter.Smaller_Or_Equal)
                    {
                        data = data.Where(g => (g.NgayHenGiao.HasValue && g.NgayHenGiao <= date));
                    }
                    if (inputModel.TypeFilterNgayHenGiao == (int)TypeFilter.Equal)
                    {
                        data = data.Where(g => (g.NgayHenGiao.HasValue && g.NgayHenGiao == date));
                    }
                }
                var result = data.Skip((inputModel.page - 1) * inputModel.pageSize).Take(inputModel.pageSize).ToList();
                return result;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
