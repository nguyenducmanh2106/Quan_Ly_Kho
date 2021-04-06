using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Application.UTILS
{
    public class PaginationSet<T>
    {
        public int Page { get; set; }
        public int count
        {
            get
            {
                return (items != null) ? items.Count() : 0;
            }
        }

        public int TotalPages { get; set; }

        public int TotalCount { get; set; }

        public int MaxPage { get; set; }
        public IEnumerable<T> items { get; set; }
    }
}
