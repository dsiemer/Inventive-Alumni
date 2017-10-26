$(document).ready(function() {
    $("#Type1").click(function() {
        $("#Selection1").toggle()
        $('#Type1').toggleClass("ClosedTag");
    });
    $("#Type2").click(function() {
        $("#Selection2").toggle();
        $('#Type2').toggleClass("ClosedTag");
    });
    $("#Type3").click(function() {
        $("#Selection3").toggle();
        $('#Type3').toggleClass("ClosedTag");
    });
    $("#Type4").click(function() {
        $("#Selection4").toggle();
        $('#Type4').toggleClass("ClosedTag");
    });
    $("#Type5").click(function() {
        $("#Selection5").toggle();
        $('#Type5').toggleClass("ClosedTag");
    });

});