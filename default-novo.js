function montaMBMenu() {
    var menuBtn = $('.menu');//line
    var menu = $('.MB-navdrawer-container');//line
    var closeMenuM = $('.MB-menu-close');//line

    menuBtn.click(function OpenMenu() {
        menu.animate({ left: "0%", opacity: "1" }, "slow");
    });

    closeMenuM.click(function CloseMenu() {
        menu.animate({ left: "-90%" }, "slow");
        $(".MB-menu-inicio").removeClass('fa-angle-right-90');
        $(".MB-menu-conteudo").slideUp("fast");
        $('a.MB-menu-item-texto').css('color', '#FFFFFF');
        $(".menu-departamento h3").removeClass('fa-angle-right-90');
        $(".menu-departamento ul").slideUp("fast");
        $O = "n";
        $K = "n";
        $(".MB-menu-conteudo .menu-departamento h3").removeClass('fa-angle-right-90');
        $(".MB-menu-conteudo .menu-departamento ul").slideUp("fast");
        $(".MB-menu-conteudo .menu-departamento h3").css('background', '#013148');
    });

    $(".MB-menu-inicio").addClass('fa-angle-right');
    $(".MB-menu-inicio").addClass('fa');
    $(".MB-menu-conteudo .menu-departamento h3").addClass('fa-angle-right');
    $(".MB-menu-conteudo .menu-departamento h3").addClass('fa');

    $(".MB-menu-conteudo").hide();
    $(".MB-menu-inicio").click(function () {
        if ($O == "n") {
            $(this).addClass('fa-angle-down-90');
            $(".MB-menu-conteudo").slideUp("slow");
            $('a.MB-menu-item-texto').css('color', '#FFFFFF');
            $(this).next(".MB-menu-conteudo").slideDown("slow");
            $K = "n";
            $O = "s";
        } else {
            $(".MB-menu-inicio").removeClass('fa-angle-right-90');
            $(".MB-menu-conteudo").slideUp("fast");
            $('a.MB-menu-item-texto').css('color', '#FFFFFF');
            $(".menu-departamento h3").removeClass('fa-angle-right-90');
            $(".menu-departamento ul").slideUp("fast");
            $O = "n";
            $K = "n";
            $(".MB-menu-conteudo .menu-departamento h3").removeClass('fa-angle-right-90');
            $(".MB-menu-conteudo .menu-departamento ul").slideUp("fast");
            $(".MB-menu-conteudo .menu-departamento h3").css('background', '#013148');
        };
    });

    $K = "n";
    $(".MB-menu-conteudo .menu-departamento ul").hide();
    $(".MB-menu-conteudo .menu-departamento h3").click(function () {
        if ($K == "n") {
            $(this).addClass('fa-angle-right-90');
            $(this).css('background', '#013148');
            $(".MB-menu-conteudo .menu-departamento ul").slideUp("slow");
            $(this).next(".MB-menu-conteudo .menu-departamento ul").slideDown("slow");
            $K = "s";
        } else {
            $(".MB-menu-conteudo .menu-departamento h3").removeClass('fa-angle-right-90');
            $(".MB-menu-conteudo .menu-departamento ul").slideUp("fast");
            $(".MB-menu-conteudo .menu-departamento h3").css('background', '#013148');
            $K = "n";
        };
    });
};

function closePopup() {
    document.cookie = "popup=true;";
    $('.fundo-popup-capture').remove();
    $('#popup-capture').remove();
}

function openPopup() {
    $('.fundo-popup-capture').show();
    $('#popup-capture').css('display', 'block');
}

function getCookie(name) {
    var value = "; " + document.cookie;
    var parts = value.split("; " + name + "=");
    if (parts.length == 2) return parts.pop().split(";").shift();
}

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

    console.log("addTocart")

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

$(window).ready(function () {

    if ($(location).attr('href').match(/equipabr.com.br/)) {
        location.href = $(location).attr('href').replace('equipabr.com.br', 'equipabr.com');
    } else {

    }

});

