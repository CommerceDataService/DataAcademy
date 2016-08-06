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

/* =============================
 * scholarship page JS
 */

 // since the first div has the most words I made it the basis for setting the height
$(document).ready(function() {
    var $div_height = $('.height_setter').height();
    $('.set_height').height($div_height);
})

$(document).ready(function() {
     $('#Container').mixItUp({
         callbacks: {
            onMixFail: function(state){
               console.log('MixItUp is not working');
          },
            onMixEnd: function(state){
              $filterResults = $('.filter_results');
              
              $filterResults.html(state.activeFilter);
            }
         },
         layout: {
            display: 'block'
         },
         controls: {
            toggleFilterButtons: true,
            toggleLogic: 'and'
         }
      });
});

$('a .detailee_link').click(function(e) {

  $.get('/detailee/andrea', function(data) {
    $('#results').html(data);
    console.log(data);
  });
})