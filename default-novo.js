function openCart() {

    $("div#carrinho").on("click", function () {
        $("header>.minicart").toggleClass('active');
        $(".bg-shadow").toggle();
    });
}

function closeCart() {

    $(".bg-shadow").on("click", function () {
        $("header>.minicart").toggleClass('active');
        $(".bg-shadow").toggle();
    });
}

function addTocart() {
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
}

function vitrinesHome() {
    $(".home .vitrine>.prateleira>ul").slick({
        slidesToShow: 5,
        slidesToScroll: 1
    });
}

function carrosselMarcas() {
    $(".home .carrossel-marcas").slick({
        slidesToShow: 9,
        slidesToScroll: 1
    });
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

    addTocart();
    openCart();
    closeCart();
    vitrinesHome();
    carrosselMarcas();

    $("body.departamento fieldset.orderBy select>option:nth-of-type(1)").text("Ordenar Por")
});