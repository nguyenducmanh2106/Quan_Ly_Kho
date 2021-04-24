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
        List<DM_DeNghiDieuDongs> getDataRepository(DeNghiDieuDongFilterModel inputModel);
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
                var data = (from sp in db.DM_SanPhams
                            join thuonghieu in db.DM_ThuongHieus on sp.ThuongHieu_Id equals thuonghieu.Id into tblThuongHieu_SPDefault
                            from thuonghieuEmty in tblThuongHieu_SPDefault.DefaultIfEmpty()
                            join xuatxu in db.DM_XuatXus on sp.XuatXu_Id equals xuatxu.Id into tblXuatXu_SPDefault
                            from xuatxuEmty in tblXuatXu_SPDefault.DefaultIfEmpty()
                            join loaisp in db.DM_LoaiSanPhams on sp.LoaiSP equals loaisp.Id into tblLoaiSPDefault
                            from loaispEmty in tblLoaiSPDefault.DefaultIfEmpty()
                            where (sp.Id == Id)
                            select new DM_SanPhams()
                            {
                                Id = sp.Id,
                                Name = sp.Name,
                                Code = sp.Code,
                                Barcode = sp.Barcode,
                                LoaiSP = sp.LoaiSP,
                                ThuongHieu_Id = sp.ThuongHieu_Id,
                                XuatXu_Id = sp.XuatXu_Id,
                                KhoiLuong = sp.KhoiLuong,
                                DonViTinh_Id = sp.DonViTinh_Id,
                                KichThuoc = sp.KichThuoc,
                                Avatar = sp.Avatar,
                                Status = sp.Status,
                                Created_At = sp.Created_At,
                                Updated_At = sp.Updated_At,
                                Created_By = sp.Created_By,
                                Updated_By = sp.Updated_By,
                                GiaNhap = sp.GiaNhap,
                                GiaBanBuon = sp.GiaBanBuon,
                                GiaBanLe = sp.GiaBanLe,
                                GiaCu = sp.GiaCu,
                                pathAvatar = sp.pathAvatar,
                                tenLoaiSanPham = loaispEmty.Name ?? "",
                                tenThuongHieu = thuonghieuEmty.Name ?? "",
                                xuatXu = xuatxuEmty.Name ?? "",
                                ThuocTinhs = db.DM_ThuocTinhSPs.Where(g => g.sanPhamId == sp.Id).ToList()
                            }
                         ).SingleOrDefault();
                return data;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<DM_DeNghiDieuDongs> getDataRepository(DeNghiDieuDongFilterModel inputModel)
        {
            try
            {
                var data = (
                    from denghi in db.DM_DeNghiDieuDongs
                    join loaidenghi in db.DM_LoaiDeNghis on denghi.LoaiDeNghi_Id equals loaidenghi.Id into tblLoaiDeNghiDefault
                    from loaidenghiEmty in tblLoaiDeNghiDefault.DefaultIfEmpty()
                    where ((inputModel.LoaiDeNghi_Id==-1|| denghi.LoaiDeNghi_Id==inputModel.LoaiDeNghi_Id)
                    &&(denghi.Status==inputModel.Status)&&(string.IsNullOrEmpty(inputModel.Name)||denghi.SoDeNghiDieuDong.ToLower().Contains(inputModel.Name.ToLower()))
                    ))
                if (!string.IsNullOrEmpty(inputModel.nameSort))
                {
                    switch (inputModel.nameSort)
                    {
                        case "Name_asc":
                            data = data.OrderBy(g => g.Name);
                            break;
                        case "Name_desc":
                            data = data.OrderByDescending(g => g.Name);
                            break;
                        case "GiaBan_asc":
                            data = data.OrderBy(g => g.GiaBanLe);
                            break;
                        case "GiaBan_desc":
                            data = data.OrderByDescending(g => g.GiaBanLe);
                            break;
                        case "Code_asc":
                            data = data.OrderBy(g => g.Code);
                            break;
                        case "Code_desc":
                            data = data.OrderByDescending(g => g.Code);
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
