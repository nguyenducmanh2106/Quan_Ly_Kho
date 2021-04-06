using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Services.UserServices;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.Extensions.Configuration;

namespace Application.API.Middleware
{
    public class CheckTokenMiddleware
    {
        private readonly RequestDelegate _next;
        public readonly IConfiguration _config;
        private IUserServices _account;
        public CheckTokenMiddleware(RequestDelegate next, IConfiguration _config)
        {
            _next = next;
            this._config = _config;

        }
        public async Task Invoke(HttpContext httpContext, IUserServices account)
        {
            this._account = account;
            var token = httpContext.Request.Cookies["access_token"];
            if (true)
            {

                if (string.IsNullOrEmpty(token))
                {
                    await Task.Run(
                        async () =>
                        {
                            httpContext.Response.StatusCode = StatusCodes.Status401Unauthorized;
                            await httpContext.Response.WriteAsync("Chưa có token");
                            return;
                        }
                    );
                }
                var check = Verify(token);

                if (check == null)
                {
                    await Task.Run(
                        async () =>
                        {
                            httpContext.Response.StatusCode = StatusCodes.Status401Unauthorized;
                            await httpContext.Response.WriteAsync("Token không đúng hoặc đã hết hạn");
                            return;
                        }
                    );

                }
                else
                {
                    await _next(httpContext);
                }

            }
            //else if (checkAuthen.ToLower() == "false")
            //{
            //    await _next(httpContext);
            //}
            //else
            //{
            //    await Task.Run(
            //            async () =>
            //            {
            //                httpContext.Response.StatusCode = StatusCodes.Status401Unauthorized;
            //                await httpContext.Response.WriteAsync("");
            //            }
            //        );
            //}

        }

        public JwtSecurityToken Verify(string jwt)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_config["Jwt:SecretKey"]);
            tokenHandler.ValidateToken(jwt, new TokenValidationParameters
            {
                IssuerSigningKey = new SymmetricSecurityKey(key),
                ValidateIssuerSigningKey = true,
                ValidateIssuer = false,
                ValidateAudience = false
            }, out SecurityToken validateToken);
            return (JwtSecurityToken)validateToken;
        }
    }
}