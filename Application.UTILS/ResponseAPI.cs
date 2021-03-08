using System;
using System.Collections.Generic;
using System.Text;

namespace Application.UTILS
{
    public class MessageSuccess
    {
        public MessageSuccess()
        {
            status = true;
            message = "access";
                
        }
        public bool status { get; set; }
        public string message{get;set;}
        public dynamic result { get; set; }
    }
    public class MessageError
    {
        public MessageError()
        {
            status = false;
            message = "error";

        }
        public bool status { get; set; }
        public string message { get; set; }
    }
}
