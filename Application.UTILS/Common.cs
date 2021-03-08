using Application.MODELS;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Application.UTILS
{
    public class Common
    {
        //private static APPDbContext db = new APPDbContext();

        //public static string getCategoryTemp(string _table = "", string _field = "*", Int32 _currentId = 0)
        //{
        //    string strHtml = "";
        //    var sql = string.Format("SELECT {0} FROM [{1}]", _field, _table);
        //    var objData = db.Database.SqlQuery<CategoryCommon>(sql).ToList();
        //    foreach (var item in objData.Where(g => g.ParentId == 0).OrderBy(g => g.Ordering))
        //    {
        //        var _ten = @item.Name;
        //        strHtml += "<option style='font-weight:bold;' value='" + @item.Id + "'";
        //        if (@item.Id == _currentId)
        //        {
        //            strHtml += " selected";
        //        }
        //        strHtml += "><b>" + @_ten + "</b></option>";
        //        var sub1 = objData.Where(g => g.ParentId == @item.Id).OrderBy(g => g.Ordering);
        //        if (sub1.Count() > 0)
        //        {
        //            foreach (var item1 in sub1)
        //            {
        //                strHtml += "<option value='" + item1.Id + "'";
        //                if (@item.Id == _currentId)
        //                {
        //                    strHtml += " selected";
        //                }
        //                strHtml += "> --- " + @item1.Name + "</option>";
        //                var sub2 = objData.Where(g => g.ParentId == @item1.Id).OrderBy(g => g.Ordering);
        //                if (sub2.Count() > 0)
        //                {
        //                    foreach (var item2 in sub2)
        //                    {
        //                        strHtml += "<option value='" + item2.Id + "'";
        //                        if (item2.Id == _currentId)
        //                        {
        //                            strHtml += " selected";
        //                        }
        //                        strHtml += "> --- --- " + item2.Name + "</option>";
        //                    }
        //                }
        //            }
        //        }
        //    }
        //    return strHtml;
        //}
        //public static string getCategory(string _table = "", string _field = "*", Int32 _parentId = 0)
        //{
        //    string strHtml = "";
        //    Int32 _iLevel = 0;
        //    var sql = string.Format("SELECT {0} FROM {1} where ParentID =" + _parentId, _field, _table);
        //    var objData = db.Database.SqlQuery<CategoryCommon>(sql).ToList();
        //    foreach (var item in objData)
        //    {
        //        _iLevel = iLevel(@item.Id, _table);
        //        var _ten = @item.Name;
        //        strHtml += "<option value='" + @item.Id + "'>" + @_ten + "</option>";
        //        getCategory(_table, _field, @item.Id);
        //    }

        //    return strHtml;
        //}
        //public static int iLevel(int _Id = 0, string _table = "")
        //{
        //    var sql = string.Format("SELECT * FROM {0} where ParentID =" + _Id, _table);
        //    var objData = db.Database.SqlQuery<CategoryCommon>(sql).ToList();
        //    int _iLevel = 1;
        //    if (objData.Count() > 0)
        //    {
        //        _iLevel++;
        //        iLevel(objData.FirstOrDefault().Id, _table);
        //    }
        //    return _iLevel;
        //}
        //public static string GetPath(string path = "~/", string filename = "")
        //{
        //    var p = HttpContext.Current.Server.MapPath(path);
        //    return Path.Combine(p, filename);
        //}
        //public static string RemoveMark(string str)
        //{
        //    if (!string.IsNullOrEmpty(str))
        //    {
        //        str = str.Trim();
        //        var charsToRemove = new string[] { "@", ",", ";", "'", "/", "\\", "\"", "[", "]", ":", "?", "=", "&", "+", "‘", "’" };
        //        foreach (var c in charsToRemove)
        //        {
        //            str = str.Replace(c, string.Empty);
        //        }
        //        const string FindText = "áàảãạâấầẩẫậăắằẳẵặđéèẻẽẹêếềểễệíìỉĩịóòỏõọôốồổỗộơớờởỡợúùủũụưứừửữựýỳỷỹỵÁÀẢÃẠÂẤẦẨẪẬĂẮẰẲẴẶĐÉÈẺẼẸÊẾỀỂỄỆÍÌỈĨỊÓÒỎÕỌÔỐỒỔỖỘƠỚỜỞỠỢÚÙỦŨỤƯỨỪỬỮỰÝỲỶỸỴ ";
        //        const string ReplText = "aaaaaaaaaaaaaaaaadeeeeeeeeeeeiiiiiooooooooooooooooouuuuuuuuuuuyyyyyAAAAAAAAAAAAAAAAADEEEEEEEEEEEIIIIIOOOOOOOOOOOOOOOOOUUUUUUUUUUUYYYYY-";
        //        int index = -1;
        //        char[] arrChar = FindText.ToCharArray();
        //        while ((index = str.IndexOfAny(arrChar)) != -1)
        //        {
        //            int index2 = FindText.IndexOf(str[index]);
        //            str = str.Replace(str[index], ReplText[index2]);
        //        }

        //    }
        //    return str;
        //}
        //public static string GetThumbnail(string FileName)
        //{
        //    var ext = Path.GetExtension(FileName).ToLower();
        //    string icon = "";
        //    switch (ext)
        //    {
        //        case ".doc":
        //        case ".docx":
        //            icon = "/Images/IconFile/WordIcon.png";
        //            break;
        //        case ".xls":
        //        case ".xlsx":
        //            icon = "/Images/IconFile/ExcelIcon.png";
        //            break;
        //        case ".zip":
        //        case ".rar":
        //            icon = "/Images/IconFile/ZipIcon.png";
        //            break;
        //        case ".pdf":
        //            icon = "/Images/IconFile/PDFIcon.png";
        //            break;
        //        case ".jpg":
        //        case ".jpeg":
        //        case ".png":
        //        case ".gif":
        //            icon = FileName;
        //            break;
        //        default:
        //            icon = "/Images/IconFile/unknown.png";
        //            break;
        //    }
        //    return icon;
        //}
        public static string setName(int Level, string Name)
        {
            if (Level > 0)
            {
                for (int i = 0; i < Level; i++)
                {
                    Name= "-"+Name;
                }
            }
            return Name;
        }
        public static string GetNameFile(string LinkFile)
        {
            var arrs = LinkFile.Split('/');
            var name1 = arrs[arrs.Count() - 1];
            var arrv = name1.Split(']');
            var FileName = arrv[arrv.Count() - 1];
            return FileName;
        }
        //public static string GetDocument(string url = "")
        //{
        //    if (!string.IsNullOrEmpty(url))
        //    {
        //        var SouceFile = ConfigurationManager.AppSettings["SouceFile"];
        //        url = SouceFile + url;
        //    }
        //    return url;
        //}
        //public static string Md5Hash(string text)
        //{
        //    MD5 md5 = new MD5CryptoServiceProvider();

        //    //compute hash from the bytes of text
        //    md5.ComputeHash(Encoding.ASCII.GetBytes(text));

        //    //get hash result after compute it
        //    var result = md5.Hash;

        //    var strBuilder = new StringBuilder();
        //    foreach (var t in result)
        //    {
        //        //change it into 2 hexadecimal digits
        //        //for each byte
        //        strBuilder.Append(t.ToString("x2"));
        //    }

        //    return strBuilder.ToString();
        //}
        //public static async Task insert_filetoDb(string namefile = "", string linkfile = "", string replaceName = "", int HoSoID = 0, string code = "", string size = "")
        //{
        //    if (string.IsNullOrEmpty(replaceName))
        //        replaceName = namefile;
        //    var fobj = new vFiles();
        //    fobj.NameFile = namefile;
        //    fobj.LinkFile = linkfile;
        //    fobj.ReplaceName = replaceName;
        //    fobj.Size = size;
        //    fobj.ForeignID = HoSoID;
        //    fobj.Code = code;
        //    fobj.Status = 1;
        //    fobj.CreateDate = DateTime.Now;
        //    db.vFiles.Add(fobj);
        //    await db.SaveChangesAsync();
        //}

        public static Tuple<DateTime?, string> DateAndString(string s)
        {
            DateTime? DateResult = null;
            var strDate = "";

            try
            {
                s = s.Replace("_", "");
                string[] strArray;
                if (!string.IsNullOrEmpty(s))
                {
                    char charSplit = '/';
                    if (s.Contains('-'))
                    {
                        charSplit = '-';
                    }

                    strArray = s.Split(charSplit);
                    if (strArray.Length == 3)
                    {
                        int day = 0;
                        if (!string.IsNullOrEmpty(strArray[0]))
                            day = Convert.ToInt32(strArray[0]);

                        int month = 0;
                        if (day == 0)
                        {
                            if (!string.IsNullOrEmpty(strArray[1]))
                                month = Convert.ToInt32(strArray[1]);

                            if (month == 0)
                            {
                                month = 1;
                                strDate = strArray[2];
                            }
                            else
                            {
                                strDate = strArray[1] + "/" + strArray[2];
                            }
                            day = 1;
                        }
                        else
                        {
                            if (!string.IsNullOrEmpty(strArray[1]))
                                month = Convert.ToInt32(strArray[1]);
                            if (month == 0)
                            {
                                month = 1;
                            }
                        }

                        if (!string.IsNullOrEmpty(strArray[2]))
                        {
                            DateResult = new DateTime(Convert.ToInt32(strArray[2]), month, day);
                        }
                        strDate = s;
                    }

                    if (strArray.Length == 2)
                    {
                        int month = 0;

                        if (!string.IsNullOrEmpty(strArray[0]))
                            month = Convert.ToInt32(strArray[0]);

                        if (month == 0)
                        {
                            month = 1;
                        }

                        if (!string.IsNullOrEmpty(strArray[1]))
                        {
                            DateResult = new DateTime(Convert.ToInt32(strArray[1]), month, 1);
                        }
                        strDate = s;
                    }

                    if (strArray.Length == 1)
                    {
                        if (!string.IsNullOrEmpty(strArray[0]))
                        {
                            DateResult = new DateTime(Convert.ToInt32(strArray[0]), 1, 1);
                        }
                        strDate = s;
                    }


                }

                return Tuple.Create(DateResult, strDate);
            }
            catch (Exception)
            {
                strDate = "False";
                return Tuple.Create(DateResult, strDate);
            }
        }
        public static string ConvertDateToString(DateTime? date, string format = "dd/MM/yyyy")
        {
            if (date == null) return "";
            var result = Convert.ToDateTime(date).ToString(format);
            return result;
        }
        public static DateTime ConvertDate(string s)
        {
            if (!string.IsNullOrEmpty(s))
            {
                string[] dateStr = new string[] { };
                if (s.Contains('-'))
                {
                    dateStr = s.Split('-');
                    var swap = dateStr[0];
                    dateStr[0] = dateStr[2];
                    dateStr[2] = swap;
                }
                else
                {
                    dateStr = s.Split('/');
                }
                string Date = dateStr[1] + "/" + dateStr[0] + "/" + dateStr[2];
                DateTime Ngay = new DateTime(Convert.ToInt32(dateStr[2]), Convert.ToInt32(dateStr[1]), Convert.ToInt32(dateStr[0]));
                return Ngay;
            }
            else return new DateTime(0001, 1, 1);
        }
        /// <summary>
        /// Set Level cho danh mục
        /// </summary>
        private static readonly Dictionary<string, int> DicLevel = new Dictionary<string, int>();
        private static int _level;
        private static string _name;

        public static object GetValueByName<T>(T obj, string fieldName)
        {
            var t = obj.GetType();

            var prop = t.GetProperty(fieldName);

            return prop.GetValue(obj);
        }
        public static object GetValueByName(object obj, string fieldName)
        {
            var t = obj.GetType();

            var prop = t.GetProperty(fieldName);

            return prop.GetValue(obj);
        }

        public static List<T> CreateLevel<T>(List<T> listAllCategory, string ParentId = "ParentId")
        {
            /*var lstCategory = (from g in listAllCategory where(GetValueByName(g, "Name").ToString().Contains("--")) select g).ToList();
            if (lstCategory.Count()>0)
            {

                foreach (var item in listAllCategory)
                {
                    var property = item.GetType().GetProperty("Level");
                    property.SetValue(item, Convert.ChangeType(0, property.PropertyType),null);
                }
                return listAllCategory;
            }*/
            var lstParent = (from g in listAllCategory
                             where ((int)GetValueByName(g, ParentId)) == 0
                             orderby (int)GetValueByName(g, "Ordering")
                             select g).ToList<T>();
            var lstOrder = new List<T>();
            FindChild(listAllCategory, lstParent, ref lstOrder, ParentId);
            return lstOrder;
        }

        public static void FindChild<T>(List<T> listAllCategory, List<T> lstParent, ref List<T> lstOrder, string ParentId = "ParentId")
        {
            using (var enumerator = lstParent.OrderBy(g => (int)GetValueByName(g, "Ordering")).GetEnumerator())
            {
                while (enumerator.MoveNext())
                {
                    var item = enumerator.Current;
                    Func<KeyValuePair<string, int>, bool> predicate = g => g.Key == GetValueByName(item, ParentId).ToString();
                    lock (DicLevel) ;
                    var pair = DicLevel.FirstOrDefault(predicate);
                    if (((int)GetValueByName(item, ParentId)) == 0)
                    {
                        _level = 0;
                    }
                    if (string.IsNullOrEmpty(pair.Key))
                    {
                        DicLevel.Add(GetValueByName(item, ParentId).ToString(), _level);
                    }
                    else
                    {
                        _level = pair.Value;
                    }
                    if (item != null)
                    {
                        var property = item.GetType().GetProperty("Level");
                        try
                        {
                            property.SetValue(item, _level, null);
                        }
                        catch (Exception)
                        {
                            break;
                        }
                    }
                    Func<T, bool> func2 = g => GetValueByName(g, "Id").ToString() == GetValueByName(item, "Id").ToString();
                    if (!lstOrder.Where(func2).Any())
                    {
                        lstOrder.Add(item);
                    }
                    Func<T, bool> func3 = g => GetValueByName(g, ParentId).ToString() == GetValueByName(item, "Id").ToString();
                    var list = listAllCategory.Where<T>(func3).ToList<T>();
                    if (list.Count <= 0) continue;
                    foreach (var info2 in list.Select(local => item != null ? item.GetType().GetProperty("Level") : null))
                    {
                        try
                        {
                            info2.SetValue(item, _level, null);
                        }
                        catch (Exception)
                        {
                            break;
                        }
                    }
                    _level++;
                    FindChild(listAllCategory, list, ref lstOrder);
                }
            }
        }
//        public static List<int> GetFullChild(string table, int idCate = 0, string ParentID = "ParentId", string id = "Id")
//        {
//            using (var db = new dbContext())
//            {
//                var lstId = new List<int>();
//                lstId = db.Database.SqlQuery<int>(@"WITH newtable AS(
//select * FROM " + table + @" WHERE ID = " + idCate + @"
//UNION ALL
//select u.* FROM " + table + @" u INNER JOIN newtable new ON u." + ParentID + @" = new." + id + @"
//)
//select " + id + @" FROM newtable").ToList();
//                return lstId;
//            }
//        }
//        public static List<int> GetFullParent(string table, int idCate = 0, string ParentID = "ParentId", string id = "Id")
//        {
//            using (var db = new dbContext())
//            {
//                var lstId = new List<int>();
//                lstId = db.Database.SqlQuery<int>(@"WITH newtable AS(
//select * FROM " + table + @" WHERE ID = " + idCate + @"
//UNION ALL
//select u.* FROM " + table + @" u INNER JOIN newtable new ON u." + id + @" = new." + ParentID + @"
//)
//select " + id + @" FROM newtable").ToList();
//                return lstId;
//            }
//        }
        //public static string RemoveHtmlTags(string input)
        //{
        //    try
        //    {
        //        // these are end tags that create a line break and need to be replaced with a space
        //        var lineBreakEndTags = new[] { "</p>", "<br/>", "<br />", "</div>", "</table>", "<nl/>", "<nl />" };

        //        if (!string.IsNullOrEmpty(input))
        //        {
        //            // replace carriage return w/ space
        //            input = input.Replace("\r", " ");

        //            // replace newline w/ space
        //            input = input.Replace("\n", " ");

        //            // replace tab
        //            input = input.Replace("\t", string.Empty);

        //            // replace line break tags with a space
        //            input = lineBreakEndTags.Aggregate(input, (current, tag) => current.Replace(tag, " "));

        //            // replace all html tags
        //            var regex = new Regex("<(.|\n)*?>", RegexOptions.IgnoreCase | RegexOptions.Multiline);
        //            input = regex.Replace(input, string.Empty);

        //            // replace special html characters
        //            var specialChars = new Dictionary<string, string>
        //            {
        //                {"\u00A0", " "},
        //                {@"&nbsp;", " "},
        //                {@"&quot;", "\""},
        //                {@"&ldquo;", "\""},
        //                {@"&rdquo;", "\""},
        //                {@"&rsquo;", "'"},
        //                {@"&lsquo;", "'"},
        //                {@"&amp;", "&"},
        //                {@"&ndash;", "-"},
        //                {@"&mdash;", "-"},
        //                {@"&lt;", "<"},
        //                {@"&gt;", ">"},
        //                {@"&lsaquo;", "<"},
        //                {@"&rsaquo;", ">"},
        //                {@"&trade;", "(tm)"},
        //                {@"&frasl;", "/"},
        //                {@"&copy;", "(c)"},
        //                {@"&reg;", "(r)"},
        //                {@"&iquest;", "?"},
        //                {@"&iexcl;", "!"},
        //                {@"&bull;", "*"}
        //            };

        //            input = specialChars.Aggregate(input, (current, specialChar) => current.Replace(specialChar.Key, specialChar.Value));

        //            // any other special char is deleted
        //            input = Regex.Replace(input, @"&#[^ ;]+;", string.Empty);
        //            input = Regex.Replace(input, @"&[^ ;]+;", string.Empty);

        //            // remove extra duplicate spaces
        //            input = Regex.Replace(input, @"( )+", " ");

        //            // trim
        //            input = input.Trim();
        //        }
        //    }
        //    catch
        //    {
        //    }
        //    return input;
        //}
        //public static List<T> GetAll<T>(List<T> listData, string sql, string KeyCache, int LoadCache = 0)
        //{
        //    var lstData = Web.Core.HelperCache.GetCache<List<T>>(KeyCache);
        //    if (lstData == null || LoadCache == 0)
        //    {
        //        lstData = db.Database.SqlQuery<T>(sql).ToList();
        //        Web.Core.HelperCache.AddCache(lstData, KeyCache);
        //    }
        //    return lstData;
        //}
        //public static string ConvertToThousand64(object number, string code = "vi-VN")
        //{
        //    string str;
        //    if (number != null)
        //        str = string.Format(CultureInfo.GetCultureInfo(code), "{0:N0}", Convert.ToInt64(number));
        //    else
        //        str = "0";
        //    return str;
        //}
        //public static string stringrpl(string str)
        //{
        //    if (!string.IsNullOrEmpty(str))
        //    {
        //        str = str.Replace("</p>", "</p>" + Environment.NewLine);
        //        str = str.Replace("<br />", "<br />" + Environment.NewLine);
        //        str = str.Replace("<br >", "<br >" + Environment.NewLine);
        //        str = str.Replace("<br>", "<br>" + Environment.NewLine);
        //        str = str.Replace("<ol>", string.Empty).Replace("</ol>", "&").Replace("<p>", string.Empty).Replace("</p>", string.Empty).Replace("\r", string.Empty).Replace("\n\n", string.Empty).Replace("<sup>0</sup>", "°").Replace("<sup>o</sup>", "°").Replace("<sup>2</sup>", "").Replace("\t", string.Empty).Replace("\r", string.Empty);
        //        var arrrpl = str.Split('&');
        //        var total = "";
        //        for (int i = 0; i < arrrpl.Length; i++)
        //        {
        //            arrrpl[i] = arrrpl[i].Replace("</li>", "|");
        //            if (!string.IsNullOrEmpty(arrrpl[i]))
        //            {
        //                var count = 0;
        //                var abc = arrrpl[i].Split('|');
        //                for (int j = 0; j < abc.Length; j++)
        //                {
        //                    count++;
        //                    var cnt = count.ToString();
        //                    abc[j] = abc[j].Replace("<li>", cnt + ". ");
        //                }
        //                total = total + string.Join("", abc);
        //            }
        //        }
        //        return Regex.Replace(total.Trim(), "<.*?>", String.Empty);
        //    }
        //    else return "";

        //}
    }
}
