using Application.MODELS;
using Application.UTILS;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Controllers;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.AspNetCore.Routing;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace Application.API.Middleware
{
    public class RoleAuthorizeAttribute : Attribute, IAuthorizationFilter
    {
        private readonly string[] allowedroles;
        public RoleAuthorizeAttribute(params string[] roles)
        {
            this.allowedroles = roles;
        }
        public void OnAuthorization(AuthorizationFilterContext context)
        {

            try
            {
                HttpStatusCode statusCode = HttpStatusCode.Unauthorized;
                var actionDescriptor = (ControllerActionDescriptor)context.ActionDescriptor;
                var tokenHeader = context.HttpContext.Request.Headers["Authorization"].ToString();
                var validToken = Verify(tokenHeader);
                //var session = context.HttpContext.Session;
                if (context != null)
                {
                    //Users user = UTILS.SessionExtensions.Get<Users>(session, UTILS.SessionExtensions.SessionAccount);
                    Users user = JsonConvert.DeserializeObject<Users>(validToken.Subject);
                    if (user == null)
                    {
                        statusCode = HttpStatusCode.Unauthorized;
                    }

                    else
                    {
                        var lstRole = new List<string>();
                        if (user.isRoot)
                        {
                            return;
                        }
                        else
                        {
                            if (!string.IsNullOrEmpty(user.Permission))
                            {
                                lstRole = user.Permission.ToLower().Split(',').ToList();
                            }
                            //var groupuserID = userData.UserGroupID;
                            //lstRole = db.UserGroups.FirstOrDefault(g => g.Id == groupuserID).Select(g => g.Code).ToList();
                            foreach (var role in allowedroles)
                            {
                                if (lstRole.Contains(role.ToLower()))
                                {
                                    return;
                                }
                            }
                        }

                    }
                }
                //return authorize;
                if (statusCode != HttpStatusCode.OK)
                {
                    context.Result = new ObjectResult(statusCode)
                    {
                        StatusCode = (int)statusCode,
                    };
                }

            }
            catch (Exception ex)
            {
                context.Result = new ForbidResult();
            }
        }

        public JwtSecurityToken Verify(string jwt)
        {
            try
            {
                var _config = new ConfigurationBuilder()
              .SetBasePath(AppDomain.CurrentDomain.BaseDirectory)
              .AddJsonFile("appsettings.json").Build();

                var tokenHandler = new JwtSecurityTokenHandler();
                var key = Encoding.ASCII.GetBytes(_config["Jwt:SecretKey"]);
                tokenHandler.ValidateToken(jwt, new TokenValidationParameters
                {
                    IssuerSigningKey = new SymmetricSecurityKey(key),
                    ValidateIssuerSigningKey = true,

                    ValidateIssuer = true,
                    ValidIssuer = _config["Jwt:Issuer"],

                    ValidateAudience = true,
                    ValidAudience = _config["Jwt:Audience"],

                    ValidateLifetime = true, //validate the expiration and not before values in the token

                    ClockSkew = TimeSpan.Zero //5 minute tolerance for the expiration date
                }, out SecurityToken validateToken);
                return (JwtSecurityToken)validateToken;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
