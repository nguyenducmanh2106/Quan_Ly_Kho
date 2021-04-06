using System;
using System.Drawing;
using System.Collections.Generic;
using System.IO;
using System.Text;
using Microsoft.AspNetCore.Http;

namespace Application.UTILS
{
    public static class ConvertBase64
    {
        public static void Base64ToFile(string base64String,string pathSave,string filename)
        {
            byte[] bytes = Convert.FromBase64String(base64String);
            //khai báo mảng validate ảnh
            List<dynamic> a = new List<dynamic>();
            List<string> allowedExtensions = new List<string>{ "jpg" ,"jpeg ","png ","gif","tiff","raw","psd" };
            string extension_file = filename.Split('.')[filename.Split('.').Length-1];//Lấy đuôi ảnh
            if (!allowedExtensions.Contains(extension_file))//kiểm tra file muốn decode có phải ảnh không//nếu khôgn thì chuyển sang lưu file
            {
                File.WriteAllBytesAsync($"{pathSave}", bytes);
                //using (FileStream file = File.Create($"{pathSave}"))
                //{
                //    file.Write(bytes, 0, bytes.Length);
                //}
            }
            //lưu dưới dạng ảnh
            else
            {
                using (MemoryStream ms = new MemoryStream(bytes))
                {

                    Image pic = Image.FromStream(ms);
                    pic.Save($"{pathSave}");
                }
            }
        }
        public static dynamic FileToBase64(IFormFile file)
        {
            string result = null;
            using (var ms = new MemoryStream())
            {
                file.CopyTo(ms);
                var fileBytes = ms.ToArray();
                result = Convert.ToBase64String(fileBytes);
                // act on the Base64 data
            }
            return result;
        }
       
    }
}
