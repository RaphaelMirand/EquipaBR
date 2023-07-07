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
        slidesToScroll: 1
    });
}

function home() {

    /* prateleiras produtos home */
    $(".home .vitrine>.prateleira>ul").slick({
        slidesToShow: 5,
        slidesToScroll: 1
    });

    /* prateleira marcas */

    $(".home .carrossel-marcas").slick({
        slidesToShow: 9,
        slidesToScroll: 1
    });
}

function departamento() {

    /* adicionar "ordenar por" no options de filtragem */
    $("body.departamento fieldset.orderBy select>option:nth-of-type(1)").text("Ordenar Por")

    /* montar menu de filtros */

    $(".box-filtros .search-single-navigator>h3").each(function () {
        $(this).children("a").removeAttr("href");
        $(this).append('<div class="dropdown"></div>'),
            $(this).find(".dropdown").prepend($(this).siblings(".even"))

    });

    /* abrir e fechar menus */

    $(".search-single-navigator h5, .search-single-navigator h3>a").on("click", function () {
        $(this).toggleClass("close-menu");
    });
}

function institucional() {
    $("body #institucionais #sidebar-inst div h4").click(function (e) {
        $(this).toggleClass('active');
        $("body #institucionais #sidebar-inst div ul").toggleClass('active');
    });
}

$(document).ready(function () {
    header();
    home();
    product();
    departamento();
    institucional();
});