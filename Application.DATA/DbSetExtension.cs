using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;

namespace Application.Data
{
    public static class DbSetExtension
    {
        public static List<PropertyInfo> GetDbSetProperties(this DbContext context)
        {
            var dbSetProperties = new List<PropertyInfo>();
            var properties = context.GetType().GetProperties();

            foreach (var property in properties)
            {
                var setType = property.PropertyType;
                var isDbSet = setType.IsGenericType && (typeof(DbSet<>).IsAssignableFrom(setType.GetGenericTypeDefinition()) || setType.GetInterface(typeof(DbSet<>).FullName) != null);

                if (isDbSet)
                {
                    dbSetProperties.Add(property);
                }
            }

            return dbSetProperties;
        }

        public static IList<object> GetDbSets(this DbContext context)
        {
            var properties = context.GetDbSetProperties();
            var dbSets = properties.Select(s => s.GetValue(context, null)).ToList();

            return dbSets;
        }
    }
}
