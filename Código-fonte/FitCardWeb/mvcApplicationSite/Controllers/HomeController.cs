using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace mvcApplicationSite.Controllers
{
    public class HomeController : FitCardController
    {
        public ActionResult Index()
        {
            return View();
        }
    }
}