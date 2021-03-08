using System;
using System.Collections.Generic;
using System.Text;

namespace Application.Utils
{
    public static class MD5
    {
        public static string ToMD5(string str)
        {
            using (System.Security.Cryptography.MD5 md5 = System.Security.Cryptography.MD5.Create())
            {
                var encoding = Encoding.ASCII;
                var data = encoding.GetBytes(str);

                Span<byte> hashBytes = stackalloc byte[16];
                md5.TryComputeHash(data, hashBytes, out int written);
                if (written != hashBytes.Length)
                    throw new OverflowException();


                Span<char> stringBuffer = stackalloc char[32];
                for (int i = 0; i < hashBytes.Length; i++)
                {
                    hashBytes[i].TryFormat(stringBuffer.Slice(2 * i), out _, "x2");
                }
                return new string(stringBuffer);
            }
        }
    }
}
