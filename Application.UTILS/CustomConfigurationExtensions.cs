using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.IO;
using System.Text;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;

namespace Application.UTILS
{
    public class CustomConfigurationExtensions
    {
        readonly IHostingEnvironment _hostingEnvironment;
        public CustomConfigurationExtensions(IHostingEnvironment _hostingEnvironment)
        {
            this._hostingEnvironment = _hostingEnvironment;
        }
        public static dynamic ReadFileToBase64(IHostingEnvironment _hosting, string filename)
        {
            string host = _hosting.WebRootPath;
            string folderFile = $"{host}/{filename}";
            string result = "";
            if (!string.IsNullOrEmpty(filename) && System.IO.File.Exists(folderFile))
            {
                byte[] bytes = System.IO.File.ReadAllBytes(folderFile);
                result = Convert.ToBase64String(bytes);
            }
            return result;
        }
    }
}
