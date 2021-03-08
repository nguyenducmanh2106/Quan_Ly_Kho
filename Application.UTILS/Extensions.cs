using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Globalization;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Text.RegularExpressions;

namespace Application.Utils
{
    public static class Extensions
    {
        /// <summary>
        /// 0: chỉ xóa khoảng trắng
        /// 1: viết hoa ký tự đầu của các chữ
        /// 2: chỉ viết hoa ký tự đầu của chuỗi
        /// </summary>
        /// <param name="inputText"></param>
        /// <param name="type"></param>
        /// <returns></returns>
        public static string StringStandar(string inputText, int type = 2)
        {
            if (string.IsNullOrEmpty(inputText))
            {
                return null;
            }
            var name = inputText.Trim();
            if (type == 1)
            {
                name = name.ToLower();
                name = CultureInfo.CurrentCulture.TextInfo.ToTitleCase(name);
            }
            else if (type == 2)
            {
                name = name.ToLower();
                var sInput = name.Split(" ");
                var firstLetter = sInput[0];
                var secondLetter = name.Remove(0, firstLetter.Length);
                name = CultureInfo.CurrentCulture.TextInfo.ToTitleCase(firstLetter) + secondLetter;
            }

            var s = name.Split(" ");
            var nameFormat = "";

            for (var i = 0; i < s.Length; i++)
            {
                if (!string.IsNullOrEmpty(s[i]))
                {
                    nameFormat = nameFormat + s[i] + " ";
                }
            }
            return nameFormat.Trim();
        }
        public static string GetEnumDescription(Enum value)
        {
            FieldInfo fi = value.GetType().GetField(value.ToString());

            DescriptionAttribute[] attributes = fi.GetCustomAttributes(typeof(DescriptionAttribute), false) as DescriptionAttribute[];

            if (attributes != null && attributes.Any())
            {
                return attributes.First().Description;
            }

            return value.ToString();
        }

        public static int RandomNumber(int min, int max)
        {
            Random random = new Random();
            return random.Next(min, max);
        }
        public static string RandomString(int size, bool lowerCase)
        {
            StringBuilder builder = new StringBuilder();
            Random random = new Random();
            char ch;
            for (int i = 0; i < size; i++)
            {
                ch = Convert.ToChar(Convert.ToInt32(Math.Floor(26 * random.NextDouble() + 65)));
                builder.Append(ch);
            }
            if (lowerCase)
                return builder.ToString().ToLower();
            return builder.ToString();
        }
        public static string RandomPassword(int size = 0)
        {
            StringBuilder builder = new StringBuilder();
            builder.Append(RandomString(4, true));
            builder.Append(RandomNumber(1000, 9999));
            builder.Append(RandomString(2, false));
            return builder.ToString();
        }
        public static string NormalVNese(string inputString)
        {
            inputString = inputString.ToLower();
            var input = "àáãảạăằắẳẵặâầấẩẫậèéẻẽẹêềếểễệđùúủũụưừứửữựòóỏõọôồốổỗộơờớởỡợìíỉĩịäëïîöüûñçýỳỹỵỷ";
            var output = "aaaaaaaaaaaaaaaaaeeeeeeeeeeeduuuuuuuuuuuoooooooooooooooooiiiiiaeiiouuncyyyyy";
            for(var i = 0; i < input.Length; i++)
            {
                inputString = inputString.Replace(input[i], output[i]);
            }
            return inputString;
        }

    }
}
