using System;
using System.Collections.Generic;
using System.IO;
using System.Text;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;

namespace Application.UTILS
{
    public static class ConfigurationExtensions
    {
        //public static IServiceCollection AddConfig(
        //     this IServiceCollection services, IConfiguration config)
        //{
        //    services.Configure<string>(
        //        config.GetSection("Jwt:SecretKey"));

        //    return services;
        //}
        public static string GetIssuerSigningKey(this IConfiguration configuration)
        {
            string result = configuration["Jwt:SecretKey"];
            return result;
        }

        public static SymmetricSecurityKey GetSymmetricSecurityKey(this IConfiguration configuration)
        {
            var issuerSigningKey = configuration.GetIssuerSigningKey();
            var data = Encoding.UTF8.GetBytes(issuerSigningKey);
            var result = new SymmetricSecurityKey(data);
            return result;
        }

        //public static string[] GetCorsOrigins(this IConfiguration configuration)
        //{
        //    string[] result =
        //        configuration.GetValue<string>("App:CorsOrigins")
        //        .Split(",", StringSplitOptions.RemoveEmptyEntries)
        //        .ToArray();

        //    return result;
        //}
    }
}
