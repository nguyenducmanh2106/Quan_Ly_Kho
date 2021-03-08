using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Application.MODELS;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;
using Application.UTILS;
using Application.Services.UserServices;

namespace Application.API.Controllers
{
    [ApiController]
    [Route("api/user")]
    public class UserController : ControllerBase
    {
        private readonly IConfiguration _config;
        private readonly IUserServices _manager;

        public UserController(IConfiguration config, IUserServices _manager)
        {
            _config = config;
            this._manager = _manager;
        }

        [HttpPost("login")]
        [AllowAnonymous]
        public async Task<IActionResult> Authentication([FromBody] Users login)
        {
            var response = Unauthorized();
            Users user = await _manager.Login(login.UserName, login.PassWord);
            if (user != null)
            {
                var tokenString = GenerateJWTToken(user);
                MessageSuccess success = new MessageSuccess()
                {
                    result = new
                    {
                        access_token = tokenString,
                        userDetails = user,
                    }
                };
                return Ok(success);
            }
            MessageError error = new MessageError()
            {
                message = "Tài khoản hoặc mật khẩu không chính xác"
            };
            return Ok(error);
        }

        [HttpGet("no-authen")]
        public IActionResult Hello()
        {
            return Ok("no authen");
        }

        string GenerateJWTToken(Users userInfo)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:SecretKey"]));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var claims = new[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, userInfo.UserName),
                new Claim("FullName", userInfo.FullName.ToString()),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
            };

            var token = new JwtSecurityToken(
                issuer: _config["Jwt:Issuer"],
                audience: _config["Jwt:Audience"],
                claims: claims,
                expires: DateTime.Now.AddMinutes(30),
                signingCredentials: credentials
            );
            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
