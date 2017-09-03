using System.Web;
using System.Web.Optimization;

namespace mvcApplicationSite
{
    public class BundleConfig
    {
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/jquery").
                Include("~/Scripts/jquery-{version}.js").
                Include("~/Scripts/sweetalert/sweet-alert.js").
                Include("~/Scripts/jquery-util.js").
                Include("~/Scripts/jquery.limit-1.2.js").
                Include("~/Scripts/jquery.mask.js").
                Include("~/Scripts/jquery-ui.js").
                Include("~/Scripts/jquery.unobtrusive-ajax.js"));

            bundles.Add(new ScriptBundle("~/bundles/jqueryval").Include(
                        "~/Scripts/jquery.validate*"));
            
            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
                        "~/Scripts/modernizr-*"));

            bundles.Add(new ScriptBundle("~/bundles/bootstrap").Include(
                      "~/Scripts/bootstrap.js",
                      "~/Scripts/respond.js"));

            bundles.Add(new StyleBundle("~/Content/css").Include(
                      "~/Content/bootstrap.css",
                      "~/Content/Site.css").
                      Include("~/Content/sweetalert/sweet-alert.css").
                      Include("~/Content/sweetalert/jquery-ui.css"));
        }
    }
}
