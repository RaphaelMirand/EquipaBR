function header() {

    /* add botão de fechar minicart */

    $("header>.minicart span#minicart-title").prepend("<p class='close-minicart'>Voltar</p>")

    /* abrir carrinho */

    $("div#carrinho").on("click", function () {
        $("header>.minicart").addClass('active');
        $(".bg-shadow").toggle();
    });

    /* fechar carrinho */

    $(".bg-shadow, .close-minicart").on("click", function () {
        $("header>.minicart").removeClass('active');
        $(".bg-shadow").toggle();
    });

    // adicionar produto ao carrinho pela vitrine

    $(".prateleira ul li").each(function () {
        let skuid = $(this).find(".info-product input.buy-button-asynchronous-defaultsku-id").attr("value");

        $(this).find('.shelf-buy').click(function () {
            console.log(skuid)
            var item = {
                id: skuid,
                quantity: 1,
                seller: '1'
            };
            vtexjs.checkout.addToCart([item], null, 1)
                .done(function (orderForm) {
                    alert('Item adicionado!');
                    console.log(orderForm);
                });
        });

    });

    /* placeholder do campo de busca */

    $("#busca>fieldset>input.fulltext-search-box").attr("placeholder", "O que você está buscando?");

    /* monta o menu departamentos */

    $("#menu .menu-departamento > h3").each(function () {
        $(this).append('<div class="dropdown"></div>'),
            $(this).find(".dropdown").prepend($(this).next())
    }),
        $("#menu").css("visibility", "visible")

    /* monta o menu departamentos mobile */

    $(".container-menus-mobile .menu-departamento > h3").each(function () {
        $(this).append('<div class="dropdown"></div>'),
            $(this).find(".dropdown").prepend($(this).next())
    })

    $(".container-menus-mobile .menu-departamento>h3").on("click", function () {
        $(this).toggleClass("open-menu");
    });

    if (screen.width < 1024) {

        $("div#info-topo>div ul").slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 2000,
            arrows: false,
        });
    }


    /* abrir e fechar menu mobile */

    $(".menu-mobile").on("click", function () {
        $(".container-menus-mobile, .bg-shadow").fadeIn();
    });

    $(".bg-shadow").on("click", function () {
        $(".container-menus-mobile, .bg-shadow").fadeOut();
    });

    /* esconder sugestão de busca sempre que efetuar o scroll na página */

    $(window).scroll(function () {
        $('ul.ui-autocomplete').hide();
    });

}

function footer() {

    /* menu institucional footer mobile */

    if (screen.width < 1024) {
        $("div#footer .footer-linha-1>div.container>div:nth-of-type(1) h6").click(function () {
            $(this).toggleClass("close-menu")
        });

        $("div#footer .footer-linha-1>div.container>div:nth-of-type(2) h6").click(function () {
            $(this).toggleClass("close-menu")
        });
    }
}

