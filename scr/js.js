/* small videos controller */
var figure = $(".video").hover(hoverVideo, hideVideo);

function hoverVideo(e) {
    $('video', this).get(0).play();
}
function hideVideo(e) {
    $('video', this).get(0).pause();
}


/* slides */
var slideIndex = 1;
showDivs(slideIndex);

function plusDivs(n) {
    showDivs(slideIndex += n);
}
function currentDiv(n) {
    showDivs(slideIndex = n);
    $("button").unbind('mouseenter mouseleave mouseover mouseout');
}
function showDivs(n) {
    var i;
    var x = document.getElementsByClassName("slides");
    var dots = document.getElementsByClassName("bttn");
    if (n > x.length) {
        slideIndex = 1
    }
    if (n < 1) {
        slideIndex = x.length
    }
    for (i = 0; i < x.length; i++) {
        x[i].style.display = "none";
    }

    for (i = 0; i < dots.length; i++) {
        //dots[i].className = dots[i].className.replace(" w3-red", "");
        $(".bttn").removeClass(" w3-red");
    }
    x[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " w3-red";
}
setInterval(function () {
    plusDivs(1);
}, 5000);


/* burger animation */
function toggleBurger() {
    var x = $("#navigation");
    if (x.hasClass("responsive")) {
        x.removeClass("responsive");
    } else {
        x.addClass("responsive");
    }
}

$("#nav-toggle").on('click', function () {
    toggleBurger();
});

/*  smooth scroll */
$(document).ready(function () {
    $(".navigateTo").on('click', function (event) {

        $("#navigation").removeClass("responsive");

        if (this.hash !== "") {
            event.preventDefault();

            var hash = this.hash;

            $('html, body').animate({
                scrollTop: $(hash).offset().top
            }, 1000);
        }
        return false;
    });



});

/* section effects when scrolling */
$(window).scroll(function () {
    var windowWidth = $(this).width();
    var windowHeight = $(this).height();
    var windowScrollTop = $(this).scrollTop();

    //$(".result").html("window width: " + windowWidth + "<br>" + "window height: " + windowHeight + "<br>" + "scroll: " + windowScrollTop + "<br>");
    
    // console.log("width: " + windowWidth);
    // console.log("height: " + windowHeight);
    // console.log("scrollTop: " + windowScrollTop);
    

    // aboutus
    var firstAnimation = function () {
        $('.video:eq(0)').delay(500).animate({ opacity: 1 }, 'slow');
        $('.line:eq(0)').delay(750).animate({ opacity: 1 }, 'slow');
        $('.video:eq(1)').delay(1000).animate({ opacity: 1 }, 'slow');
        $('.line:eq(1)').delay(1250).animate({ opacity: 1 }, 'slow');
        $('.video:eq(2)').delay(1500).animate({ opacity: 1 }, 'slow');
        $('.line:eq(2)').delay(1750).animate({ opacity: 1 }, 'slow');
        $('.video:eq(3)').delay(2000).animate({ opacity: 1 }, 'slow');
    };

    var secondAnimation = function () {
        $('.portfolio-container').delay(500).animate({ opacity: 1 }, 'slow');
        $('.slides-buttons').delay(1250).animate({ opacity: 1 }, 'slow');
    };

    // contacts
    var thirdAnimation = function () {
        $('.contact-method').each(
            function () {
                $(this).delay(400).animate(
                    { opacity: 1 }, 2000);
            }
        );
    };

    if (windowWidth <= 600) {
        firstAnimation();
        secondAnimation();
        thirdAnimation();
    } else if (windowWidth > 601 && windowWidth <= 800) {
        if (windowScrollTop > 340) {
            firstAnimation();
        }
        if (windowScrollTop > 2420) {
            secondAnimation();
        }
        if (windowScrollTop > 3025) {
            thirdAnimation();
        }
    } else if (windowWidth > 801 && windowWidth <= 920) {
        if (windowScrollTop > 340) {
            firstAnimation();
        }
        if (windowScrollTop > 2420) {
            secondAnimation();
        }
        if (windowScrollTop > 3025) {
            thirdAnimation();
        }
    } else {
        if (windowScrollTop <= 260) {
            $(".navigateTo").removeClass("active");
            $("#navintro").addClass("active");
        }
        if (windowScrollTop > 260) {
            firstAnimation();
            $(".navigateTo").removeClass("active");
            $("#navabout").addClass("active");
        }
        if (windowScrollTop > 825) {
            secondAnimation();
            $(".navigateTo").removeClass("active");
            $("#navportfolio").addClass("active");
        }
        if (windowScrollTop > 1480) {
            thirdAnimation();
            $(".navigateTo").removeClass("active");
            $("#navcontacts").addClass("active");
        }
    }
});
