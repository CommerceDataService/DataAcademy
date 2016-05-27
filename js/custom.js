/* =========================================
 * full screen intro 
 *  =======================================*/

function fullScreenContainer() {

    var screenWidth = $(window).width() + "px";
    // var screenHeight = '';
    
    var $windowHeight = $(window).height() // should return a number and not a string of a number
    var newHeight = $windowHeight*.80  // displays height at 80% of window height
    var screenHeight = newHeight + "px"

 //    if ($(window).height() > 500) {
	// screenHeight = $(window).height() + "px";
 //    }
 //    else {
	// screenHeight = "500px";
 //    }


    $("#intro, #intro .item").css({
	width: screenWidth,
	height: screenHeight
    });
}