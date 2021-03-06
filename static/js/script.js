// Constants

const scaleSize = 2;
const navbarHeightNotScrolled = "66px";
const navbarHeightScrolled = "92px";

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
const toTop = document.getElementsByClassName("to-top");
const productMainImage = document.getElementsByClassName("product-main-image");

$(document).ready(() => {

    // Will check to see if the window has been scrolled 50px from the top.

    $(window).scroll(() => {
        if ($(document).scrollTop() > 50) {
            $(navbarContainer).css({ "height": navbarHeightNotScrolled, "box-shadow": "0 2px 5px #5f5f5f" });
            $(navbarLogo).css("display", "none");
            $(navbarLogoScrolled).css("display", "block");
            $(toTop).css({ 'opacity': '1', "pointer-events": "all" });
        }
        else {
            $(navbarContainer).css({ "height": navbarHeightScrolled, "box-shadow": "none" });
            $(navbarLogo).css("display", "block");
            $(navbarLogoScrolled).css("display", "none");
            $(toTop).css({ 'opacity': '0', "pointer-events": "none" });
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
            $(burgerIcon2).css({ "transform": "translateX(0px)", "opacity": "1" });
            $(burgerIcon3).css("transform", "translateY(3px) rotate(0deg)");
        } else {
            $(mobileNavbarContainer).css("right", "0");
            $(backdrop).css("display", "block");
            $(burgerIcon1).css("transform", "translateY(4px) rotate(-315deg)");
            $(burgerIcon2).css({ "transform": "translateX(-50px)", "opacity": "0" });
            $(burgerIcon3).css("transform", "translateY(-4px) rotate(-405deg)");
        }
    });

    /*
    This is where an image will increase to 2 times it's original size when hovered over & will move along
    with the cursor, this is so the user can get a better look at each of the images of the products.
    */

    $(productMainImage).on('mouseover', function () {
        $(this).css({ 'transform': `scale(${scaleSize})` });
    }).on('mouseout', function () {
        $(this).css({ 'transform': 'scale(1)' });
    }).on('mousemove', function (e) {
        $(this).css({ 'transform-origin': ((e.pageX - $(this).offset().left) / $(this).width()) * (1 / scaleSize * 100) + '% ' + ((e.pageY - $(this).offset().top) / $(this).height()) * (1 / scaleSize * 100) + '%' });
    });
});