function product() {

    /* disparar click no botão de frete */

    $("div#frete a.shipping-value").trigger("click");

    /* modificar valor input de quantidade */

    $(".buttons span#plus").on("click", function () {
        var val_input_old = $("div#quantity-selector input").val();
        var val_input_new = parseInt(val_input_old) + 1
        if (val_input_new > 0) {
            $("div#quantity-selector input").attr("value", val_input_new);
        }
    });

    $(".buttons span#minus").on("click", function () {
        var val_input_old = $("div#quantity-selector input").val();
        var val_input_new = parseInt(val_input_old) - 1
        if (val_input_new > 0) {
            $("div#quantity-selector input").attr("value", `${val_input_new}`);
        }
    });

    /* enviar item para o carrinho*/

    jQuery(function ($) {
        $(".buyButton a.buy-button").click(function (e) {
            e.preventDefault();
            $("div#ajaxBusy").fadeIn("fast")
            var hrefCart = $(".buyButton .buy-button").attr("href");
            if (hrefCart === "javascript:alert('Por favor, selecione o modelo desejado.');") {
                alert("Por favor, selecione o modelo desejado");
            } else {
                var resURL = hrefCart.split("sku=").pop().split("&qty=").shift();
                item = {
                    id: resURL,
                    quantity: $("#quantity-selector input").val(),
                    seller: 1
                };
                vtexjs.checkout.getOrderForm().then(function (orderForm) {
                    vtexjs.checkout.addToCart([item]).done(function (orderForm) {

                    });
                });
                $("div#ajaxBusy").fadeOut("slow");
                $(".minicart").toggleClass("cart-active");
                $("body").toggleClass("body-cart-active");
                //$("div#minicart").fadeIn("fast").fadeOut(10000);
            }

        });
    });

    /* mudar texto do botão para "calcular" */
    setTimeout(function () {
        $("#frete input#btnFreteSimulacao").val("Calcular");
    }, 1000);

    /* prateleira Quem viu, viu também */

    $(".carrossel .prateleira>ul").slick({
        slidesToShow: 5,
        slidesToScroll: 1,
        infinite: true,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    infinite: true,
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    infinite: true,
                }
            }
        ]
    });


    /* mudar frase frete grátis no calculo */

    setTimeout(function () {
        $("#frete input#btnFreteSimulacao").on("click", function () {
            $(".freight-values>table").remove();
            verificarTable();
        })
    }, 1000);

    /* verifica se a table existe e dispara as functions */

    function verificarTable() {
        if ($(".freight-values>table").length > 0) {
            verificarFreteGratis();
            retirarDiasuteis();
        } else {
            setTimeout(function () {
                verificarTable()
            }, 100);
        }
    }

    function verificarFreteGratis() {
        $("#frete .freight-values tbody>tr").each(function () {
            if ($(this).find("td:nth-of-type(1)").text() == "Frete Grátis") {
                $(this).addClass("frete-gratis")
            }
        });
        $(".freight-values>table").css("display", "table")
    }

    /* retira todo o texto que vem após "úteis" */

    function retirarDiasuteis() {
        $("#frete .freight-values tbody>tr>td").each(function () {
            var descricao_frete = $(this).text()
            var uteis = "úteis"
            var palavras = descricao_frete.split(' ')
            var indice = palavras.indexOf(uteis)
            if (indice !== -1) {
                var descricao_frete = palavras.slice(0, indice + 1).join(' ')
                console.log(descricao_frete)
                $(this).text(descricao_frete)
            }
        });
    }

}

function home() {

    /* banner full */

    $(".container-banner-principal>div").slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 4000,
    });

    function prateleiraCarousel() {
        $("li.helperComplement").remove(),
            $(".home .vitrine>.prateleira>ul").addClass("owl-carousel"),
            $(".owl-carousel").owlCarousel({
                margin: 10,
                navigation: false,
                dots: false,
                loop: true,
                center: false,
                items: 3,
                responsiveClass: !0,
                responsive: {
                    0: {
                        items: 2,
                        nav: !0,
                    },
                    600: {
                        items: 2,
                        nav: !0
                    },
                    1e3: {
                        items: 5,
                        nav: !0
                    }
                }
            }),
            $(".vitrine").css("visibility", "visible")
    }

    /* prateleira marcas */

    $(".home .carrossel-marcas").slick({
        slidesToShow: 9,
        slidesToScroll: 1,
        infinite: true,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 5,
                    slidesToScroll: 3,
                    infinite: true,
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    infinite: true,
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    infinite: true,
                }
            }
        ]
    });

    /* carrossel de categorias no mobile */

    if ($(window).width() < 900) {
        $(".container-carrossel-categorias .container-imagens").slick({
            slidesToShow: 2,
            slidesToScroll: 2,
            arrows: false
        });
    }

    prateleiraCarousel();
}

