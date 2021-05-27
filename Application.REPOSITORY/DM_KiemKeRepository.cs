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
    public interface IDM_KiemKeRepository : IRepository<DM_KiemKes>
    {
        List<DM_KiemKes> getData(DM_KiemKeFilterModel inputModel);
        DM_KiemKes FindByID_Repository(string Code);
    }
    public class DM_KiemKeRepository : Repository<DM_KiemKes>, IDM_KiemKeRepository
    {
        private readonly APPDbContext db;
        public DM_KiemKeRepository(APPDbContext dbContext) : base(dbContext)
        {
            db = dbContext;
        }
        public DM_KiemKes FindByID_Repository(string Code)
        {
            try
            {
                var data = (
                     from denghi in db.DM_KiemKes
                     where (denghi.Code == Code)
                     select new DM_KiemKes()
                     {
                         Id = denghi.Id,
                         Code = denghi.Code,
                         Created_At = denghi.Created_At,
                         Created_By = denghi.Created_By,
                         Status = denghi.Status,
                         Id_ChiNhanh = denghi.Id_ChiNhanh,
                         NhanVienKiem = denghi.NhanVienKiem,
                         NgayKiem = denghi.NgayKiem,
                         NhanVienCanBang = denghi.NhanVienCanBang,
                         NgayCanBang = denghi.NgayCanBang,
                         GhiChu = denghi.GhiChu,
                         NgayHoanThanh = denghi.NgayHoanThanh,
                         tenChiNhanh = db.DM_DonVis.Where(g => g.Id == denghi.Id_ChiNhanh).SingleOrDefault().Name ?? "",
                         tenNguoiCanBang = db.Users.Where(g => g.Id == denghi.NhanVienCanBang).SingleOrDefault().FullName ?? "",
                         tenNguoiTao = db.Users.Where(g => g.Id == denghi.Created_By).SingleOrDefault().FullName ?? "",
                         tenNguoiKiem = db.Users.Where(g => g.Id == denghi.NhanVienKiem).SingleOrDefault().FullName ?? "",
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
        public List<DM_KiemKes> getData(DM_KiemKeFilterModel inputModel)
        {
            try
            {
                var data = (
                    from denghi in db.DM_KiemKes
                    where (((inputModel.Status == (int)ContentStatusEnum.All || denghi.Status == inputModel.Status))
                    && (inputModel.Id_ChiNhanh == -1 || denghi.Id_ChiNhanh == inputModel.Id_ChiNhanh)
                    )
                    select new DM_KiemKes()
                    {
                        Id = denghi.Id,
                        Code = denghi.Code,
                        Created_At = denghi.Created_At,
                        Created_By = denghi.Created_By,
                        Status = denghi.Status,
                        Id_ChiNhanh = denghi.Id_ChiNhanh,
                        NhanVienKiem = denghi.NhanVienKiem,
                        NgayKiem = denghi.NgayKiem,
                        NhanVienCanBang = denghi.NhanVienCanBang,
                        NgayCanBang = denghi.NgayCanBang,
                        GhiChu = denghi.GhiChu,
                        NgayHoanThanh = denghi.NgayHoanThanh,
                        tenChiNhanh = db.DM_DonVis.Where(g => g.Id == denghi.Id_ChiNhanh).SingleOrDefault().Name ?? "",
                        tenNguoiCanBang = db.Users.Where(g => g.Id == denghi.NhanVienCanBang).SingleOrDefault().FullName ?? "",
                        tenNguoiTao = db.Users.Where(g => g.Id == denghi.Created_By).SingleOrDefault().FullName ?? "",
                        tenNguoiKiem = db.Users.Where(g => g.Id == denghi.NhanVienKiem).SingleOrDefault().FullName ?? "",
                    }
                    );
                if (!string.IsNullOrEmpty(inputModel.TuNgay))
                {
                    var dateTuNgay = Convert.ToDateTime(inputModel.TuNgay).Date;
                    data = data.Where(g => g.Created_At.Date >= dateTuNgay);
                }
                if (!string.IsNullOrEmpty(inputModel.DenNgay))
                {
                    var dateDenNgay = Convert.ToDateTime(inputModel.DenNgay).Date;
                    data = data.Where(g => g.Created_At.Date <= dateDenNgay);
                }
                if (!string.IsNullOrEmpty(inputModel.nameSort))
                {
                    switch (inputModel.nameSort)
                    {
                        case "NgayTao_asc":
                            data = data.OrderBy(g => g.Created_At);
                            break;
                        case "NgayTao_desc":
                            data = data.OrderByDescending(g => g.Created_At);
                            break;
                        case "NgayKiem_asc":
                            data = data.OrderBy(g => g.NgayKiem);
                            break;
                        case "NgayKiem_desc":
                            data = data.OrderByDescending(g => g.NgayKiem);
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
                if (!string.IsNullOrEmpty(inputModel.NgayKiem))
                {
                    var date = Convert.ToDateTime(inputModel.NgayKiem).Date;
                    if (inputModel.TypeFilterNgayKiem == (int)TypeFilter.Bigger_Or_Equal)
                    {
                        data = data.Where(g => (g.NgayKiem.HasValue && g.NgayKiem.Value.Date >= date));
                    }
                    if (inputModel.TypeFilterNgayKiem == (int)TypeFilter.Smaller_Or_Equal)
                    {
                        data = data.Where(g => (g.NgayKiem.HasValue && g.NgayKiem.Value.Date <= date));
                    }
                    if (inputModel.TypeFilterNgayKiem == (int)TypeFilter.Equal)
                    {
                        data = data.Where(g => (g.NgayKiem.HasValue && g.NgayKiem.Value.Date == date));
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
