function header() {

    /* add botão de fechar minicart */

    $("header>.minicart span#minicart-title").prepend("<p class='close-minicart'>Voltar</p>")

    /* abrir carrinho */

    $("div#carrinho").on("click", function () {
        $("header>.minicart").addClass('active');
        $(".bg-shadow").toggle();
        console.log("opencart")
    });

    /* fechar carrinho */

    $(".bg-shadow, .close-minicart").on("click", function () {
        $("header>.minicart").removeClass('active');
        $(".bg-shadow").toggle();
        console.log("closecart")
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
}

function montarSeletordeSKU() {
    // var listaSKus = []
    // $("body.produto div#sku .skuList").each(function () {
    //     listaSKus.push($(this).children(".nomeSku").text())
    // });
    // console.log(listaSKus)

    // $("ul#sku_list").append(listaSKus.map(item => `<li>${item}</li>`).join(''))

    var listaSKUs = (skuJson_0.skus)

    listaSKUs.forEach(codsku => {
        $("ul#sku_list").append(`<li>${codsku.skuname}</li>`)
    });
}

$(document).ready(function () {
    header();
    home();
    product();
    departamento();
});