function departamento() {

    /* adicionar "ordenar por" no options de filtragem */
    $("body.departamento fieldset.orderBy select>option:nth-of-type(1)").text("Ordenar por")

    /* montar menu de filtros */

    $(".box-filtros .search-single-navigator>h3").each(function () {
        $(this).children("a").removeAttr("href");
        $(this).append('<div class="dropdown"></div>'),
            $(this).find(".dropdown").prepend($(this).siblings(".even"))

    });

    $(".box-filtros .search-multiple-navigator>fieldset>h5").on("click", function () {
        $(this).toggleClass("open-menu");
    });

    /* montar menu filtros busca */

    $("body.departamento.resultado-busca .box-filtros .search-single-navigator>h3").each(function () {
        $(this).find(".dropdown").prepend($(this).next("ul"))
    });

    /* adicionar termo de busca ao título */

    var termo_busca = vtxctx.searchTerm
    $("body.departamento.resultado-busca .content-produtos .title-page").append('<h2 class="termo-busca">"' + termo_busca + '"</h2>')

    $("body.departamento.resultado-busca .bread-crumb ul").append('<li>Buscar por "' + termo_busca + '"</li>')

    /* termo busca vazia */

    var termo_vazia = $("meta[name='Abstract']").attr("content");

    $("body.resultado-busca.vazia .bread-crumb ul").append('<li>Buscar por "' + termo_vazia + '"</li>')

    /* abrir e fechar menus */

    $(".search-single-navigator h5, .search-single-navigator h3>a").on("click", function () {
        $(this).toggleClass("close-menu");
    });

    $(".menu-navegue").on("click", function () {
        $(".search-single-navigator").toggleClass("active");
    });
}

