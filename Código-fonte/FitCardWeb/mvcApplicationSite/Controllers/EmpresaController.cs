using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Newtonsoft.Json;
using PagedList;

namespace mvcApplicationSite.Controllers
{
    public class EmpresaController : FitCardController
    {
        private Regra.EmpresaRegra regra;
        private const string CookieName = "EmpresaCookie";
        private const string _PartialCadastro = "_CadastroPartialView";
        private const string _PartialLista = "_ListaPartialView";

        public EmpresaController()
        {
            regra = new Regra.EmpresaRegra();
        }

        [HttpGet]
        public ActionResult Index()
        {
            return View(GetEntidades());
        }

        [HttpPost]
        public ActionResult Salvar(Modelo.EmpresaModelo obj)
        {
            string sMsg = string.Empty;
            bool isSucesso = false;
            try
            {
                if (!string.IsNullOrWhiteSpace(obj.Cnpj))
                    obj.Cnpj = obj.Cnpj.Replace("-", "").Replace(".", "").Replace("/", "").Trim();
                var retorno = obj.Id == 0 ? regra.Inserir(obj) : regra.Alterar(obj);
                isSucesso = retorno.Sucesso;
                sMsg = retorno.MensagemSucesso;
                if (!retorno.Sucesso)
                    throw new Exception(string.Join("\n", retorno.Erros));
            }
            catch (Exception ex)
            {
                sMsg = ex.Message;
            }
            return Json(new
            {
                sucesso = isSucesso,
                msg = sMsg
            }, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult Excluir(int id)
        {
            string sMsg = string.Empty;
            bool isSucesso = false;
            try
            {
                var obj = new Modelo.EmpresaModelo();
                obj.Id = id;
                var retorno = regra.Excluir(obj);
                isSucesso = retorno.Sucesso;
                sMsg = retorno.MensagemSucesso;
                if (!retorno.Sucesso)
                    throw new Exception(string.Join("\n", retorno.Erros));
            }
            catch (Exception ex)
            {
                sMsg = ex.Message;
            }
            return Json(new
            {
                sucesso = isSucesso,
                msg = sMsg
            }, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult Buscar(int id)
        {
            string sMsg = string.Empty;
            bool isSucesso = false;
            string sHtml = string.Empty;
            try
            {
                var entidade = regra.Buscar(id);
                sHtml = RenderPartialViewToString(_PartialCadastro, entidade);
                isSucesso = true;
            }
            catch (Exception ex)
            {
                sMsg = ex.Message;
            }
            return Json(new
            {
                sucesso = isSucesso,
                msg = sMsg,
                PartialViewHtml = sHtml
            }, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult RemoverCookie()
        {
            string sMsg = string.Empty;
            bool isSucesso = false;
            try
            {
                HttpCookie cookie = new HttpCookie(CookieName);
                if (cookie != null)
                {
                    cookie.Value = "";
                    cookie.Expires = DateTime.Now.AddDays(-1);
                    Response.Cookies.Add(cookie);
                }
                sMsg = "Cookie removido com sucesso!";
                isSucesso = true;
            }
            catch (Exception ex)
            {
                sMsg = ex.Message;
            }
            return Json(new
            {
                sucesso = isSucesso,
                msg = sMsg
            }, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public ActionResult BuscarPorFiltro(Modelo.EmpresaFiltro filtro)
        {
            string sMsg = string.Empty;
            bool isSucesso = false;
            string sHtml = string.Empty;
            try
            {
                if (!string.IsNullOrWhiteSpace(filtro.fCnpj))
                    filtro.fCnpj = filtro.fCnpj.Replace("-", "").Replace(".", "").Replace("/", "");
                var dados = JsonConvert.SerializeObject(filtro);
                HttpCookie cookie = new HttpCookie(CookieName);
                cookie.Value = dados;
                cookie.Expires = DateTime.Now.AddDays(30);
                Response.Cookies.Add(cookie);
                sHtml = GetHtmlLista(filtro);
                isSucesso = true;
            }
            catch (Exception ex)
            {
                sMsg = ex.Message;
            }
            var _json = Json(new
            {
                sucesso = isSucesso,
                msg = sMsg,
                PartialViewHtml = sHtml
            }, JsonRequestBehavior.AllowGet);
            _json.MaxJsonLength = int.MaxValue;
            return _json;
        }

        [HttpPost]
        public JsonResult BuscarPaginado(int? Pagina)
        {
            string sHtml = GetHtmlLista(Pagina: Pagina.GetValueOrDefault());
            var _json = Json(new { PartialViewHtml = sHtml }, JsonRequestBehavior.AllowGet);
            _json.MaxJsonLength = int.MaxValue;
            return _json;
        }

        private string GetHtmlLista(Modelo.EmpresaFiltro filtro = null, int Pagina = 1)
        {
            return RenderPartialViewToString(_PartialLista, GetEntidades(filtro, Pagina));
        }

        private StaticPagedList<Modelo.EmpresaModelo> GetEntidades(Modelo.EmpresaFiltro filtro = null, int Pagina = 1)
        {
            if (filtro == null)
            {
                filtro = new Modelo.EmpresaFiltro();
                if (Request.Cookies[CookieName] != null)
                {
                    HttpCookie cookie = Request.Cookies[CookieName];
                    if (!string.IsNullOrWhiteSpace(cookie.Value))
                    {
                        filtro = JsonConvert.DeserializeObject<Modelo.EmpresaFiltro>(cookie.Value);
                    }
                }
            }
            filtro.Pagina = Pagina;
            return regra.BuscarPorFiltro(filtro);
        }
    }
}