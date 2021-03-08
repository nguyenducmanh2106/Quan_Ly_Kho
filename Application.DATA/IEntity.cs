using System;
using System.Collections.Generic;
using System.Text;

namespace Application.Data
{
    public interface IBaseEntity<TId>
    {
        TId Id { get; set; }
    }

    public interface IAuditEntity
    {
        public DateTime? CreatedDate { get; set; }
        public string CreatedBy { get; set; }
        public DateTime? ModifiedDate { get; set; }
        public string ModifiedBy { get; set; }
    }

    public interface ISoftDelete
    {
        public bool IsDeleted { get; set; }
    }
}
