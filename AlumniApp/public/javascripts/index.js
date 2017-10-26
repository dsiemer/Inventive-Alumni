$(document).ready(function() {
    $("#Type1").click(function() {
        $("#Selection1").toggle()
        $('#Type1').toggleClass("ClosedTag");
        $('.one').toggleClass("fa-minus");
        $('.one').toggleClass("fa-plus");

    });
    $("#Type2").click(function() {
        $("#Selection2").toggle();
        $('#Type2').toggleClass("ClosedTag");
        $('.two').toggleClass("fa-minus");
        $('.two').toggleClass("fa-plus");
        
    });
    $("#Type3").click(function() {
        $("#Selection3").toggle();
        $('#Type3').toggleClass("ClosedTag");
        $('.three').toggleClass("fa-minus");
        $('.three').toggleClass("fa-plus");
    });
    $("#Type4").click(function() {
        $("#Selection4").toggle();
        $('#Type4').toggleClass("ClosedTag");
        $('.four').toggleClass("fa-minus");
        $('.four').toggleClass("fa-plus");
    });
    $("#Type5").click(function() {
        $("#Selection5").toggle();
        $('#Type5').toggleClass("ClosedTag");
        $('.five').toggleClass("fa-minus");
        $('.five').toggleClass("fa-plus");
    });

});