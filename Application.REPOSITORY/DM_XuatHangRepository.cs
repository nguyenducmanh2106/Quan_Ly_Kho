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
    public interface IDM_XuatHangRepository : IRepository<DM_XuatHangs>
    {
        List<DM_XuatHangs> getData(DM_XuatHangFilterModel inputModel);
        DM_XuatHangs FindByID_Repository(string Code);
    }
    public class DM_XuatHangRepository : Repository<DM_XuatHangs>, IDM_XuatHangRepository
    {
        private readonly APPDbContext db;
        public DM_XuatHangRepository(APPDbContext dbContext) : base(dbContext)
        {
            db = dbContext;
        }
        public DM_XuatHangs FindByID_Repository(string Code)
        {
            try
            {
                var data = (
                     from denghi in db.DM_XuatHangs
                     where (denghi.Code == Code)
                     select new DM_XuatHangs()
                     {
                         Id = denghi.Id,
                         Code = denghi.Code,
                         Created_At = denghi.Created_At,
                         Created_By = denghi.Created_By,
                         Updated_At = denghi.Updated_At,
                         Updated_By = denghi.Updated_By,
                         NgayDuyet = denghi.NgayDuyet,
                         TaiKhoanDuyet = denghi.TaiKhoanDuyet,
                         TongSoLuong = denghi.TongSoLuong,
                         TongTien = denghi.TongTien,
                         TongTienPhaiTra = denghi.TongTienPhaiTra,
                         Status = denghi.Status,
                         ChietKhau = denghi.ChietKhau,
                         ID_ChiNhanhNhan = denghi.ID_ChiNhanhNhan,
                         NgayHenGiao = denghi.NgayHenGiao,
                         NgayXuatKho = denghi.NgayXuatKho,
                         NgayHuyDon = denghi.NgayHuyDon,
                         NgayHoanThanh = denghi.NgayHoanThanh,
                         ID_NhaCungCap = denghi.ID_NhaCungCap,
                         Description = denghi.Description,
                         LoaiXuatHang = denghi.LoaiXuatHang,
                         KhachHang = denghi.KhachHang,
                         SdtKhachHang = denghi.SdtKhachHang,
                         nhaCungCaps = db.DM_NhaCungCaps.Where(g => g.Id == denghi.ID_NhaCungCap).SingleOrDefault(),
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
        public List<DM_XuatHangs> getData(DM_XuatHangFilterModel inputModel)
        {
            try
            {
                var data = (
                    from denghi in db.DM_XuatHangs
                    where (((inputModel.Status == (int)ContentStatusEnum.All || denghi.Status == inputModel.Status))
                    && (string.IsNullOrEmpty(inputModel.Name) || denghi.Code.ToLower().Contains(inputModel.Name.ToLower()))
                    && (inputModel.ID_ChiNhanhNhan == -1 || denghi.ID_ChiNhanhNhan == inputModel.ID_ChiNhanhNhan)
                    && (inputModel.NhaCungCap == -1 || denghi.ID_NhaCungCap == inputModel.NhaCungCap)
                    )
                    orderby denghi.Created_At descending
                    select new DM_XuatHangs()
                    {
                        Id = denghi.Id,
                        Code = denghi.Code,
                        Created_At = denghi.Created_At,
                        Created_By = denghi.Created_By,
                        Updated_At = denghi.Updated_At,
                        Updated_By = denghi.Updated_By,
                        NgayDuyet = denghi.NgayDuyet,
                        TaiKhoanDuyet = denghi.TaiKhoanDuyet,
                        TongSoLuong = denghi.TongSoLuong,
                        TongTien = denghi.TongTien,
                        TongTienPhaiTra = denghi.TongTienPhaiTra,
                        Status = denghi.Status,
                        ChietKhau = denghi.ChietKhau,
                        ID_ChiNhanhNhan = denghi.ID_ChiNhanhNhan,
                        NgayHenGiao = denghi.NgayHenGiao,
                        NgayXuatKho = denghi.NgayXuatKho,
                        NgayHuyDon = denghi.NgayHuyDon,
                        NgayHoanThanh = denghi.NgayHoanThanh,
                        ID_NhaCungCap = denghi.ID_NhaCungCap,
                        Description = denghi.Description,
                        LoaiXuatHang = denghi.LoaiXuatHang,
                        KhachHang = denghi.KhachHang,
                        SdtKhachHang = denghi.SdtKhachHang,
                        tenNhaCungCap = db.DM_NhaCungCaps.Where(g => g.Id == denghi.ID_NhaCungCap).SingleOrDefault().Name ?? "",
                        tenChiNhanhNhan = db.DM_DonVis.Where(g => g.Id == denghi.ID_ChiNhanhNhan).SingleOrDefault().Name ?? "",
                        tenNguoiDuyet = db.Users.Where(g => g.Id == denghi.TaiKhoanDuyet).SingleOrDefault().FullName ?? "",
                        tenNguoiTao = db.Users.Where(g => g.Id == denghi.Created_By).SingleOrDefault().FullName ?? "",
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
                        case "NgayHenGiao_asc":
                            data = data.OrderBy(g => g.NgayDuyet);
                            break;
                        case "NgayHenGiao_desc":
                            data = data.OrderByDescending(g => g.NgayDuyet);
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
                if (!string.IsNullOrEmpty(inputModel.NgayXuatKho))
                {
                    var date = Convert.ToDateTime(inputModel.NgayXuatKho).Date;
                    if (inputModel.TypeFilterNgayXuatKho == (int)TypeFilter.Bigger_Or_Equal)
                    {
                        data = data.Where(g => (g.NgayXuatKho.HasValue && g.NgayXuatKho.Value.Date >= date));
                    }
                    if (inputModel.TypeFilterNgayXuatKho == (int)TypeFilter.Smaller_Or_Equal)
                    {
                        data = data.Where(g => (g.NgayXuatKho.HasValue && g.NgayXuatKho.Value.Date <= date));
                    }
                    if (inputModel.TypeFilterNgayXuatKho == (int)TypeFilter.Equal)
                    {
                        data = data.Where(g => (g.NgayXuatKho.HasValue && g.NgayXuatKho.Value.Date == date));
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
                if (!string.IsNullOrEmpty(inputModel.NgayHenGiao))
                {
                    var date = Convert.ToDateTime(inputModel.NgayHenGiao).Date;
                    if (inputModel.TypeFilterNgayHenGiao == (int)TypeFilter.Bigger_Or_Equal)
                    {
                        data = data.Where(g => (g.NgayHenGiao.HasValue && g.NgayHenGiao.Value.Date >= date));
                    }
                    if (inputModel.TypeFilterNgayHenGiao == (int)TypeFilter.Smaller_Or_Equal)
                    {
                        data = data.Where(g => (g.NgayHenGiao.HasValue && g.NgayHenGiao.Value.Date <= date));
                    }
                    if (inputModel.TypeFilterNgayHenGiao == (int)TypeFilter.Equal)
                    {
                        data = data.Where(g => (g.NgayHenGiao.HasValue && g.NgayHenGiao.Value.Date == date));
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
