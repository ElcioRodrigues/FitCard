using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace mvcApplicationSite.Controllers
{
    [ValidateInput(false)]
    public class FitCardController : Controller
    {
        public string RenderPartialViewToString(string viewname, object model = null)
        {
            ViewData.Model = model;

            using (StringWriter sw = new StringWriter())
            {
                ViewEngineResult resultView = ViewEngines.Engines.FindPartialView(ControllerContext, viewname);
                ViewContext contextView = new ViewContext(ControllerContext, resultView.View, ViewData, TempData, sw);
                resultView.View.Render(contextView, sw);
                return sw.GetStringBuilder().ToString();
            }
        }
    }
}