$(document).ready(function () {

    addTocart();
    openCart();
    closeCart();

    $i = "n";//line 
    $T = "n";//line 
    $O = "n";//line
    $F = "n";//line
    $J = "n";//line
    var $btnComprar = $('.btn-add-buy-button-asynchronous'); //line
    var $btnComprarProduto = $('.buy-button.buy-button-ref');//line
    var $recebeQtyForm = $btnComprarProduto.parents('.buy-button-box'); //line
    var BuscaIcon = $('#main-content div.title-category h2');//line
    var PgAntIcon = $('ul.pages > li.previous');//line
    var PgProIcon = $('ul.pages > li.next');//line

    var Carac = $('.title-carac');//line
    var TabCarac = $('#tabs-1');//line
    var coment = $('.title-espec');//line
    var Tabcoment = $('#tabs-2');//line

    setTimeout(function () {
        $('input#newsletterButtonOK').val('cadastrar');

    }, 1000)


    $('input#newsletterButtonOK').val("Ganhar meus 8%");

    $('.popup-form').append("<button class='btn-nao'>Não obrigado</button>")

    montaMBMenu();
    $('.data').hover(function () { $(this).find('.product-to-hover').addClass('active') }, function () { $(this).find('.product-to-hover').removeClass('active') })
    $('.data').each(function () {
        var precoPor = converteMoedaFloat($(this).find('.price-por').text().replace('R$ ', ''))
        var precoDe = converteMoedaFloat($(this).find('.price-de').text().replace('R$ ', ''))
        var price = precoDe - precoPor;

        var percent = (price * 100) / precoDe;

        $(this).prepend('<p class="flag-desconto">' + percent.toFixed(2).replace('.00', '') + '% OFF!</p>');
    });

    function converteMoedaFloat(valor) {

        if (valor === "") {
            valor = 0;
        } else {

            valor = valor.replace(".", "");
            valor = valor.replace(",", ".");
            valor = parseFloat(valor);
        }
        return valor;

    }


    if (!$('body').hasClass('login')) {
        $('.mew-carrosel').owlCarousel({
            margin: 10,
            navigation: true,
            dots: false,
            loop: true,
            center: true,
            autoplay: true,
            items: 4,
            responsiveClass: true,
            responsive: {
                0: {
                    items: 2,
                    nav: true
                },
                600: {
                    items: 5,
                    nav: true
                },
                1000: {
                    items: 9,
                    nav: true
                }
            }
        });
    }



    $('.mew-carrosel').addClass('owl-theme');
    $('.mew-carrosel').addClass('owl-carousel');
    $('.mew-carrosel.owl-theme.owl-loaded.owl-drag.owl-carousel').show();

    setTimeout(function () {


        $('.marcas').css('visibility', 'visible');

    }, 3000);


    $('.fulltext-search-box.ui-autocomplete-input').val('O que você procura?');

    $('.fulltext-search-box.ui-autocomplete-input').focus(function () {

        if ($(this).val() == "O que você procura?") {
            $(this).val("");
        }

    });


    $('#popup-capture .newsletter fieldset').append("<div class='box-labels'> <label class='label-capture'>Nome</label> <label class='label-capture'>E-mail</label> </div>");



    $('.fulltext-search-box.ui-autocomplete-input').blur(function () {

        if ($(this).val() == "Busque aqui...") {
            $(this).val("O que você procura?");
        }
    })


    $('.titulo-parcelamento').text("Ver opções de parcelamento");

    var cookieValue = getCookie('popup');

    console.log(cookieValue);

    if (cookieValue == "true") {
        closePopup();
    } else {
        openPopup();
    }

    $('.fundo-popup-capture').click(function () {

        closePopup();

    });

    setInterval(function () {
        if ($('fieldset.success').is(':visible')) {

            closePopup();
        }

    }, 1000);

    $('.close-popup').click(function () {
        closePopup();
    })

    $('.btn-nao').click(function () {
        closePopup();
    })


    $('.buy-button').click(function () {

        var qtd = $('#qtd-input').find('input').val();

        //location.href($(this).attr('href').replace('qty=1', 'qty='+qtd));

        var link = $(this).attr('href').replace('qty=1', 'qty=' + qtd);

        $(this).attr('href', link);


    });
});