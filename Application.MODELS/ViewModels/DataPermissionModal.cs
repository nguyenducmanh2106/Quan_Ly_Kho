using System;
using System.Collections.Generic;
using System.Text;

namespace Application.MODELS.ViewModels
{
    public class DataPermissionModal
    {
        public string id { get; set; }
        public string title { get; set; }
        public string key { get; set; }
        public string value { get; set; }
        public string state { get; set; }
        public string iconCls { get; set; }
        public bool @checked { get; set; }
        public List<DataPermissionModal> children { get; set; }
    }
}
