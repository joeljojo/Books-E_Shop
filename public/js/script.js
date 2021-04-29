/*========================================
            Navigation
========================================= */

$(function() {
    //Show/Hide Nav On Page Load
    showHideNav();
    $(window).scroll(function() {
        //Show/Hide Nav On Window's Scroll
        showHideNav();
    });

    function showHideNav() {
        if ($(window).scrollTop() > 50) {
            //Show White Nav
            $("nav").addClass("white-nav-top");
            //Show Logo 01
            $(".navbar-brand img").attr("src", "/static/img/logo/img-logo 01.png");
            //Show Back To Top Button
            $("#back-to-top").fadeIn();
        } else {
            //Hide White Nav
            $("nav").removeClass("white-nav-top");
            //Show Logo 02
            $(".navbar-brand img").attr("src", "/static/img/logo/img-logo 02.png");
            //Hide Back To Top Button
            $("#back-to-top").fadeOut();
        }
    }
});
$(function() {
    /* Loop through all dropdown buttons to toggle between hiding and showing its dropdown content - This allows the user to have multiple dropdowns without any conflict */
    var dropdown = document.getElementsByClassName("dropdown-btn");
    var i;

    for (i = 0; i < dropdown.length; i++) {
        dropdown[i].addEventListener("click", function() {
            this.classList.toggle("active");
            var dropdownContent = this.nextElementSibling;
            if (dropdownContent.style.display === "block") {
                dropdownContent.style.display = "none";
            } else {
                dropdownContent.style.display = "block";
            }
        });
    }
})