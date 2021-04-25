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
    public interface IDM_DeNghiDieuDongRepository : IRepository<DM_DeNghiDieuDongs>
    {
        List<DM_DeNghiDieuDongs> getDataTheoChiNhanhGui(DeNghiDieuDongFilterModel inputModel);
        List<DM_DeNghiDieuDongs> getDataTheoChiNhanhNhan(DeNghiDieuDongFilterModel inputModel);
        DM_DeNghiDieuDongs FindByID_Repository(int Id);
    }
    public class DM_DeNghiDieuDongRepository : Repository<DM_DeNghiDieuDongs>, IDM_DeNghiDieuDongRepository
    {
        private readonly APPDbContext db;
        public DM_DeNghiDieuDongRepository(APPDbContext dbContext) : base(dbContext)
        {
            db = dbContext;
        }
        public DM_DeNghiDieuDongs FindByID_Repository(int Id)
        {
            try
            {
                var data = (
                     from denghi in db.DM_DeNghiDieuDongs
                     join loaidenghi in db.DM_LoaiDeNghis on denghi.LoaiDeNghi_Id equals loaidenghi.Id into tblLoaiDeNghiDefault
                     from loaidenghiEmty in tblLoaiDeNghiDefault.DefaultIfEmpty()
                     where (denghi.Id == Id)
                     select new DM_DeNghiDieuDongs()
                     {
                         Id = denghi.Id,
                         SoDeNghiDieuDong = denghi.SoDeNghiDieuDong,
                         Created_At = denghi.Created_At,
                         Created_By = denghi.Created_By,
                         Updated_At = denghi.Updated_At,
                         Updated_By = denghi.Updated_By,
                         NgayDuyet = denghi.NgayDuyet,
                         TaiKhoanDuyet = denghi.TaiKhoanDuyet,
                         Status = denghi.Status,
                         LoaiDeNghi_Id = denghi.LoaiDeNghi_Id,
                         LyDoTuChoi = denghi.LyDoTuChoi,
                         ID_BoPhanGui = denghi.ID_BoPhanGui,
                         ID_ChiNhanhGui = denghi.ID_ChiNhanhGui,
                         ID_BoPhanNhan = denghi.ID_BoPhanNhan,
                         ID_ChiNhanhNhan = denghi.ID_ChiNhanhNhan,
                         ThoiGianGuiSanPham = denghi.ThoiGianGuiSanPham,
                         tenLoaiDeNghi = loaidenghiEmty.Name ?? "",
                         tenNguoiGui = db.Users.Where(g => g.Id == denghi.Created_By).SingleOrDefault().FullName ?? "",
                         tenNguoiDuyet = db.Users.Where(g => g.Id == denghi.TaiKhoanDuyet).SingleOrDefault().FullName ?? "",
                         tenChiNhanhGui = db.DM_DonVis.Where(g => g.Id == denghi.ID_ChiNhanhGui).SingleOrDefault().Name ?? "",
                         tenChiNhanhNhan = db.DM_DonVis.Where(g => g.Id == denghi.ID_ChiNhanhNhan).SingleOrDefault().Name ?? "",
                         ChiTietDeNghiDieuDongs = db.DM_ChiTietDeNghiDieuDongs.Where(g => g.ID_DeNghiDieuDong == denghi.Id).ToList()
                     }
                     ).SingleOrDefault();
                return data;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public List<DM_DeNghiDieuDongs> getDataTheoChiNhanhNhan(DeNghiDieuDongFilterModel inputModel)
        {
            try
            {
                var data = (
                    from denghi in db.DM_DeNghiDieuDongs
                    join loaidenghi in db.DM_LoaiDeNghis on denghi.LoaiDeNghi_Id equals loaidenghi.Id into tblLoaiDeNghiDefault
                    from loaidenghiEmty in tblLoaiDeNghiDefault.DefaultIfEmpty()
                    where ((inputModel.LoaiDeNghi_Id == -1 || denghi.LoaiDeNghi_Id == inputModel.LoaiDeNghi_Id)
                    && (denghi.Status == inputModel.Status) && (string.IsNullOrEmpty(inputModel.Name) || denghi.SoDeNghiDieuDong.ToLower().Contains(inputModel.Name.ToLower()))
                    && (inputModel.ID_ChiNhanhNhan == -1 || denghi.ID_ChiNhanhNhan == inputModel.ID_ChiNhanhNhan)
                    )
                    select new DM_DeNghiDieuDongs()
                    {
                        Id = denghi.Id,
                        SoDeNghiDieuDong = denghi.SoDeNghiDieuDong,
                        Created_At = denghi.Created_At,
                        Created_By = denghi.Created_By,
                        Updated_At = denghi.Updated_At,
                        Updated_By = denghi.Updated_By,
                        NgayDuyet = denghi.NgayDuyet,
                        TaiKhoanDuyet = denghi.TaiKhoanDuyet,
                        Status = denghi.Status,
                        LoaiDeNghi_Id = denghi.LoaiDeNghi_Id,
                        LyDoTuChoi = denghi.LyDoTuChoi,
                        ID_BoPhanGui = denghi.ID_BoPhanGui,
                        ID_ChiNhanhGui = denghi.ID_ChiNhanhGui,
                        ID_BoPhanNhan = denghi.ID_BoPhanNhan,
                        ID_ChiNhanhNhan = denghi.ID_ChiNhanhNhan,
                        ThoiGianGuiSanPham = denghi.ThoiGianGuiSanPham,
                        tenLoaiDeNghi = loaidenghiEmty.Name ?? "",
                        tenNguoiGui = db.Users.Where(g => g.Id == denghi.Created_By).SingleOrDefault().FullName ?? "",
                        tenNguoiDuyet = db.Users.Where(g => g.Id == denghi.TaiKhoanDuyet).SingleOrDefault().FullName ?? "",
                        tenChiNhanhGui = db.DM_DonVis.Where(g => g.Id == denghi.ID_ChiNhanhGui).SingleOrDefault().Name ?? "",
                        tenChiNhanhNhan = db.DM_DonVis.Where(g => g.Id == denghi.ID_ChiNhanhNhan).SingleOrDefault().Name ?? "",
                    }
                    );
                if (!string.IsNullOrEmpty(inputModel.nameSort))
                {
                    switch (inputModel.nameSort)
                    {
                        case "Name_asc":
                            data = data.OrderBy(g => g.SoDeNghiDieuDong);
                            break;
                        case "Name_desc":
                            data = data.OrderByDescending(g => g.SoDeNghiDieuDong);
                            break;
                        default:
                            data = data.OrderByDescending(g => g.Created_At);
                            break;
                    }
                }
                if (!string.IsNullOrEmpty(inputModel.NgayTao))
                {
                    if (inputModel.TypeFilterNgayTao == (int)TypeFilter.Bigger_Or_Equal)
                    {
                        var date = Convert.ToDateTime(inputModel.NgayTao);
                        data = data.Where(g => g.Created_At >= date);
                    }
                    if (inputModel.TypeFilterNgayTao == (int)TypeFilter.Smaller_Or_Equal)
                    {
                        var date = Convert.ToDateTime(inputModel.NgayTao);
                        data = data.Where(g => g.Created_At <= date);
                    }
                    if (inputModel.TypeFilterNgayTao == (int)TypeFilter.Equal)
                    {
                        var date = Convert.ToDateTime(inputModel.NgayTao);
                        data = data.Where(g => g.Created_At == date);
                    }
                }
                if (!string.IsNullOrEmpty(inputModel.NgayDuyet))
                {
                    if (inputModel.TypeFilterNgayTao == (int)TypeFilter.Bigger_Or_Equal)
                    {
                        var date = Convert.ToDateTime(inputModel.NgayDuyet);
                        data = data.Where(g => g.NgayDuyet >= date);
                    }
                    if (inputModel.TypeFilterNgayTao == (int)TypeFilter.Smaller_Or_Equal)
                    {
                        var date = Convert.ToDateTime(inputModel.NgayDuyet);
                        data = data.Where(g => g.NgayDuyet <= date);
                    }
                    if (inputModel.TypeFilterNgayTao == (int)TypeFilter.Equal)
                    {
                        var date = Convert.ToDateTime(inputModel.NgayDuyet);
                        data = data.Where(g => g.NgayDuyet == date);
                    }
                }
                if (!string.IsNullOrEmpty(inputModel.ThoiGianGuiSanPham))
                {
                    if (inputModel.TypeFilterNgayTao == (int)TypeFilter.Bigger_Or_Equal)
                    {
                        var date = Convert.ToDateTime(inputModel.ThoiGianGuiSanPham);
                        data = data.Where(g => g.ThoiGianGuiSanPham >= date);
                    }
                    if (inputModel.TypeFilterNgayTao == (int)TypeFilter.Smaller_Or_Equal)
                    {
                        var date = Convert.ToDateTime(inputModel.ThoiGianGuiSanPham);
                        data = data.Where(g => g.ThoiGianGuiSanPham <= date);
                    }
                    if (inputModel.TypeFilterNgayTao == (int)TypeFilter.Equal)
                    {
                        var date = Convert.ToDateTime(inputModel.ThoiGianGuiSanPham);
                        data = data.Where(g => g.ThoiGianGuiSanPham == date);
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
        public List<DM_DeNghiDieuDongs> getDataTheoChiNhanhGui(DeNghiDieuDongFilterModel inputModel)
        {
            try
            {
                var data = (
                    from denghi in db.DM_DeNghiDieuDongs
                    join loaidenghi in db.DM_LoaiDeNghis on denghi.LoaiDeNghi_Id equals loaidenghi.Id into tblLoaiDeNghiDefault
                    from loaidenghiEmty in tblLoaiDeNghiDefault.DefaultIfEmpty()
                    where ((inputModel.LoaiDeNghi_Id == -1 || denghi.LoaiDeNghi_Id == inputModel.LoaiDeNghi_Id)
                    && (denghi.Status == inputModel.Status) && (string.IsNullOrEmpty(inputModel.Name) || denghi.SoDeNghiDieuDong.ToLower().Contains(inputModel.Name.ToLower()))
                    && (inputModel.ID_ChiNhanhGui == -1 || denghi.ID_ChiNhanhGui == inputModel.ID_ChiNhanhGui)
                    )
                    select new DM_DeNghiDieuDongs()
                    {
                        Id = denghi.Id,
                        SoDeNghiDieuDong = denghi.SoDeNghiDieuDong,
                        Created_At = denghi.Created_At,
                        Created_By = denghi.Created_By,
                        Updated_At = denghi.Updated_At,
                        Updated_By = denghi.Updated_By,
                        NgayDuyet = denghi.NgayDuyet,
                        TaiKhoanDuyet = denghi.TaiKhoanDuyet,
                        Status = denghi.Status,
                        LoaiDeNghi_Id = denghi.LoaiDeNghi_Id,
                        LyDoTuChoi = denghi.LyDoTuChoi,
                        ID_BoPhanGui = denghi.ID_BoPhanGui,
                        ID_ChiNhanhGui = denghi.ID_ChiNhanhGui,
                        ID_BoPhanNhan = denghi.ID_BoPhanNhan,
                        ID_ChiNhanhNhan = denghi.ID_ChiNhanhNhan,
                        ThoiGianGuiSanPham = denghi.ThoiGianGuiSanPham,
                        tenLoaiDeNghi = loaidenghiEmty.Name ?? "",
                        tenNguoiGui = db.Users.Where(g => g.Id == denghi.Created_By).SingleOrDefault().FullName ?? "",
                        tenNguoiDuyet = db.Users.Where(g => g.Id == denghi.TaiKhoanDuyet).SingleOrDefault().FullName ?? "",
                        tenChiNhanhGui = db.DM_DonVis.Where(g => g.Id == denghi.ID_ChiNhanhGui).SingleOrDefault().Name ?? "",
                        tenChiNhanhNhan = db.DM_DonVis.Where(g => g.Id == denghi.ID_ChiNhanhNhan).SingleOrDefault().Name ?? "",
                    }
                    );
                if (!string.IsNullOrEmpty(inputModel.nameSort))
                {
                    switch (inputModel.nameSort)
                    {
                        case "Name_asc":
                            data = data.OrderBy(g => g.SoDeNghiDieuDong);
                            break;
                        case "Name_desc":
                            data = data.OrderByDescending(g => g.SoDeNghiDieuDong);
                            break;
                        default:
                            data = data.OrderByDescending(g => g.Created_At);
                            break;
                    }
                }
                if (!string.IsNullOrEmpty(inputModel.NgayTao))
                {
                    if (inputModel.TypeFilterNgayTao == (int)TypeFilter.Bigger_Or_Equal)
                    {
                        var date = Convert.ToDateTime(inputModel.NgayTao);
                        data = data.Where(g => g.Created_At >= date);
                    }
                    if (inputModel.TypeFilterNgayTao == (int)TypeFilter.Smaller_Or_Equal)
                    {
                        var date = Convert.ToDateTime(inputModel.NgayTao);
                        data = data.Where(g => g.Created_At <= date);
                    }
                    if (inputModel.TypeFilterNgayTao == (int)TypeFilter.Equal)
                    {
                        var date = Convert.ToDateTime(inputModel.NgayTao);
                        data = data.Where(g => g.Created_At == date);
                    }
                }
                if (!string.IsNullOrEmpty(inputModel.NgayDuyet))
                {
                    if (inputModel.TypeFilterNgayTao == (int)TypeFilter.Bigger_Or_Equal)
                    {
                        var date = Convert.ToDateTime(inputModel.NgayDuyet);
                        data = data.Where(g => g.NgayDuyet >= date);
                    }
                    if (inputModel.TypeFilterNgayTao == (int)TypeFilter.Smaller_Or_Equal)
                    {
                        var date = Convert.ToDateTime(inputModel.NgayDuyet);
                        data = data.Where(g => g.NgayDuyet <= date);
                    }
                    if (inputModel.TypeFilterNgayTao == (int)TypeFilter.Equal)
                    {
                        var date = Convert.ToDateTime(inputModel.NgayDuyet);
                        data = data.Where(g => g.NgayDuyet == date);
                    }
                }
                if (!string.IsNullOrEmpty(inputModel.ThoiGianGuiSanPham))
                {
                    if (inputModel.TypeFilterNgayTao == (int)TypeFilter.Bigger_Or_Equal)
                    {
                        var date = Convert.ToDateTime(inputModel.ThoiGianGuiSanPham);
                        data = data.Where(g => g.ThoiGianGuiSanPham >= date);
                    }
                    if (inputModel.TypeFilterNgayTao == (int)TypeFilter.Smaller_Or_Equal)
                    {
                        var date = Convert.ToDateTime(inputModel.ThoiGianGuiSanPham);
                        data = data.Where(g => g.ThoiGianGuiSanPham <= date);
                    }
                    if (inputModel.TypeFilterNgayTao == (int)TypeFilter.Equal)
                    {
                        var date = Convert.ToDateTime(inputModel.ThoiGianGuiSanPham);
                        data = data.Where(g => g.ThoiGianGuiSanPham == date);
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