function institucional() {
    $("body #institucionais #sidebar-inst div h4").click(function (e) {
        $(this).toggleClass('active');
        $(this).next("ul").toggleClass('active');
    });

    const termo_vazia = $("body #institucionais .inst-content h4").html();
    $("body.institucional .bread-crumb ul").append(`<li>${termo_vazia}</li>`);

    /* fale conosco */

    $("div.inst-content form").submit(function (event) {
        event.preventDefault();

        var formData = {
            "Nome": $("#nome").val(),
            "Sobrenome": $("#sobrenome").val(),
            "Email": $("#email-contato").val(),
            "Telefone": $("input#telefone").val(),
            "Tipo": $("#tipo").val(),
            "Mensagem": $("#mensagem").val()
        }


        $.ajax({
            url: '/api/dataentities/FC/documents',
            accept: "application/vnd.vtex.ds.v10 json",
            type: 'POST',
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(formData),

            success: function (response) {
                console.log("Enviado" + JSON.stringify(formData))
                $('div.inst-content form').hide();
                $('body #institucionais .inst-content').append("<p class='sucess'>Agradecemos a sua mensagem, entraremos em contato em breve!</p>");
            },
            error: function (error) {
                console.log("Erro:", error)
            },
        });
    })

    /* function para aplicar a máscara */

    !function (a) {
        "function" == typeof define && define.amd ? define(["jquery"], a) : a("object" == typeof exports ? require("jquery") : jQuery)
    }(function (a) {
        var b, c = navigator.userAgent, d = /iphone/i.test(c), e = /chrome/i.test(c), f = /android/i.test(c);
        a.mask = {
            definitions: {
                9: "[0-9]",
                a: "[A-Za-z]",
                "*": "[A-Za-z0-9]"
            },
            autoclear: !0,
            dataName: "rawMaskFn",
            placeholder: "_"
        },
            a.fn.extend({
                caret: function (a, b) {
                    var c;
                    if (0 !== this.length && !this.is(":hidden"))
                        return "number" == typeof a ? (b = "number" == typeof b ? b : a,
                            this.each(function () {
                                this.setSelectionRange ? this.setSelectionRange(a, b) : this.createTextRange && (c = this.createTextRange(),
                                    c.collapse(!0),
                                    c.moveEnd("character", b),
                                    c.moveStart("character", a),
                                    c.select())
                            })) : (this[0].setSelectionRange ? (a = this[0].selectionStart,
                                b = this[0].selectionEnd) : document.selection && document.selection.createRange && (c = document.selection.createRange(),
                                    a = 0 - c.duplicate().moveStart("character", -1e5),
                                    b = a + c.text.length),
                            {
                                begin: a,
                                end: b
                            })
                },
                unmask: function () {
                    return this.trigger("unmask")
                },
                mask: function (c, g) {
                    var h, i, j, k, l, m, n, o;
                    if (!c && this.length > 0) {
                        h = a(this[0]);
                        var p = h.data(a.mask.dataName);
                        return p ? p() : void 0
                    }
                    return g = a.extend({
                        autoclear: a.mask.autoclear,
                        placeholder: a.mask.placeholder,
                        completed: null
                    }, g),
                        i = a.mask.definitions,
                        j = [],
                        k = n = c.length,
                        l = null,
                        a.each(c.split(""), function (a, b) {
                            "?" == b ? (n--,
                                k = a) : i[b] ? (j.push(new RegExp(i[b])),
                                    null === l && (l = j.length - 1),
                                    k > a && (m = j.length - 1)) : j.push(null)
                        }),
                        this.trigger("unmask").each(function () {
                            function h() {
                                if (g.completed) {
                                    for (var a = l; m >= a; a++)
                                        if (j[a] && C[a] === p(a))
                                            return;
                                    g.completed.call(B)
                                }
                            }
                            function p(a) {
                                return g.placeholder.charAt(a < g.placeholder.length ? a : 0)
                            }
                            function q(a) {
                                for (; ++a < n && !j[a];)
                                    ;
                                return a
                            }
                            function r(a) {
                                for (; --a >= 0 && !j[a];)
                                    ;
                                return a
                            }
                            function s(a, b) {
                                var c, d;
                                if (!(0 > a)) {
                                    for (c = a,
                                        d = q(b); n > c; c++)
                                        if (j[c]) {
                                            if (!(n > d && j[c].test(C[d])))
                                                break;
                                            C[c] = C[d],
                                                C[d] = p(d),
                                                d = q(d)
                                        }
                                    z(),
                                        B.caret(Math.max(l, a))
                                }
                            }
                            function t(a) {
                                var b, c, d, e;
                                for (b = a,
                                    c = p(a); n > b; b++)
                                    if (j[b]) {
                                        if (d = q(b),
                                            e = C[b],
                                            C[b] = c,
                                            !(n > d && j[d].test(e)))
                                            break;
                                        c = e
                                    }
                            }
                            function u() {
                                var a = B.val()
                                    , b = B.caret();
                                if (a.length < o.length) {
                                    for (A(!0); b.begin > 0 && !j[b.begin - 1];)
                                        b.begin--;
                                    if (0 === b.begin)
                                        for (; b.begin < l && !j[b.begin];)
                                            b.begin++;
                                    B.caret(b.begin, b.begin)
                                } else {
                                    for (A(!0); b.begin < n && !j[b.begin];)
                                        b.begin++;
                                    B.caret(b.begin, b.begin)
                                }
                                h()
                            }
                            function v() {
                                A(),
                                    B.val() != E && B.change()
                            }
                            function w(a) {
                                if (!B.prop("readonly")) {
                                    var b, c, e, f = a.which || a.keyCode;
                                    o = B.val(),
                                        8 === f || 46 === f || d && 127 === f ? (b = B.caret(),
                                            c = b.begin,
                                            e = b.end,
                                            e - c === 0 && (c = 46 !== f ? r(c) : e = q(c - 1),
                                                e = 46 === f ? q(e) : e),
                                            y(c, e),
                                            s(c, e - 1),
                                            a.preventDefault()) : 13 === f ? v.call(this, a) : 27 === f && (B.val(E),
                                                B.caret(0, A()),
                                                a.preventDefault())
                                }
                            }
                            function x(b) {
                                if (!B.prop("readonly")) {
                                    var c, d, e, g = b.which || b.keyCode, i = B.caret();
                                    if (!(b.ctrlKey || b.altKey || b.metaKey || 32 > g) && g && 13 !== g) {
                                        if (i.end - i.begin !== 0 && (y(i.begin, i.end),
                                            s(i.begin, i.end - 1)),
                                            c = q(i.begin - 1),
                                            n > c && (d = String.fromCharCode(g),
                                                j[c].test(d))) {
                                            if (t(c),
                                                C[c] = d,
                                                z(),
                                                e = q(c),
                                                f) {
                                                var k = function () {
                                                    a.proxy(a.fn.caret, B, e)()
                                                };
                                                setTimeout(k, 0)
                                            } else
                                                B.caret(e);
                                            i.begin <= m && h()
                                        }
                                        b.preventDefault()
                                    }
                                }
                            }
                            function y(a, b) {
                                var c;
                                for (c = a; b > c && n > c; c++)
                                    j[c] && (C[c] = p(c))
                            }
                            function z() {
                                B.val(C.join(""))
                            }
                            function A(a) {
                                var b, c, d, e = B.val(), f = -1;
                                for (b = 0,
                                    d = 0; n > b; b++)
                                    if (j[b]) {
                                        for (C[b] = p(b); d++ < e.length;)
                                            if (c = e.charAt(d - 1),
                                                j[b].test(c)) {
                                                C[b] = c,
                                                    f = b;
                                                break
                                            }
                                        if (d > e.length) {
                                            y(b + 1, n);
                                            break
                                        }
                                    } else
                                        C[b] === e.charAt(d) && d++,
                                            k > b && (f = b);
                                return a ? z() : k > f + 1 ? g.autoclear || C.join("") === D ? (B.val() && B.val(""),
                                    y(0, n)) : z() : (z(),
                                        B.val(B.val().substring(0, f + 1))),
                                    k ? b : l
                            }
                            var B = a(this)
                                , C = a.map(c.split(""), function (a, b) {
                                    return "?" != a ? i[a] ? p(b) : a : void 0
                                })
                                , D = C.join("")
                                , E = B.val();
                            B.data(a.mask.dataName, function () {
                                return a.map(C, function (a, b) {
                                    return j[b] && a != p(b) ? a : null
                                }).join("")
                            }),
                                B.one("unmask", function () {
                                    B.off(".mask").removeData(a.mask.dataName)
                                }).on("focus.mask", function () {
                                    if (!B.prop("readonly")) {
                                        clearTimeout(b);
                                        var a;
                                        E = B.val(),
                                            a = A(),
                                            b = setTimeout(function () {
                                                z(),
                                                    a == c.replace("?", "").length ? B.caret(0, a) : B.caret(a)
                                            }, 10)
                                    }
                                }).on("blur.mask", v).on("keydown.mask", w).on("keypress.mask", x).on("input.mask paste.mask", function () {
                                    B.prop("readonly") || setTimeout(function () {
                                        var a = A(!0);
                                        B.caret(a),
                                            h()
                                    }, 0)
                                }),
                                e && f && B.off("input.mask").on("input.mask", u),
                                A()
                        })
                }
            })
    }),

        $("input#telefone").mask("(99) 99999-9999").focusout(function (a) {
            var b, c, d;
            b = a.currentTarget ? a.currentTarget : a.srcElement,
                c = b.value.replace(/\D/g, ""),
                d = $(b),
                d.unmask(),
                c.length > 10 ? d.mask("(99) 99999-999?9") : d.mask("(99) 9999-9999?9")
        })
}

$(document).ready(function () {
    header();
    footer();
    home();
    product();
    departamento();
    institucional();
});