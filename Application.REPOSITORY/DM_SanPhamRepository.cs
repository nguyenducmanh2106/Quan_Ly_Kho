using Application.Data;
using Application.MODELS;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;
using System.Linq;
using Application.MODELS.ViewModels;
using Application.UTILS;
using System.Threading.Tasks;

namespace Application.REPOSITORY
{
    public interface IDM_SanPhamRepository : IRepository<DM_SanPhams>
    {
        List<DM_SanPhams> getDataRepository(SanPhamFilterModel inputModel);
        DM_SanPhams FindByID_Repository(string Code);
        List<DM_SanPhams> FindByName_Repository(string name);
        List<DM_SanPhams> FindByNameByID_Kho_Repository(string name, int Id_Kho);
    }
    public class DM_SanPhamRepository : Repository<DM_SanPhams>, IDM_SanPhamRepository
    {
        private readonly APPDbContext db;
        public DM_SanPhamRepository(APPDbContext dbContext) : base(dbContext)
        {
            db = dbContext;
        }

        public DM_SanPhams FindByID_Repository(string Code)
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
                            join dvt in db.DM_DonViTinhs on sp.DonViTinh_Id equals dvt.Id into tblDVTDefault
                            from dvtEmpty in tblDVTDefault.DefaultIfEmpty()
                            where (sp.Code == Code)
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
                                tenDonViTinh = dvtEmpty.Name ?? "",
                                xuatXu = xuatxuEmty.Name ?? "",
                                ThuocTinhs = db.DM_ThuocTinhSPs.Where(g => g.sanPhamId == sp.Code).ToList()
                            }
                         ).SingleOrDefault();
                return data;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<DM_SanPhams> FindByNameByID_Kho_Repository(string name, int Id_Kho)
        {
            try
            {
                var data = (from sp in db.DM_SanPhams
                            join thuonghieu in db.DM_ThuongHieus on sp.ThuongHieu_Id equals thuonghieu.Id into tblThuongHieu_SPDefault
                            from thuonghieuEmty in tblThuongHieu_SPDefault.DefaultIfEmpty()
                            join chitietkho in db.ChiTietKhos on sp.Code equals chitietkho.Id_SanPham
                            join xuatxu in db.DM_XuatXus on sp.XuatXu_Id equals xuatxu.Id into tblXuatXu_SPDefault
                            from xuatxuEmty in tblXuatXu_SPDefault.DefaultIfEmpty()
                            join loaisp in db.DM_LoaiSanPhams on sp.LoaiSP equals loaisp.Id into tblLoaiSPDefault
                            from loaispEmty in tblLoaiSPDefault.DefaultIfEmpty()
                            join dvt in db.DM_DonViTinhs on sp.DonViTinh_Id equals dvt.Id into tblDVTDefault
                            from dvtEmpty in tblDVTDefault.DefaultIfEmpty()
                            where (chitietkho.Id_Kho == Id_Kho && sp.Name.ToLower().Contains(name.ToLower().TrimStart()))
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
                                tenDonViTinh = dvtEmpty.Name ?? "",
                                xuatXu = xuatxuEmty.Name ?? "",
                                ThuocTinhs = db.DM_ThuocTinhSPs.Where(g => g.sanPhamId == sp.Code).ToList()
                            }
                         ).ToList();
                return data;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<DM_SanPhams> FindByName_Repository(string name)
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
                            join dvt in db.DM_DonViTinhs on sp.DonViTinh_Id equals dvt.Id into tblDVTDefault
                            from dvtEmpty in tblDVTDefault.DefaultIfEmpty()
                            where (!string.IsNullOrEmpty(name) && name.Length > 2 && sp.Name.ToLower().Contains(name.ToLower().TrimStart()))
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
                                tenDonViTinh = dvtEmpty.Name ?? "",
                                xuatXu = xuatxuEmty.Name ?? "",
                                ThuocTinhs = db.DM_ThuocTinhSPs.Where(g => g.sanPhamId == sp.Code).ToList()
                            }
                         ).ToList();
                return data;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<DM_SanPhams> getDataRepository(SanPhamFilterModel inputModel)
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
                            join donvitinh in db.DM_DonViTinhs on sp.DonViTinh_Id equals donvitinh.Id into tblDonViTinhDefault
                            from donvitinhEmty in tblDonViTinhDefault.DefaultIfEmpty()
                            where ((inputModel.Status == (int)StatusEnum.All && inputModel.Status != (int)StatusEnum.Removed) || sp.Status == inputModel.Status)
                   && (string.IsNullOrEmpty(inputModel.Name) || sp.Code.ToLower().Contains(inputModel.Name.ToLower()) || sp.Name.ToLower().Contains(inputModel.Name.ToLower()) || sp.Barcode.ToLower().Contains(inputModel.Name.ToLower()))
                   && (inputModel.LoaiSP == -1 || sp.LoaiSP == inputModel.LoaiSP) && (inputModel.ThuongHieu_Id == -1 || sp.ThuongHieu_Id == inputModel.ThuongHieu_Id)
                   && (inputModel.XuatXu_Id == -1 || sp.XuatXu_Id == inputModel.XuatXu_Id)
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
                                tenDonViTinh = donvitinhEmty.Name ?? "",
                                ThuocTinhs = db.DM_ThuocTinhSPs.Where(g => g.sanPhamId == sp.Code).ToList()
                            }
                          );
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
