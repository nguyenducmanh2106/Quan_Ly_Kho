using Application.MODELS;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Controllers;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.AspNetCore.Routing;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.MODELS
{
    public class RoleAuthorizeAttribute : Attribute, IAuthorizationFilter
    {
        private readonly string[] allowedroles;
        //private  string allowedroles;

        public RoleAuthorizeAttribute(params string[] roles)
        {
            this.allowedroles = roles;
        }
        public  void OnAuthorization(AuthorizationFilterContext context)
        {
            bool authorize = false;
            var actionDescriptor = (ControllerActionDescriptor)context.ActionDescriptor;
            var session = context.HttpContext.Session;
            if (context != null)
            {
               Users user= UTILS.SessionExtensions.Get<Users>(session, UTILS.SessionExtensions.SessionAccount);
                if (user == null)
                {
                    context.Result = new ForbidResult();
                }

                else
                {
                    var lstRole = new List<string>();
                    if (user.isRoot)
                    {
                        authorize = true;
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
                                authorize = true;
                            }
                        }
                    }

                }
            }
            //return authorize;
            if (!authorize)
            {
                context.Result = new ForbidResult();
            }
        }

        
    }
}
