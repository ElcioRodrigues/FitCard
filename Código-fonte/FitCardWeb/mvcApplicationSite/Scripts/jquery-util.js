
var _Util = function() {

    var o = this;

    o.redirecionar = function (url) {
        this.modalAguarde();
        setTimeout(function () {
            location.href = url;
        },
        200);
    };

    o.modalAguarde = function (msg) {
        var divAguarde = $('<div id="divModalAguarde">').dialog({
            dialogClass: $(window).width() >= 800 ? "modalaguarde" : "modalaguardemobile",
            resizable: false,
            draggable: false,
            closeOnEscape: false,
            modal: true,
            open: function (event, ui) {
                $('.ui-dialog-titlebar', $('div[aria-describedby="divModalAguarde"]')).css('display', 'none');
                $('div.ui-widget-overlay').addClass("loading_modal");

                if ($(window).width() >= 800) {
                    var divLeft = $("<div class='mdivLeft'>").append($('<div>').addClass("object").prop({ id: "object_four" }))
                                                             .append($('<div>').addClass("object").prop({ id: "object_three" }))
                                                             .append($('<div>').addClass("object").prop({ id: "object_two" }))
                                                             .append($('<div>').addClass("object").prop({ id: "object_one" }));

                    if (msg == "" || msg == null)
                        msg = "Processando sua requisição...";
                    var divRigth = $("<div class='mdivRigth'>").
                                     append($("<p class='p1'>").text("Aguarde")).
                                     append($("<p>").text(msg));

                    $(this).append(divLeft);
                    $(this).append(divRigth);
                } else {

                    var div = $('<div style="width: 200px; height: 200px;">').append($('<div>').addClass("object").prop({ id: "object_four" }))
                                                             .append($('<div>').addClass("object").prop({ id: "object_three" }))
                                                             .append($('<div>').addClass("object").prop({ id: "object_two" }))
                                                             .append($('<div>').addClass("object").prop({ id: "object_one" }));

                    $(this).append(div);
                }
            }
        });
    };

    o.removerModalAguarde = function () {
        $('#divModalAguarde').dialog('destroy');
    };

    o.validaData = function (dataInicial) {
        var dia = dataInicial.value.substring(0, 2);
        var mes = dataInicial.value.substring(3, 5);
        var ano = dataInicial.value.substring(6, 10);
        if (ano.length == 4 && ano > 1900 && ano < 2100) {
            if (dia > 0 && dia <= 31 && mes > 0 && mes <= 12) {
                if ((mes == 4 || mes == 6 || mes == 9 || mes == 11) && dia > 30) {
                    document.getElementById(dataInicial.name).value = "";
                    return false;
                }
                if (mes == 2) {
                    if (ano % 4 == 0 && (ano % 100 != 0 || ano % 400 == 0)) {
                        if (dia > 29)
                            return false;
                    } else if (dia > 28) {
                        document.getElementById(dataInicial.name).value = "";
                        return false;
                    }
                }
            } else {
                document.getElementById(dataInicial.name).value = "";
                return false;
            }
            return true;
        }
        else {
            document.getElementById(dataInicial.name).value = "";
            return false;
        }
    };

}

$.extend(_Util.prototype, {
});

var $_Util = new _Util();

