using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using UserTestWithReactHooks.Models;

namespace UserTestWithReactHooks.Controllers
{
    [RoutePrefix("api/users")]
    public class UserController : ApiController
    {
        UserTestEntities DB = new UserTestEntities();


        [Route("Login")]
        [HttpPost]

        public IHttpActionResult UserLogin(Login login)
        {

            var log = DB.Users.Where(x => x.UserEmail.Equals(login.UserEmail) && x.UserPassword.Equals(login.UserPassword)).FirstOrDefault();

            if (log == null)
            {
                return Ok(new { status = 401, isSuccess = false, message = "Invalid User", });
            }
            else

                return Ok(new { status = 200, isSuccess = true, message = "User Login successfully", UserDetails = log });
        }

        [Route("InsertUser")]
        [HttpPost]
        public object InsertUser(Register Reg)
        {
            try
            {

                User UL = new User();
                if (UL.UserID == 0)
                {




                    UL.UserFullName = Reg.UserFullName;
                    UL.DOJ = Reg.DOJ;
                    UL.UserEmail = Reg.UserEmail;
                    UL.UserProfile = Reg.UserProfile;
                    UL.UserPassword = Reg.UserPassword;
                    DB.Users.Add(UL);
                    DB.SaveChanges();
                    return new Response
                    { Status = "Success", Message = "Record SuccessFully Saved." };
                }
            }
            catch (Exception ex)
            {
                return ("Exception: " + ex.Message);

                //throw;
            }
            return new Response
            { Status = "Error", Message = "Invalid Data." };
        }
    }
}
