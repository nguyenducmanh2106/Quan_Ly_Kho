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
        DM_DeNghiDieuDongs FindByID_Repository(string Code);
    }
    public class DM_DeNghiDieuDongRepository : Repository<DM_DeNghiDieuDongs>, IDM_DeNghiDieuDongRepository
    {
        private readonly APPDbContext db;
        public DM_DeNghiDieuDongRepository(APPDbContext dbContext) : base(dbContext)
        {
            db = dbContext;
        }
        public DM_DeNghiDieuDongs FindByID_Repository(string Code)
        {
            try
            {
                var data = (
                     from denghi in db.DM_DeNghiDieuDongs
                     join loaidenghi in db.DM_LoaiDeNghis on denghi.LoaiDeNghi_Id equals loaidenghi.Id into tblLoaiDeNghiDefault
                     from loaidenghiEmty in tblLoaiDeNghiDefault.DefaultIfEmpty()
                     where (denghi.Code == Code)
                     select new DM_DeNghiDieuDongs()
                     {
                         Id = denghi.Id,
                         Code = denghi.Code,
                         Created_At = denghi.Created_At,
                         Created_By = denghi.Created_By,
                         Updated_At = denghi.Updated_At,
                         Updated_By = denghi.Updated_By,
                         NgayDuyet = denghi.NgayDuyet,
                         NgayNhanSanPham = denghi.NgayNhanSanPham,
                         TaiKhoanDuyet = denghi.TaiKhoanDuyet,
                         Status = denghi.Status,
                         LoaiDeNghi_Id = denghi.LoaiDeNghi_Id,
                         LyDoTuChoi = denghi.LyDoTuChoi,
                         ID_BoPhanGui = denghi.ID_BoPhanGui,
                         ID_ChiNhanhGui = denghi.ID_ChiNhanhGui,
                         ID_BoPhanNhan = denghi.ID_BoPhanNhan,
                         ID_ChiNhanhNhan = denghi.ID_ChiNhanhNhan,
                         ThoiGianGuiSanPham = denghi.ThoiGianGuiSanPham,
                         Description = denghi.Description,
                         tenLoaiDeNghi = loaidenghiEmty.Name ?? "",
                         tenNguoiGui = db.Users.Where(g => g.Id == denghi.Created_By).SingleOrDefault().FullName ?? "",
                         tenNguoiDuyet = db.Users.Where(g => g.Id == denghi.TaiKhoanDuyet).SingleOrDefault().FullName ?? "",
                         tenChiNhanhGui = db.DM_DonVis.Where(g => g.Id == denghi.ID_ChiNhanhGui).SingleOrDefault().Name ?? "",
                         tenChiNhanhNhan = db.DM_DonVis.Where(g => g.Id == denghi.ID_ChiNhanhNhan).SingleOrDefault().Name ?? "",
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
        public List<DM_DeNghiDieuDongs> getDataTheoChiNhanhNhan(DeNghiDieuDongFilterModel inputModel)
        {
            try
            {
                var data = (
                    from denghi in db.DM_DeNghiDieuDongs
                    join loaidenghi in db.DM_LoaiDeNghis on denghi.LoaiDeNghi_Id equals loaidenghi.Id into tblLoaiDeNghiDefault
                    from loaidenghiEmty in tblLoaiDeNghiDefault.DefaultIfEmpty()
                    where ((inputModel.LoaiDeNghi_Id == -1 || denghi.LoaiDeNghi_Id == inputModel.LoaiDeNghi_Id)
                    && ((inputModel.Status == (int)ContentStatusEnum.All && denghi.Status != (int)ContentStatusEnum.Rollback && denghi.Status != (int)ContentStatusEnum.Revoked) || denghi.Status == inputModel.Status)
                    && (string.IsNullOrEmpty(inputModel.Name) || denghi.Code.ToLower().Contains(inputModel.Name.ToLower()))
                    && (inputModel.ID_ChiNhanhNhan == -1 || denghi.ID_ChiNhanhNhan == inputModel.ID_ChiNhanhNhan)
                    && (inputModel.KhoYeuCau == -1 || denghi.ID_ChiNhanhGui == inputModel.KhoYeuCau)
                    )
                    select new DM_DeNghiDieuDongs()
                    {
                        Id = denghi.Id,
                        Code = denghi.Code,
                        Created_At = denghi.Created_At,
                        Created_By = denghi.Created_By,
                        Updated_At = denghi.Updated_At,
                        Updated_By = denghi.Updated_By,
                        NgayDuyet = denghi.NgayDuyet,
                        NgayNhanSanPham = denghi.NgayNhanSanPham,
                        TaiKhoanDuyet = denghi.TaiKhoanDuyet,
                        Status = denghi.Status,
                        LoaiDeNghi_Id = denghi.LoaiDeNghi_Id,
                        LyDoTuChoi = denghi.LyDoTuChoi,
                        ID_BoPhanGui = denghi.ID_BoPhanGui,
                        ID_ChiNhanhGui = denghi.ID_ChiNhanhGui,
                        ID_BoPhanNhan = denghi.ID_BoPhanNhan,
                        ID_ChiNhanhNhan = denghi.ID_ChiNhanhNhan,
                        ThoiGianGuiSanPham = denghi.ThoiGianGuiSanPham,
                        Description = denghi.Description,
                        tenLoaiDeNghi = loaidenghiEmty.Name ?? "",
                        tenNguoiGui = db.Users.Where(g => g.Id == denghi.Created_By).SingleOrDefault().FullName ?? "",
                        tenNguoiDuyet = db.Users.Where(g => g.Id == denghi.TaiKhoanDuyet).SingleOrDefault().FullName ?? "",
                        tenChiNhanhGui = db.DM_DonVis.Where(g => g.Id == denghi.ID_ChiNhanhGui).SingleOrDefault().Name ?? "",
                        tenChiNhanhNhan = db.DM_DonVis.Where(g => g.Id == denghi.ID_ChiNhanhNhan).SingleOrDefault().Name ?? "",
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
                        case "NgayNhanHang_asc":
                            data = data.OrderBy(g => g.NgayNhanSanPham);
                            break;
                        case "NgayNhanHang_desc":
                            data = data.OrderByDescending(g => g.NgayNhanSanPham);
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
                if (!string.IsNullOrEmpty(inputModel.NgayDuyet))
                {
                    var date = Convert.ToDateTime(inputModel.NgayDuyet).Date;
                    if (inputModel.TypeFilterNgayDuyet == (int)TypeFilter.Bigger_Or_Equal)
                    {
                        data = data.Where(g => (g.NgayDuyet.HasValue && g.NgayDuyet.Value.Date >= date));
                    }
                    if (inputModel.TypeFilterNgayDuyet == (int)TypeFilter.Smaller_Or_Equal)
                    {
                        data = data.Where(g => (g.NgayDuyet.HasValue && g.NgayDuyet.Value.Date <= date));
                    }
                    if (inputModel.TypeFilterNgayDuyet == (int)TypeFilter.Equal)
                    {
                        data = data.Where(g => (g.NgayDuyet.HasValue && g.NgayDuyet.Value.Date == date));
                    }
                }
                if (!string.IsNullOrEmpty(inputModel.NgayNhanSanPham))
                {
                    var date = Convert.ToDateTime(inputModel.NgayNhanSanPham).Date;
                    if (inputModel.TypeFilterNgayNhanSanPham == (int)TypeFilter.Bigger_Or_Equal)
                    {
                        data = data.Where(g => (g.NgayNhanSanPham.HasValue && g.NgayNhanSanPham.Value.Date >= date));
                    }
                    if (inputModel.TypeFilterNgayNhanSanPham == (int)TypeFilter.Smaller_Or_Equal)
                    {
                        data = data.Where(g => (g.NgayNhanSanPham.HasValue && g.NgayNhanSanPham.Value.Date <= date));
                    }
                    if (inputModel.TypeFilterNgayNhanSanPham == (int)TypeFilter.Equal)
                    {
                        data = data.Where(g => (g.NgayNhanSanPham.HasValue && g.NgayNhanSanPham.Value.Date == date));
                    }
                }
                //if (!string.IsNullOrEmpty(inputModel.ThoiGianGuiSanPham))
                //{
                //    var date = Convert.ToDateTime(inputModel.ThoiGianGuiSanPham).Date;
                //    if (inputModel.TypeFilterThoiGianGuiSanPham == (int)TypeFilter.Bigger_Or_Equal)
                //    {
                //        data = data.Where(g => (g.ThoiGianGuiSanPham.HasValue && g.ThoiGianGuiSanPham >= date));
                //    }
                //    if (inputModel.TypeFilterThoiGianGuiSanPham == (int)TypeFilter.Smaller_Or_Equal)
                //    {
                //        data = data.Where(g => (g.ThoiGianGuiSanPham.HasValue && g.ThoiGianGuiSanPham <= date));
                //    }
                //    if (inputModel.TypeFilterThoiGianGuiSanPham == (int)TypeFilter.Equal)
                //    {
                //        data = data.Where(g => (g.ThoiGianGuiSanPham.HasValue && g.ThoiGianGuiSanPham == date));
                //    }
                //}
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
                    && (inputModel.Status == -1 || denghi.Status == inputModel.Status)
                    && (string.IsNullOrEmpty(inputModel.Name) || denghi.Code.ToLower().Contains(inputModel.Name.ToLower()))
                    && (inputModel.ID_ChiNhanhGui == -1 || denghi.ID_ChiNhanhGui == inputModel.ID_ChiNhanhGui)
                    && (inputModel.GuiDenKho == -1 || denghi.ID_ChiNhanhNhan == inputModel.GuiDenKho)
                    )
                    select new DM_DeNghiDieuDongs()
                    {
                        Id = denghi.Id,
                        Code = denghi.Code,
                        Created_At = denghi.Created_At,
                        Created_By = denghi.Created_By,
                        Updated_At = denghi.Updated_At,
                        Updated_By = denghi.Updated_By,
                        NgayDuyet = denghi.NgayDuyet,
                        NgayNhanSanPham = denghi.NgayNhanSanPham,
                        TaiKhoanDuyet = denghi.TaiKhoanDuyet,
                        Status = denghi.Status,
                        LoaiDeNghi_Id = denghi.LoaiDeNghi_Id,
                        LyDoTuChoi = denghi.LyDoTuChoi,
                        ID_BoPhanGui = denghi.ID_BoPhanGui,
                        ID_ChiNhanhGui = denghi.ID_ChiNhanhGui,
                        ID_BoPhanNhan = denghi.ID_BoPhanNhan,
                        ID_ChiNhanhNhan = denghi.ID_ChiNhanhNhan,
                        ThoiGianGuiSanPham = denghi.ThoiGianGuiSanPham,
                        Description = denghi.Description,
                        tenLoaiDeNghi = loaidenghiEmty.Name ?? "",
                        tenNguoiGui = db.Users.Where(g => g.Id == denghi.Created_By).SingleOrDefault().FullName ?? "",
                        tenNguoiDuyet = db.Users.Where(g => g.Id == denghi.TaiKhoanDuyet).SingleOrDefault().FullName ?? "",
                        tenChiNhanhGui = db.DM_DonVis.Where(g => g.Id == denghi.ID_ChiNhanhGui).SingleOrDefault().Name ?? "",
                        tenChiNhanhNhan = db.DM_DonVis.Where(g => g.Id == denghi.ID_ChiNhanhNhan).SingleOrDefault().Name ?? "",
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
                        case "NgayNhanHang_asc":
                            data = data.OrderBy(g => g.NgayNhanSanPham);
                            break;
                        case "NgayNhanHang_desc":
                            data = data.OrderByDescending(g => g.NgayNhanSanPham);
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
                if (!string.IsNullOrEmpty(inputModel.NgayDuyet))
                {
                    var date = Convert.ToDateTime(inputModel.NgayDuyet).Date;
                    if (inputModel.TypeFilterNgayDuyet == (int)TypeFilter.Bigger_Or_Equal)
                    {
                        data = data.Where(g => (g.NgayDuyet.HasValue && g.NgayDuyet.Value.Date >= date));
                    }
                    if (inputModel.TypeFilterNgayDuyet == (int)TypeFilter.Smaller_Or_Equal)
                    {
                        data = data.Where(g => (g.NgayDuyet.HasValue && g.NgayDuyet.Value.Date <= date));
                    }
                    if (inputModel.TypeFilterNgayDuyet == (int)TypeFilter.Equal)
                    {
                        data = data.Where(g => (g.NgayDuyet.HasValue && g.NgayDuyet.Value.Date == date));
                    }
                }
                if (!string.IsNullOrEmpty(inputModel.NgayNhanSanPham))
                {
                    var date = Convert.ToDateTime(inputModel.NgayNhanSanPham).Date;
                    if (inputModel.TypeFilterNgayNhanSanPham == (int)TypeFilter.Bigger_Or_Equal)
                    {
                        data = data.Where(g => (g.NgayNhanSanPham.HasValue && g.NgayNhanSanPham.Value.Date >= date));
                    }
                    if (inputModel.TypeFilterNgayNhanSanPham == (int)TypeFilter.Smaller_Or_Equal)
                    {
                        data = data.Where(g => (g.NgayNhanSanPham.HasValue && g.NgayNhanSanPham.Value.Date <= date));
                    }
                    if (inputModel.TypeFilterNgayNhanSanPham == (int)TypeFilter.Equal)
                    {
                        data = data.Where(g => (g.NgayNhanSanPham.HasValue && g.NgayNhanSanPham.Value.Date == date));
                    }
                }
                //if (!string.IsNullOrEmpty(inputModel.ThoiGianGuiSanPham))
                //{
                //    var date = Convert.ToDateTime(inputModel.ThoiGianGuiSanPham).Date;
                //    if (inputModel.TypeFilterThoiGianGuiSanPham == (int)TypeFilter.Bigger_Or_Equal)
                //    {
                //        data = data.Where(g => (g.ThoiGianGuiSanPham.HasValue && g.ThoiGianGuiSanPham >= date));
                //    }
                //    if (inputModel.TypeFilterThoiGianGuiSanPham == (int)TypeFilter.Smaller_Or_Equal)
                //    {
                //        data = data.Where(g => (g.ThoiGianGuiSanPham.HasValue && g.ThoiGianGuiSanPham <= date));
                //    }
                //    if (inputModel.TypeFilterThoiGianGuiSanPham == (int)TypeFilter.Equal)
                //    {
                //        data = data.Where(g => (g.ThoiGianGuiSanPham.HasValue && g.ThoiGianGuiSanPham == date));
                //    }
                //}
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