(function ($) {

    $.fn.modalSucesso = function (strTexto, callback) {
        if (callback && typeof callback === "function") {
            swal({
                title: "Sucesso",
                text: $.fn.htmlEncode(strTexto),
                type: "success"
            }, function (isConfirm) {
                if (isConfirm) {
                    if (callback && typeof callback === "function") {
                        callback.call(this);
                    }
                }
            });
        } else {
            swal("Sucesso", $.fn.htmlEncode(strTexto), "success");
        }
    };

    $.fn.modalErro = function (strTexto, callback) {
        if (callback && typeof callback === "function") {
            swal({
                title: "Erro",
                text: $.fn.htmlEncode(strTexto),
                type: "error"
            }, function (isConfirm) {
                if (isConfirm) {
                    if (callback && typeof callback === "function") {
                        callback.call(this);
                    }
                }
            });
        } else {
            swal("Erro", $.fn.htmlEncode(strTexto), "error");
        }
    };

    $.fn.modalAviso = function (strTexto, callback) {
        if (callback && typeof callback === "function") {
            swal({
                title: "Alerta",
                text: $.fn.htmlEncode(strTexto),
                type: "info"
            }, function (isConfirm) {
                if (isConfirm) {
                    if (callback && typeof callback === "function") {
                        callback.call(this);
                    }
                }
            });
        } else {
            swal("Alerta", $.fn.htmlEncode(strTexto), "info");
        }
    };

    $.fn.modalConfirmacao = function (titulo, texto, callback, args) {
        a = !args ? {} : args;
        a.type = !a.type ? "warning" : a.type;
        a.confirmButtonColor = !a.confirmButtonColor ? "#DD6B55" : a.confirmButtonColor;
        a.confirmButtonText = !a.confirmButtonText ? "Confirmar" : a.confirmButtonText;
        a.cancelButtonText = !a.cancelButtonText ? "Cancelar" : a.cancelButtonText;
        a.closeOnConfirm = !a.closeOnConfirm ? false : a.closeOnConfirm;
        a.closeOnCancel = !a.closeOnCancel ? true : a.closeOnCancel;

        swal({
            title: titulo,
            text: texto,
            type: a.type,
            showCancelButton: true,
            confirmButtonColor: a.confirmButtonColor,
            confirmButtonText: a.confirmButtonText,
            cancelButtonText: a.cancelButtonText,
            closeOnConfirm: a.closeOnConfirm,
            closeOnCancel: a.closeOnCancel
        }, function (isConfirm) {
            if (isConfirm) {
                if (callback && typeof callback === "function") {
                    $('.sweet-alert .cancel').click();
                    callback.call(this);
                }
            }
        });
    };

    $.fn.htmlEncode = function (str) {
        return $('<div>').html(str).text();
    };

    $.fn.escapeHtml = function (str) {
        var div = document.createElement('div');
        div.appendChild(document.createTextNode(str));
        return div.innerHTML;
    };

    $.fn.limparForm = function () {
        if (this.length == 0)
            return false;
        var oForm = $(this)[0];
        var elements = oForm.elements;
        oForm.reset();

        if ($(this).find('.alertacampo')) {
            $(this).find('.alertacampo').each(function () {
                $(this).removeClass('alertacampo');
            });
        }

        for (i = 0; i < elements.length; i++) {
            field_type = elements[i].type.toLowerCase();
            switch (field_type) {
                case "hidden":
                    elements[i].value = "";
                    break;
                case "text":
                case "password":
                case "textarea":
                    elements[i].value = "";
                    break;
                case "radio":
                    if (elements[i].checked) {
                        elements[i].checked = false;
                    }
                    break;
                case "checkbox":
                    if (elements[i].checked) {
                        elements[i].checked = false;
                    }
                    elements[i].value = false;
                    if ($(elements[i]).parent().hasClass("switch-animate")) {
                        $(elements[i]).parent().removeClass("switch-on").addClass("switch-off");
                    }
                    break;
                case "select-one":
                    $(elements[i]).val('');
                    if ($(elements[i]).data('selectpicker')) {
                        $(elements[i]).selectpicker('val', "");
                    }
                    break;
                case "select-multi":
                    $(elements[i]).val('');
                    if ($(elements[i]).data('selectpicker')) {
                        $(elements[i]).selectpicker("deselectAll");
                    }
                    break;
                default:
                    break;

            }
        }
    };

    $.fn.formValido = function (classManual) {

        if (this.length == 0)
            return false;
        var form = this;
        var inpsText = $(form).find('input[type="text"]');
        var comerros = [];
        var classe = $.trim(classManual) != "" && classManual != null ? classManual : 'obg';
        $.each(inpsText, function (i, p) {
            if (!$(p).attr('readonly') && !$(p).attr('disabled') && $(p).is(':visible')) {
                $(p).removeClass('alertacampo');
                var valor = $(p).val();
                if ($.trim(valor) == "") {
                    if ($(p).hasClass(classe)) {
                        comerros.push(1);
                        $(p).addClass('alertacampo');
                    }
                }
                if ($.trim(valor) != "" && $(p).hasClass('data') && !$(p).hasClass('alertacampo')) {
                    if (!$.fn.validarData(valor)) {
                        $(p).addClass('alertacampo');
                    }
                }
            }
        });

        var inptsFile = $(form).find('input[type="file"]');
        $.each(inptsFile, function (i, p) {
            if (!$(p).attr('readonly') && !$(p).attr('disabled') && $(p).is(':visible')) {
                $(p).removeClass('alertacampo');
                var valor = $(p).val();
                if ($.trim(valor) == "") {
                    if ($(p).hasClass(classe)) {
                        comerros.push(1);
                        $(p).addClass('alertacampo');
                    }
                }
            }
        });

        var textarea = $(form).find('textarea');
        $.each(textarea, function (i, p) {
            if ($(p).is(':visible')) {
                $(p).removeClass('alertacampo');
                var valor = $(p).val();
                if ($.trim(valor) == "") {
                    if ($(p).hasClass(classe)) {
                        comerros.push(1);
                        $(p).addClass('alertacampo');
                    }
                }
                if ($.trim(valor) != "" && $(p).hasClass('data') && !$(p).hasClass('alertacampo')) {
                    if (!$.fn.validarData(valor)) {
                        $(p).addClass('alertacampo');
                    }
                }
            }
        });

        var selects = $(form).find('select');
        $.each(selects, function (i, s) {
            if ($(s).is(':visible')) {
                var isSelectpicker = $(s).hasClass('selectpicker');
                $(s).removeClass('alertacampo');
                if (isSelectpicker && $(s).parent().find('div.btn-group').length > 0) {
                    $(s).parent().find('div.btn-group').removeClass("alertacampo");
                }
                if (($.trim($(s).val()) == "" || $.trim($(s).val()) == "0") && $(s).hasClass(classe)) {
                    if (isSelectpicker && $(s).parent().find('div.btn-group').length > 0) {
                        $(s).parent().find('div.btn-group').addClass("alertacampo");
                    }
                    else {
                        $(s).addClass("alertacampo");
                    }
                    comerros.push(1);
                }
            } else {
                var id = $(s).attr('id');
                if (id != null && id != "") {
                    var idChosen = "#" + id + "_chosen";
                    if ($(idChosen).length > 0 && $(idChosen).is(':visible')) {
                        if (($.trim($(s).val()) == "" || $.trim($(s).val()) == "0") && $(s).hasClass(classe)) {
                            $(idChosen).addClass("alertacampo");
                            comerros.push(1);
                        } else
                            $(idChosen).removeClass('alertacampo');
                    }
                }
            }
        });

        $(".obg_box").removeClass("alertacampo");
        var checkboxs = $(form).find($("input:checkbox.obg[name]")).map(function () { return $(this).attr("name"); }).get();
        checkboxs = $.unique(checkboxs);
        $.each(checkboxs, function (i, c) {
            if ($("input[name='" + c + "']").is(':visible') && $("input[name='" + c + "']:checked").length == 0) {
                comerros.push(1);
                var div = $("input[name='" + c + "']:first").closest('div.obg_box');
                if (!div.length) {
                    div = $("input[name='" + c + "']:first").parent("div");
                }
                if (div) {
                    div.addClass("alertacampo");
                }
            }
        });
        var radios = $(form).find($("input:radio.obg[name]")).map(function () { return $(this).attr("name"); }).get();
        radios = $.unique(radios);
        $.each(radios, function (i, r) {
            if ($("input[name='" + r + "']").is(':visible') && $("input[name='" + r + "']:checked").length == 0) {
                comerros.push(1);
                var div = $("input[name='" + r + "']:first").closest('div.obg_box');
                if (!div.length) {
                    div = $("input[name='" + r + "']:first").parent("div");
                }
                if (div) {
                    div.addClass("alertacampo");
                }
            }
        });
        var hiddens = $(form).find($("input:hidden.obg")).map(function () { return $(this).attr("id"); }).get();
        hiddens = $.unique(hiddens);
        $.each(hiddens, function (i, h) {
            var val = $("#" + h).val();
            if (val == "" || val < 0) {
                comerros.push(1);
                $("#autocomplete_" + h).addClass("alertacampo");
            }
        });

        var valido = comerros.length == 0;
        if (!valido && $(form).find('.alertacampo').length > 0) {
            $('html, body').animate({
                scrollTop: $(form).find('.alertacampo:first').offset().top - 25
            }, 2000);
        }
        return valido;
    };

    $.fn.serializeObject = function () {
        var o = {};
        var a = this.serializeArray();
        $.each(a, function () {
            if (o[this.name] !== undefined) {
                if (!o[this.name].push) {
                    o[this.name] = [o[this.name]];
                }
                o[this.name].push(this.value || '');
            } else {
                o[this.name] = this.value || '';
            }
        });
        return o;
    };

}(jQuery));