using Microsoft.Extensions.Logging;
using Application.MODELS;
using Application.REPOSITORY;
using System;
using System.Linq;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Application.UTILS;
using Microsoft.AspNetCore.Hosting;

namespace Application.Services.ChiTietKhoSerVices
{
    public class ChiTietKhoServices : IChiTietKhoServices
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly ILogger<ChiTietKhos> _logger;
        private readonly IHostingEnvironment _hostingEnvironment;
        public ChiTietKhoServices(IUnitOfWork unitOfWork, IHostingEnvironment _hostingEnvironment, ILogger<ChiTietKhos> logger)
        {
            _unitOfWork = unitOfWork;
            _logger = logger;
            this._hostingEnvironment = _hostingEnvironment;
        }

        public async Task CreateOrUpdate(List<ChiTietKhos> obj)
        {
            try
            {
                foreach (var item in obj)
                {
                    var isExist = (await _unitOfWork.ChiTietKhoRepository.Get(g => g.Id_Kho == item.Id_Kho && g.Id_SanPham == item.Id_SanPham));
                    if (isExist != null)
                    {
                        isExist.SoLuong += item.SoLuong;
                        await _unitOfWork.ChiTietKhoRepository.Update(isExist);
                    }
                    else
                    {
                        await _unitOfWork.ChiTietKhoRepository.Add(item);
                    }
                }
                await _unitOfWork.SaveChange();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
