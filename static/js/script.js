// Constants used to target specific class names needed for jQuery

const navbarContainer = document.getElementsByClassName("navbar-container");
const navbarLogo = document.getElementsByClassName("navbar-logo");
const navbarLogoScrolled = document.getElementsByClassName("navbar-logo-scrolled");
const previousPage = document.getElementsByClassName("previous-page");
const mainProductImage = document.getElementsByClassName("main-product-image");
const navbarToggler = document.getElementsByClassName("navbar-toggler");
const mobileNavbarContainer = document.getElementsByClassName("mobile-navbar-container");
const backdrop = document.getElementsByClassName("backdrop");
const burgerIcon1 = document.getElementsByClassName("burger-icon-1");
const burgerIcon2 = document.getElementsByClassName("burger-icon-2");
const burgerIcon3 = document.getElementsByClassName("burger-icon-3");
const priceWithCommas = document.getElementById("price-with-commas");
const toTop = document.getElementsByClassName("to-top");

$(document).ready(() => {

    // Will check to see if the window has been scrolled 50px from the top.

    $(window).scroll(() => {
        if ($(document).scrollTop() > 50) {
            $(navbarContainer).css({ "height": "66px", "box-shadow": "0 2px 5px #5f5f5f" });
            $(navbarLogo).css("display", "none");
            $(navbarLogoScrolled).css("display", "block");
            $(mobileNavbarContainer).css("top", "66px");
            $(toTop).css({'opacity': '1', "pointer-events": "all"});
        }
        else {
            $(navbarContainer).css({ "height": "92px", "box-shadow": "none" });
            $(navbarLogo).css("display", "block");
            $(navbarLogoScrolled).css("display", "none");
            $(mobileNavbarContainer).css("top", "92px");
            $(toTop).css({'opacity': '0', "pointer-events": "none"});
        }
    });

    // When this is clicked, this will take you back to the page you were previously on.

    $(previousPage).on('click', () => {
        window.history.back(1);
    });

    /*
    When the mobile sidedrawer is opened, a backdrop will appear. When this is clicked,
    it reacts the same asif the burger icon has been clicked, closing the sidedrawer.
    */

    $(backdrop).on("click", () => {
        $(navbarToggler).click();
    });

    /* 
    This is handing whether the sidedrawer is open or closed. Which is handling specific CSS such as the sliding
    of the sidedrawer, the backdrop being visible upon sidedrawer being open & the positioning of each of the burger icons
    */

    $(navbarToggler).on('click', () => {
        if ($(navbarToggler).hasClass("collapsed")) {
            $(mobileNavbarContainer).css("right", "-70%");
            $(backdrop).css("display", "none");
            $(burgerIcon1).css("transform", "translateY(-3px) rotate(0deg)");
            $(burgerIcon2).css({"transform": "translateX(0px)", "opacity": "1"});
            $(burgerIcon3).css("transform", "translateY(3px) rotate(0deg)");
        } else {
            $(mobileNavbarContainer).css("right", "0");
            $(backdrop).css("display", "block");
            $(burgerIcon1).css("transform", "translateY(4px) rotate(-315deg)");
            $(burgerIcon2).css({"transform": "translateX(-50px)", "opacity": "0"});
            $(burgerIcon3).css("transform", "translateY(-4px) rotate(-405deg)");
        }
    });

    // This function will take a value & will add a comma between each 3 digits of the value.

    const addCommas = price => {
        price += '';
        let x = price.split('.');
        let x1 = x[0];
        let x2 = x.length > 1 ? '.' + x[1] : '';
        let rgx = /(\d+)(\d{3})/;
        while (rgx.test(x1)) {
                x1 = x1.replace(rgx, '$1' + ',' + '$2');
        }
        return x1 + x2;
    }

    /*
    This is where all of the pricing in the cart is handled with commas, each value is given a new variable
    & run through the 'addCommas' function & when added back to the value of their specific HTML text.
    An if has been added to each so that they are only being run if they are being targetted.
    */

    if (pricesWithCommas) {
        for (let i=0; i < pricesWithCommas.length; i++) {
            let priceWithCommas = addCommas(pricesWithCommas[i].innerHTML);
            $(pricesWithCommas[i]).text(`£${priceWithCommas}`);
        }
    }
});