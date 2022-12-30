using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace UserTestWithReactHooks.Models
{
    public class Register
    {
        public int UserID { get; set; }
        public string UserFullName { get; set; }
        public System.DateTime DOJ { get; set; }
        public string UserEmail { get; set; }
        public string UserProfile { get; set; }
        public string UserPassword { get; set; }

    }
}